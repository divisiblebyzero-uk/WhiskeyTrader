import { Component, OnInit } from '@angular/core';
import { Whiskey, WhiskeyPrice } from '../entities';
import { WhiskeyDataService } from '../whiskey-data.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.sass']
})
export class PricesComponent implements OnInit {

  constructor(private data: WhiskeyDataService) { }

  prices: WhiskeyPrice[] | null = null;

  ngOnInit(): void {
    this.getWhiskeyPrices();
  }

  getWhiskeyPrices(): void {
    this.prices = this.data.getWhiskeyPrices();
  }

  getWhiskeyName(whiskeyId: number): string {
    return this.data.getWhiskeyName(whiskeyId);
  }

}
