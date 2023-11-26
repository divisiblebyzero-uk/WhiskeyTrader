import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Whiskey } from 'src/app/entities';

@Component({
  selector: 'app-edit-prices',
  templateUrl: './edit-prices.component.html',
  styleUrls: ['./edit-prices.component.scss']
})
export class EditPricesComponent implements OnInit{
  whiskey!: Whiskey;

  constructor( public ref: DynamicDialogRef, public input:DynamicDialogConfig) { }

  ngOnInit(): void {
    this.whiskey = this.input.data.whiskey
  }
}