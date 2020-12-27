import { Component, OnInit } from '@angular/core';
import { Whiskey } from 'src/app/entities';
import { WhiskeyDataService } from 'src/app/whiskey-data.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { GridOptions } from 'ag-grid-community';
import { DeleteButtonComponent } from 'src/app/cellRenderers/delete-button/delete-button.component';
import { ShowDetailsCellRendererComponent } from 'src/app/cellRenderers/show-details-cell-renderer/show-details-cell-renderer.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-whiskey-setup',
  templateUrl: './whiskey-setup.component.html',
  styleUrls: ['./whiskey-setup.component.scss']
})
export class WhiskeySetupComponent implements OnInit {
  faPlus = faPlus;
  
  constructor(private data: WhiskeyDataService, private router: Router) { }

  rowData: Whiskey[] | null = null;

  ngOnInit(): void {
    this.getWhiskeys();
  }

  getWhiskeys(): void {
    this.rowData = this.data.getWhiskeys().filter(w => w.active);
  }


  public addNewWhiskey(): void {
    const newWhiskey = this.data.addNewWhiskey("New Whiskey");
    this.getWhiskeys();
  }

  public deleteRow(whiskey: Whiskey): void {
    if (confirm("Are you sure you want to delete this whiskey?")) {
      this.data.deleteWhiskey(whiskey);
      this.getWhiskeys();
    }
  }

  public showDetails(whiskey: Whiskey): void {
    this.router.navigate(['/whiskey-details', whiskey.id]);
  }

}
