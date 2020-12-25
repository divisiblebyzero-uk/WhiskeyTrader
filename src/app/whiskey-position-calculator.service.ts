import { Injectable } from '@angular/core';
import { buildDriverProvider, Direct } from 'protractor/built/driverProviders';
import { Direction, WhiskeyTrade, WhiskeyPosition } from './entities';
import { WhiskeyDataService } from './whiskey-data.service';

@Injectable({
  providedIn: 'root'
})
export class WhiskeyPositionCalculatorService {

  constructor(private data: WhiskeyDataService) { }

  
  private rollUpOpenPosition(whiskeyId: string, trades: WhiskeyTrade[], direction: Direction): WhiskeyPosition {
    
    

    const position: WhiskeyPosition = {
      whiskeyId: whiskeyId,
      numberOfBottles: trades.map(t => t.numberOfBottles*t.direction).reduce((previous, qty) => previous + qty),
      totalPurchases: direction == Direction.Buy?trades.map(t => t.numberOfBottles*t.pricePerBottle).reduce((previous, price) => previous+price):0,
      totalSales: direction == Direction.Sell?trades.map(t => t.numberOfBottles*t.pricePerBottle).reduce((previous, price) => previous-price):0,
      averagePricePerBottle: 0,
      currentMarketPricePerBottle: this.data.getLatestPrice(whiskeyId),
      profit: 0,
      profitPerBottle: 0,
      returnOnInvestment: 0,
      openPosition: true
    };

    position.averagePricePerBottle = Math.max(position.totalSales + position.totalPurchases)/ position.numberOfBottles;
    position.profitPerBottle = (direction == Direction.Buy?(position.currentMarketPricePerBottle-position.averagePricePerBottle):(position.averagePricePerBottle - position.currentMarketPricePerBottle));
    position.profit = position.profitPerBottle * position.numberOfBottles;
    position.returnOnInvestment = (direction == Direction.Buy?position.profit / position.totalPurchases:0);
    
    return position;

  }

  public getPositions(): WhiskeyPosition[] {
    const allTrades = this.data.getWhiskeyTrades().filter(t => t.active);
    const positions:WhiskeyPosition[] = [];

    const whiskeyIds = [...new Set(allTrades.map(trade => trade.whiskeyId))];

    whiskeyIds.forEach(whiskeyId => {
      const trades = allTrades.filter(t => t.whiskeyId == whiskeyId).sort((a, b) => {return new Date(a.date).getTime() > new Date(b.date).getTime()?1:-1});
      const buyTrades = trades.filter(t => t.direction == Direction.Buy);
      const sellTrades = trades.filter(t => t.direction == Direction.Sell);

      console.log(JSON.stringify(trades));
      console.log(JSON.stringify(buyTrades));
      console.log(JSON.stringify(sellTrades));

      var numberOfBottles = 0;
      var totalPurchases = 0;
      var totalSales = 0;
      while (buyTrades.length > 0 && sellTrades.length > 0) {
        const buyTrade = buyTrades[0];
        const sellTrade = sellTrades[0];
        const matchQuantity = Math.min(buyTrade.numberOfBottles, sellTrade.numberOfBottles);
        numberOfBottles += matchQuantity;
        totalPurchases += matchQuantity * buyTrade.pricePerBottle;
        totalSales += matchQuantity * sellTrade.pricePerBottle;

        buyTrade.numberOfBottles = buyTrade.numberOfBottles - matchQuantity;
        sellTrade.numberOfBottles = sellTrade.numberOfBottles - matchQuantity;
        if (buyTrade.numberOfBottles < 1) {
          buyTrades.shift();
        }
        if (sellTrade.numberOfBottles < 1) {
          sellTrades.shift();
        }
      }

      if (numberOfBottles > 0) {
        const closedPosition: WhiskeyPosition = {
          whiskeyId: whiskeyId,
          numberOfBottles: numberOfBottles,
          totalPurchases: totalPurchases,
          totalSales: totalSales,
          averagePricePerBottle: (totalPurchases + totalSales) / (numberOfBottles*2),
          currentMarketPricePerBottle: this.data.getLatestPrice(whiskeyId),
          profit: totalSales - totalPurchases,
          profitPerBottle: 0,
          returnOnInvestment: 0,
          openPosition: false
        }
        closedPosition.profitPerBottle = closedPosition.profit / closedPosition.numberOfBottles;
        closedPosition.returnOnInvestment = closedPosition.profit / closedPosition.totalPurchases;
        positions.push(closedPosition); 
      }


      if (buyTrades.length > 0) {
        positions.push(this.rollUpOpenPosition(whiskeyId, buyTrades, Direction.Buy));
      } else if (sellTrades.length > 0) {
        positions.push(this.rollUpOpenPosition(whiskeyId, sellTrades, Direction.Sell));
      }
    });

    return positions;
  }
}
