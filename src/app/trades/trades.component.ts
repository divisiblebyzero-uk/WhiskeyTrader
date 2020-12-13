import { Component, OnInit } from '@angular/core';
import { WhiskeyTrade } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.sass']
})
export class TradesComponent implements OnInit {

  constructor(private data: WhiskeyDataService) { }

  trades: WhiskeyTrade[] | null = null;

  ngOnInit(): void {
    this.getWhiskeyTrades();
  }

  getWhiskeyTrades(): void {
    this.trades = this.data.getWhiskeyTrades();
  }

  getWhiskeyName(whiskeyId: number): string {
    return this.data.getWhiskeyName(whiskeyId);
  }
}
