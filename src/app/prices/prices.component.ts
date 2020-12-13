import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { Whiskey, WhiskeyPrice } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';
import { DateTimeRenderer } from '../cellRenderers/DateTimeRenderer';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.sass']
})
export class PricesComponent implements OnInit {

  constructor(private data: WhiskeyDataService) {
  }

  frameworkComponents = {
    dateTimeRenderer: DateTimeRenderer
  }
  prices: WhiskeyPrice[] | null = null;

  public getWhiskeyName(whiskeyId: number): string {
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
    { field: 'id', sortable: true, filter: true },
    { headerName: 'Whiskey Name', field: 'whiskeyId', sortable: true, filter: true },
    { field: 'date', sortable: true, filter: true, cellRenderer: 'dateTimeRenderer', cellRendererParams: 'MMM-yy' },
    { field: 'price', sortable: true, filter: true }
  ];

  gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      editable: true
    },
    onFirstDataRendered: this.onFirstDataRendered,
    frameworkComponents: { dateTimeRenderer: DateTimeRenderer }
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
