import { Injectable } from '@angular/core';
import { Direction, WhiskeyPosition } from './entities';
import { WhiskeyDataService } from './whiskey-data.service';

@Injectable({
  providedIn: 'root'
})
export class WhiskeyPositionCalculatorService {

  constructor(private data: WhiskeyDataService) { }

  public getPositions(): WhiskeyPosition[] {
    const allTrades = this.data.getWhiskeyTrades().filter(t => t.active);
    const positions:WhiskeyPosition[] = [];

    const whiskeyIds = [...new Set(allTrades.map(trade => trade.whiskeyId))];

    whiskeyIds.forEach(whiskeyId => {
      const trades = allTrades.filter(t => t.whiskeyId == whiskeyId);
      const position = {
        whiskeyId: whiskeyId,
        numberOfBottles: trades.map(t => t.numberOfBottles*t.direction).reduce((previous, qty) => previous + qty),
        totalPurchases: trades.map(t => t.direction==Direction.Buy?t.numberOfBottles*t.pricePerBottle:0).reduce((previous, price) => previous+price),
        totalSales: trades.map(t => t.direction==Direction.Sell?t.numberOfBottles*t.pricePerBottle:0).reduce((previous, price) => previous-price),
        averagePricePerBottle: 0,
        currentMarketPricePerBottle: this.data.getLatestPrice(whiskeyId),
        realisedPnL: 0,
        unrealisedPnL: 0,
        pnLPerBottle: 0,
        returnOnInvestment: 0
      };

      position.averagePricePerBottle = (position.totalPurchases - position.totalSales)/ trades.map(t => Number(t.numberOfBottles)).reduce((previous, qty) => previous + qty);
      

      positions.push(position);
    });

    return positions;
  }
}
