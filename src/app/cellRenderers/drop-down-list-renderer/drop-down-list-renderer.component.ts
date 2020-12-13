import { Component, OnInit } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-drop-down-list-renderer',
  templateUrl: './drop-down-list-renderer.component.html',
  styleUrls: ['./drop-down-list-renderer.component.scss']
})
export class DropDownListRendererComponent implements ICellRendererAngularComp {

  params: ICellRendererParams |null = null;
  items: any;
  selectedItemID: any;

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  agInit(params: ICellRendererParams): void {
      this.params = params;
      if (this.params) {
        const field = this.params.colDef.field;
        if (field) {
            this.selectedItemID = this.params.data[field];
        }
      }
      
      if (typeof params.colDef.cellEditorParams != 'undefined') {
          this.items = params.colDef.cellEditorParams;
      }
  }

  public selectItem(id: any) {
    //  When the user selects an item in our drop down list, 
    //  we'll store their selection, and ask
    //  agGrid to stop editing (so our drop down list disappears)
    this.selectedItemID = id;
    this.params?.api.stopEditing();
  }

  getValue() {
    //  This gets called by agGrid when it closes the DatePicker control.
    //  agGrid uses it to get the final selected value.
    return this.selectedItemID;
  } 

  isPopup() {
    //  We MUST tell agGrid that this is a popup control, to make it display properly.
    return true;
  }
}