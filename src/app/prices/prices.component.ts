import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions, ValueGetterParams, ValueSetterParams } from 'ag-grid-community';
import { Whiskey, WhiskeyPrice } from '../entities';
import { DateTimeRenderer } from '../cellRenderers/DateTimeRenderer';
import { DropDownListRendererComponent } from '../cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { WhiskeysService } from '../Data/whiskeys.service';
import { WhiskeyPricesService } from '../Data/whiskey-prices.service';
import { Table } from 'primeng/table';

export interface WhiskeyPriceWithName extends WhiskeyPrice {
  whiskeyName: string
}
@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent implements OnInit {
  faPlus = faPlus;

  @ViewChild('pricesTable') pricesTable!:Table;

  // With help from https://www.codeproject.com/Articles/5266363/agGrid-for-Angular-The-Missing-Manual

  constructor(private whiskeysService: WhiskeysService, private whiskeyPricesService: WhiskeyPricesService) {
  }

  globalFilterUpdate(event:any) {
    console.log(JSON.stringify(event.target.value))
    this.pricesTable.filterGlobal(event.target.value, 'contains');
  }

  clear(table: Table) {
    table.clear();
  }

  rowData: WhiskeyPriceWithName[]= [];
  whiskeys: Whiskey[] | null = null;

  getWhiskeyName(price: WhiskeyPrice): string {
    return this.whiskeys?.find(w => w.id == price.whiskeyId)?.name || ""
  }

  columnDefs = [
    //{ field: 'id' },
    { headerName: 'Whiskey Name', field: 'whiskeyId',
      cellEditor: 'dropDownListRendererComponent', cellEditorParams: <Whiskey[]>[],
      valueGetter: (params: ValueGetterParams) => this.whiskeys?.find(w => w.id == params.data.whiskeyId)?.name,
    },
    { field: 'date', cellRenderer: 'dateTimeRenderer', cellRendererParams: 'MMM-yy', cellEditor: 'datePickerRendererComponent' },
    { field: 'price' },
    { cellRenderer: 'deleteButtonRendererComponent'}
  ];

  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      editable: true
    },
    onFirstDataRendered: this.onFirstDataRendered,
    //frameworkComponents: { 
    //  dateTimeRenderer: DateTimeRenderer,
    //  dropDownListRendererComponent: DropDownListRendererComponent,
    //  deleteButtonRendererComponent: DeleteButtonComponent,
    //  datePickerRendererComponent: DatePickerRendererComponent
    // },
     context: { componentParent: this },
     api: null
  };

  onFirstDataRendered(params:any) {
    params.api.sizeColumnsToFit();
  }

  ngOnInit(): void {
    this.getWhiskeyPrices();
  }

  comparePrices(a: WhiskeyPrice, b: WhiskeyPrice): number {
    if (a.whiskeyId == b.whiskeyId) {
      return (new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      return a.whiskeyId>b.whiskeyId?1:-1;
    }
  }

  getWhiskeyPrices(): void {
    this.whiskeysService.list().subscribe(ws => {
      this.whiskeys = ws.filter(w => w.active);
      const columnDef = this.columnDefs.find(cd => "whiskeyId" == cd.field);
      if (columnDef) columnDef.cellEditorParams = this.whiskeys;
      this.gridOptions.api?.setColumnDefs(this.columnDefs);

      this.whiskeyPricesService.list().subscribe(prices => {
        this.rowData = prices.filter(wp => wp.active).map(p => { return { ...p, whiskeyName: this.getWhiskeyName(p)} });
        this.rowData.sort(this.comparePrices)
      });
    });
  }

  addNewWhiskeyPrice(): void {
    if (this.whiskeys) {
      this.whiskeyPricesService.new(this.whiskeys[0]).subscribe(wp => this.getWhiskeyPrices());
    }
  }

  public delete(whiskeyPrice: WhiskeyPrice): void {
    if (confirm("Are you sure you want to delete this price?")) {
      this.whiskeyPricesService.delete(whiskeyPrice).subscribe(() => this.getWhiskeyPrices());
    }
  }

  public saveEntry(event: any): void {
    this.whiskeyPricesService.save(event.data).subscribe(() => this.getWhiskeyPrices());
  }
}
