import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WhiskeyTradesService } from 'src/app/Data/whiskey-trades.service';
import { WhiskeyTrade } from 'src/app/entities';

@Component({
  selector: 'app-edit-trade',
  templateUrl: './edit-trade.component.html',
  styleUrls: ['./edit-trade.component.scss']
})
export class EditTradeComponent implements OnInit {
  whiskeyTrade!: WhiskeyTrade
  constructor( public ref: DynamicDialogRef, public data: DynamicDialogConfig, private whiskeyTradesService: WhiskeyTradesService) { }

  stateOptions: any[] = [{label: 'Buy', value: 1}, {label: 'Sell', value: -1}]

  ngOnInit(): void {
    if (this.data.data.whiskeyTrade) {
      this.whiskeyTrade = {...this.data.data.whiskeyTrade};
      this.whiskeyTrade.date = new Date(this.whiskeyTrade.date)
      this.whiskeyTrade.direction
    }
  }

  public saveWhiskeyTrade(): void {
    console.log("Saving ... : " + JSON.stringify(this.whiskeyTrade))
    this.whiskeyTradesService.save(this.whiskeyTrade).subscribe();
    this.ref.close();
  }

}
