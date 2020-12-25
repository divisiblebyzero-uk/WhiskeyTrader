import { Component, OnInit } from '@angular/core';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-show-details-cell-renderer',
  templateUrl: './show-details-cell-renderer.component.html',
  styleUrls: ['./show-details-cell-renderer.component.scss']
})
export class ShowDetailsCellRendererComponent implements ICellRendererAngularComp {

  faEllipsisH = faEllipsisH;

  params: ICellRendererParams |null = null;

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  // called on init
  agInit(params: any): void {
    this.params = params;
  }

  showDetails(): void {
    console.log(JSON.stringify(this.params?.data));
    this.params?.context.componentParent.showDetails(this.params?.data);
  }
}
