import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WhiskeyPricesService } from 'src/app/Data/whiskey-prices.service';
import { WhiskeyPrice } from 'src/app/entities';

@Component({
  selector: 'app-edit-price',
  templateUrl: './edit-price.component.html',
  styleUrls: ['./edit-price.component.scss']
})
export class EditPriceComponent implements OnInit{
  constructor( public ref: DynamicDialogRef, public data: DynamicDialogConfig, public wps: WhiskeyPricesService) {
    
  }

  public theDate: Date = new Date("2023-11-10");
  public theDateString: string = "2023-11-10";

  public whiskeyPrice!: WhiskeyPrice;

  ngOnInit(): void {
    if (this.data.data.whiskeyPrice) {
      console.log(JSON.stringify(this.data.data.whiskeyPrice));
      this.whiskeyPrice = {...this.data.data.whiskeyPrice};
      this.whiskeyPrice.date = new Date(this.whiskeyPrice.date)
      console.log(JSON.stringify(this.data.data.whiskeyPrice));
    }
  }

  public savePrice(): void {
    console.log("Saving ... : " + JSON.stringify(this.whiskeyPrice))
    this.wps.save(this.whiskeyPrice).subscribe();
    this.ref.close();
  }


}
