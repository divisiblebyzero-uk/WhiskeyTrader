import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ValueFormatterParams, ValueGetterParams } from 'ag-grid-community';
import { DatePickerRendererComponent } from '../cellRenderers/date-picker-renderer/date-picker-renderer.component';
import { DateTimeRenderer } from '../cellRenderers/DateTimeRenderer';
import { DeleteButtonComponent } from '../cellRenderers/delete-button/delete-button.component';
import { DropDownListRendererComponent } from '../cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';
import { WhiskeyTradesService } from '../Data/whiskey-trades.service';
import { WhiskeysService } from '../Data/whiskeys.service';
import { Whiskey, WhiskeyPosition } from '../entities';
import { WhiskeyPositionCalculatorService } from '../whiskey-position-calculator.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  faPlus = faPlus;

  // With help from https://www.codeproject.com/Articles/5266363/agGrid-for-Angular-The-Missing-Manual

  constructor(private whiskeysService:WhiskeysService, private whiskeyTradesService: WhiskeyTradesService, private calc: WhiskeyPositionCalculatorService) {
  }

  rowData: WhiskeyPosition[] | null = null;
  whiskeys: Whiskey[] | null = null;

  columnDefs = [
    { headerName: 'Whiskey Name', field: 'whiskeyId',
      cellEditor: 'dropDownListRendererComponent', cellEditorParams: this.whiskeys?this.whiskeys.filter(w => w.active):null,
      valueGetter: (params: ValueGetterParams) => this.whiskeys?.find(w => w.id == params.data.whiskeyId)?.name,
      minWidth: 130,
      maxWidth: 200
    },
    { headerName: '#', field: 'numberOfBottles', pinned: 'left', minWidth: 50, maxWidth: 50 },
    { headerName: 'Buy', field: 'totalPurchases', valueFormatter: this.currencyFormatter, minWidth: 75, maxWidth: 75 },
    { headerName: 'Sell', field: 'totalSales', valueFormatter: this.currencyFormatter, minWidth: 75, maxWidth: 75 },
    { headerName: 'Avg Price', field: 'averagePricePerBottle', valueFormatter: this.currencyFormatter, minWidth: 100, maxWidth: 100 },
    { headerName: 'Mkt Price', field: 'currentMarketPricePerBottle', valueFormatter: this.currencyFormatter, minWidth: 100, maxWidth: 100 },
    { field: 'profit', valueFormatter: this.currencyFormatter },
    { field: 'profitPerBottle', valueFormatter: this.currencyFormatter },
    { headerName: 'RoI', field: 'returnOnInvestment', valueFormatter: this.percentageFormatter },
    { headerName: 'Open?', field: 'openPosition', valueFormatter: this.booleanFormatter }
  ];

  gridOptions = {
    getRowStyle: (params: ValueFormatterParams) => { return params.data.openPosition? {background: 'pink'}: {background: 'powderblue'} },
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      editable: false,
      minWidth: 75,
      maxWidth: 75
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
    this.getWhiskeyPositions();
  }

  getWhiskeyPositions(): void {
    this.calc.getPositions().then(positions => this.rowData = positions);
    this.whiskeysService.list().subscribe(whiskeys => this.whiskeys = whiskeys);
  }

  currencyFormatter(params: ValueFormatterParams): any {
    return '\xA3' + Number(params.value).toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  percentageFormatter(params: ValueFormatterParams): any {
    if (params.value && !Number.isNaN(params.value) && Number.isFinite(params.value)) {
      return Math.floor((Number(params.value)*100)) + "%";
    } else { 
      return "";
    }
  }

  booleanFormatter(params: ValueFormatterParams): any {
    return params.value?'Yes':'No';
  }
}
