import { Direction, Whiskey, WhiskeyPosition, WhiskeyPrice, WhiskeyTrade } from './entities';

export const WHISKEYS: Whiskey[] = [
    { id: 0, name: "Macallan Edition No. 3" },
    { id: 1, name: "Macallan Edition No. 4" },
    { id: 2, name: "Yamazaki 12 Year" }, 
    { id: 3, name: "Yamazaki 15 Year" },
    { id: 4, name: "Nikka Hokkaido-Yoichi" }
];

export const WHISKEY_PRICES: WhiskeyPrice[] = [
    { id: 0, whiskeyId: 0, date: new Date("2020-10-01"), price: 343 },
    { id: 1, whiskeyId: 1, date: new Date("2020-10-01"), price: 214 },
    { id: 2, whiskeyId: 2, date: new Date("2020-10-01"), price: 154 },
    { id: 3, whiskeyId: 3, date: new Date("2020-10-01"), price: 605 },
    { id: 4, whiskeyId: 4, date: new Date("2020-12-01"), price: 134 }
];

export const WHISKEY_TRADES: WhiskeyTrade[] = [
    { id: 0, whiskeyId: 0, numberOfBottles:3, pricePerBottle: 1500, date: new Date("2020-10-01"), direction: Direction.Buy },
    { id: 1, whiskeyId: 1, numberOfBottles:1, pricePerBottle: 100, date: new Date("2020-10-01"), direction: Direction.Buy },
    { id: 2, whiskeyId: 2, numberOfBottles:1, pricePerBottle: 100, date: new Date("2020-10-01"), direction: Direction.Buy },
    { id: 3, whiskeyId: 3, numberOfBottles:1, pricePerBottle: 100, date: new Date("2020-10-01"), direction: Direction.Buy },
    { id: 4, whiskeyId: 4, numberOfBottles:2, pricePerBottle: 75, date: new Date("2020-12-01"), direction: Direction.Buy }
];

export const WHISKEY_POSITIONS: WhiskeyPosition[] = [
    { id: 0, whiskeyId: 0, numberOfBottles: 3, totalPurchasePrice: 4500, averagePricePerBottle: 1500, currentMarketPricePerBottle: 343, realisedPnL: 0, unrealisedPnL: -3471, pnLPerBottle: -1157, returnOnInvestment: -0.26 },
    { id: 1, whiskeyId: 1, numberOfBottles: 1, totalPurchasePrice: 100, averagePricePerBottle: 100, currentMarketPricePerBottle: 214, realisedPnL: 0, unrealisedPnL: 114, pnLPerBottle: 114, returnOnInvestment: 1.14 },
    { id: 2, whiskeyId: 2, numberOfBottles: 1, totalPurchasePrice: 100, averagePricePerBottle: 100, currentMarketPricePerBottle: 154, realisedPnL: 0, unrealisedPnL: 54, pnLPerBottle: 54, returnOnInvestment: 0.54 },
    { id: 3, whiskeyId: 3, numberOfBottles: 1, totalPurchasePrice: 100, averagePricePerBottle: 100, currentMarketPricePerBottle: 605, realisedPnL: 0, unrealisedPnL: 505, pnLPerBottle: 505, returnOnInvestment: 5.05 },
    { id: 4, whiskeyId: 4, numberOfBottles: 1, totalPurchasePrice: 75, averagePricePerBottle: 75, currentMarketPricePerBottle: 134, realisedPnL: 0, unrealisedPnL: 118, pnLPerBottle: 118, returnOnInvestment: .39 },
    
];