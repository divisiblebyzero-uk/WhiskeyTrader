import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements ICellRendererAngularComp {

  faTrash = faTrash;

  params: ICellRendererParams |null = null;

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  // called on init
  agInit(params: any): void {
    this.params = params;
  }

  delete(): void {
    console.log(JSON.stringify(this.params?.data));
    this.params?.context.componentParent.deleteRow(this.params?.data);
  }
}
