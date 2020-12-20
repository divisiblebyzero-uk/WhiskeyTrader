import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ValueGetterParams } from 'ag-grid-community';
import { DatePickerRendererComponent } from '../cellRenderers/date-picker-renderer/date-picker-renderer.component';
import { DateTimeRenderer } from '../cellRenderers/DateTimeRenderer';
import { DeleteButtonComponent } from '../cellRenderers/delete-button/delete-button.component';
import { DropDownListRendererComponent } from '../cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';
import { WhiskeyPosition } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';
import { WhiskeyPositionCalculatorService } from '../whiskey-position-calculator.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  faPlus = faPlus;

  // With help from https://www.codeproject.com/Articles/5266363/agGrid-for-Angular-The-Missing-Manual

  constructor(private data: WhiskeyDataService, private calc: WhiskeyPositionCalculatorService) {
  }

  rowData: WhiskeyPosition[] | null = null;

  columnDefs = [
    { headerName: 'Whiskey Name', field: 'whiskeyId',
      cellEditor: 'dropDownListRendererComponent', cellEditorParams: this.data.getWhiskeys().filter(w => w.active),
      valueGetter: (params: ValueGetterParams) => this.data.getWhiskeys().find(w => w.id == params.data.whiskeyId)?.name,
    },
    { field: 'numberOfBottles' },
    { field: 'totalPurchases' },
    { field: 'totalSales' },
    { field: 'averagePricePerBottle' },
    { field: 'currentMarketPricePerBottle' },
    { field: 'realisedPnL' },
    { field: 'unrealisedPnL' },
    { field: 'pnLPerBottle' },
    { field: 'returnOnInvestment' },
  ];

  gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      editable: false
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
    this.rowData = this.calc.getPositions();
  }
}
