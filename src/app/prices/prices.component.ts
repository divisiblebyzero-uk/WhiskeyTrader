import { Component, OnInit } from '@angular/core';
import { GridOptions, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import { Whiskey, WhiskeyPrice } from '../entities';
import { DateTimeRenderer } from '../cellRenderers/DateTimeRenderer';
import { DropDownListRendererComponent } from '../cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { DeleteButtonComponent } from '../cellRenderers/delete-button/delete-button.component';
import { DatePickerRendererComponent } from '../cellRenderers/date-picker-renderer/date-picker-renderer.component';
import { WhiskeysService } from '../Data/whiskeys-service.service';
import { WhiskeyPricesService } from '../Data/whiskey-prices.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  faPlus = faPlus;

  // With help from https://www.codeproject.com/Articles/5266363/agGrid-for-Angular-The-Missing-Manual

  constructor(private whiskeysService: WhiskeysService, private whiskeyPricesService: WhiskeyPricesService) {
  }

  rowData: WhiskeyPrice[] | null = null;
  whiskeys: Whiskey[] | null = null;

  columnDefs = [
    //{ field: 'id' },
    { headerName: 'Whiskey Name', field: 'whiskeyId',
      cellEditor: 'dropDownListRendererComponent', cellEditorParams: this.whiskeys?this.whiskeys.filter(w => w.active):null,
      valueGetter: (params: ValueGetterParams) => this.whiskeys?.find(w => w.id == params.data.whiskeyId)?.name,
    },
    { field: 'date', cellRenderer: 'dateTimeRenderer', cellRendererParams: 'MMM-yy', cellEditor: 'datePickerRendererComponent' },
    { field: 'price' },
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

  ngOnInit(): void {
    this.getWhiskeyPrices();
  }

  getWhiskeyPrices(): void {
    this.whiskeyPricesService.list().subscribe(prices => this.rowData = prices.filter(wp => wp.active));
    this.whiskeysService.list().subscribe(ws => this.whiskeys = ws);
  }

  addNewWhiskeyPrice(): void {
    if (this.whiskeys) {
      this.whiskeyPricesService.new(this.whiskeys[0]).subscribe(wp => this.getWhiskeyPrices());
    }
  }

  public deleteRow(whiskeyPrice: WhiskeyPrice): void {
    if (confirm("Are you sure you want to delete this price?")) {
      this.whiskeyPricesService.delete(whiskeyPrice).subscribe(() => this.getWhiskeyPrices());
    }
  }

  public saveEntry(event: any): void {
    this.whiskeyPricesService.save(event.data).subscribe(() => this.getWhiskeyPrices());
  }
}
