import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Whiskey } from 'src/app/entities';

@Component({
  selector: 'app-edit-trades',
  templateUrl: './edit-trades.component.html',
  styleUrls: ['./edit-trades.component.scss']
})
export class EditTradesComponent implements OnInit {

  constructor( public ref: DynamicDialogRef, public input:DynamicDialogConfig) {}

  whiskey!: Whiskey;

  public ngOnInit(): void {
      this.whiskey = this.input.data.whiskey;
  }

}
