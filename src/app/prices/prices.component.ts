import { Component, OnInit } from '@angular/core';
import { GridOptions, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import { Whiskey, WhiskeyPrice } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';
import { DateTimeRenderer } from '../cellRenderers/DateTimeRenderer';
import { DropDownListRendererComponent } from '../cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {

  // With help from https://www.codeproject.com/Articles/5266363/agGrid-for-Angular-The-Missing-Manual

  constructor(private data: WhiskeyDataService) {
  }

  prices: WhiskeyPrice[] | null = null;

  public getWhiskeyName(whiskeyId: string): string {
    return this.data.getWhiskeyName(whiskeyId);
  }

  getWhiskeyNameValue(params: any):any {
    console.log(this);
    if (params === undefined) {
      return null;
    }
    return this.data.getWhiskeyName(params.data.whiskeyId);
    
  }

  rowData: WhiskeyPrice[] | null = null;

  columnDefs = [
    { field: 'id' },
    { headerName: 'Whiskey Name', field: 'whiskeyId',
      cellEditor: 'dropDownListRendererComponent', cellEditorParams: this.data.getWhiskeys(),
      valueGetter: (params: ValueGetterParams) => this.data.getWhiskeys().find(w => w.id == params.data.whiskeyId)?.name,
    },
    { field: 'date', cellRenderer: 'dateTimeRenderer', cellRendererParams: 'MMM-yy' },
    { field: 'price' }
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
      dropDownListRendererComponent: DropDownListRendererComponent
     }
  };

  onFirstDataRendered(params:any) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit(): void {
    this.getWhiskeyPrices();
  }

  getWhiskeyPrices(): void {
    this.prices = this.data.getWhiskeyPrices();
    this.rowData = this.data.getWhiskeyPrices();
  }

}
