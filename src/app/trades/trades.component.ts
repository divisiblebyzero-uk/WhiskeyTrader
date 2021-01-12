import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ValueGetterParams } from 'ag-grid-community';
import { DatePickerRendererComponent } from '../cellRenderers/date-picker-renderer/date-picker-renderer.component';
import { DateTimeRenderer } from '../cellRenderers/DateTimeRenderer';
import { DeleteButtonComponent } from '../cellRenderers/delete-button/delete-button.component';
import { DropDownListRendererComponent } from '../cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';
import { WhiskeyTradesService } from '../Data/whiskey-trades.service';
import { WhiskeysService } from '../Data/whiskeys-service.service';
import { Direction, Whiskey, WhiskeyTrade } from '../entities';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {
  faPlus = faPlus;

  // With help from https://www.codeproject.com/Articles/5266363/agGrid-for-Angular-The-Missing-Manual

  constructor(private whiskeyTradesService: WhiskeyTradesService, private whiskeysService: WhiskeysService) {
    this.directions.push({id: 1, name: 'Buy'});
    this.directions.push({id: -1, name: 'Sell'});
  }

  directions: {id: number, name: string}[] = [];

  rowData: WhiskeyTrade[] | null = null;

  whiskeys: Whiskey[] | null = null;

  columnDefs = [
    //{ field: 'id' },
    { headerName: 'Whiskey Name', field: 'whiskeyId',
      cellEditor: 'dropDownListRendererComponent', cellEditorParams: this.whiskeys?this.whiskeys.filter(w => w.active):null,
      valueGetter: (params: ValueGetterParams) => this.whiskeys?.find(w => w.id == params.data.whiskeyId)?.name,
    },
    { field: 'numberOfBottles' },
    { field: 'pricePerBottle' },
    { field: 'date', cellRenderer: 'dateTimeRenderer', cellRendererParams: 'MMM-yy', cellEditor: 'datePickerRendererComponent' },
    { headerName: 'Buy/Sell', field: 'direction',
      cellEditor: 'dropDownListRendererComponent', cellEditorParams: this.directions,
      valueGetter: (params: ValueGetterParams) => this.directions.find(d => d.id == params.data.direction)?.name
    },
    { cellRenderer: 'deleteButtonRendererComponent'}
  ];

  gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      editable: true
    },
    onFirstDataRendered: this.onFirstDataRendered,
    frameworkComponents: { 
      dateTimeRenderer: DateTimeRenderer,
      dropDownListRendererComponent: DropDownListRendererComponent,
      deleteButtonRendererComponent: DeleteButtonComponent,
      datePickerRendererComponent: DatePickerRendererComponent
     },
     context: { componentParent: this }
  };

  onFirstDataRendered(params:any) {
    params.api.sizeColumnsToFit();
  }

  trades: WhiskeyTrade[] | null = null;

  ngOnInit(): void {
    this.getWhiskeyTrades();
  }

  getWhiskeyTrades(): void {
    this.whiskeyTradesService.list().subscribe(trades => this.rowData = trades.filter(t => t.active));
    this.whiskeysService.list().subscribe(whiskeys => this.whiskeys = whiskeys);
  }

  addNewWhiskeyTrade(): void {
    if (this.whiskeys) {

      this.whiskeyTradesService.new(this.whiskeys[0], 1, 0, Direction.Buy).subscribe(() => this.getWhiskeyTrades());
    }
  }

  public deleteRow(whiskeyTrade: WhiskeyTrade): void {

    if (confirm("Are you sure you want to delete this trade?")) {
      this.whiskeyTradesService.delete(whiskeyTrade).subscribe(() => { this.getWhiskeyTrades() });
    }
  }

  public saveEntry(event: any): void {
    this.whiskeyTradesService.save(event.data).subscribe(() => this.getWhiskeyTrades());
  }
}