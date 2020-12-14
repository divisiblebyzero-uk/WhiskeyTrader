import { Component, OnInit } from '@angular/core';
import { Whiskey } from 'src/app/entities';
import { WhiskeyDataService } from 'src/app/whiskey-data.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-whiskey-setup',
  templateUrl: './whiskey-setup.component.html',
  styleUrls: ['./whiskey-setup.component.scss']
})
export class WhiskeySetupComponent implements OnInit {
  faPlus = faPlus;
  
  constructor(private data: WhiskeyDataService) { }

  rowData: Whiskey[] | null = null;

  columnDefs = [
    { field: 'id' },
    { field: 'name' }
  ];

  ngOnInit(): void {
    this.getWhiskeys();
  }

  getWhiskeys(): void {
    this.rowData = this.data.getWhiskeys();
  }

  gridOptions:GridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
      editable: true
    },
    onFirstDataRendered: this.onFirstDataRendered,
    api: null
  };

  onFirstDataRendered(params:any) {
    params.api.sizeColumnsToFit();
  }

  public saveEntry(event: any): void {
    console.log(JSON.stringify(event.data));
    this.data.saveWhiskey(event.data);
  }

  public addNewWhiskey(): void {
    const newWhiskey = this.data.addNewWhiskey("Enter Whiskey name");
    this.gridOptions.api?.applyTransaction({ add: [newWhiskey] });
  }

}
