import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ValueGetterParams } from 'ag-grid-community';
import { DatePickerRendererComponent } from '../cellRenderers/date-picker-renderer/date-picker-renderer.component';
import { DateTimeRenderer } from '../cellRenderers/DateTimeRenderer';
import { DeleteButtonComponent } from '../cellRenderers/delete-button/delete-button.component';
import { DropDownListRendererComponent } from '../cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';
import { Direction, WhiskeyTrade } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {
  faPlus = faPlus;

  // With help from https://www.codeproject.com/Articles/5266363/agGrid-for-Angular-The-Missing-Manual

  constructor(private data: WhiskeyDataService) {
    this.directions.push({id: 1, name: 'Buy'});
    this.directions.push({id: -1, name: 'Sell'});
  }

  directions: {id: number, name: string}[] = [];

  rowData: WhiskeyTrade[] | null = null;

  columnDefs = [
    //{ field: 'id' },
    { headerName: 'Whiskey Name', field: 'whiskeyId',
      cellEditor: 'dropDownListRendererComponent', cellEditorParams: this.data.getWhiskeys().filter(w => w.active),
      valueGetter: (params: ValueGetterParams) => this.data.getWhiskeys().find(w => w.id == params.data.whiskeyId)?.name,
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
    this.rowData = this.data.getWhiskeyTrades().filter(w => w.active);
  }

  addNewWhiskeyTrade(): void {
    this.data.addNewWhiskeyTrade(this.data.getWhiskeys()[0], 1, 0, Direction.Buy);
    this.getWhiskeyTrades();
  }

  public deleteRow(whiskeyTrade: WhiskeyTrade): void {
    if (confirm("Are you sure you want to delete this trade?")) {
      this.data.deleteWhiskeyTrade(whiskeyTrade);
      this.getWhiskeyTrades();
    }
  }

  public saveEntry(event: any): void {
    this.data.saveWhiskeyTrade(event.data);
  }
}