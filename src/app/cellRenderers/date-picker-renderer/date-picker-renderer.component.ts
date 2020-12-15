import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FormsModule } from '@angular/forms';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-date-picker-renderer',
  templateUrl: './date-picker-renderer.component.html',
  styleUrls: ['./date-picker-renderer.component.scss']
})
export class DatePickerRendererComponent implements OnInit, ICellRendererAngularComp {

  constructor() { }
  dateModel: NgbDateStruct|null=null;
  params: ICellRendererParams |null = null;

  ngOnInit(): void {
  }

  agInit(params: any) {
    this.params = params;
    if (this.params) {
      const field = this.params.colDef.field;
      if (field) {
        console.log(this.params.data[field]);
        const date:Date = new Date(this.params.data[field]);
        this.dateModel = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
      }
    }
  }

  getValue() {
    //  This gets called by agGrid when it closes the DatePicker control.
    //  agGrid uses it to get the final selected value.
    if (this.dateModel) {
      return new Date(this.dateModel.year, this.dateModel.month - 1, this.dateModel.day);
    } else {
      return null;
    }
    
  } 

  refresh(params: any) {
    return true;
  }

  isPopup() {
    //  We MUST tell agGrid that this is a popup control, to make it display properly.
    return true;
  }
}