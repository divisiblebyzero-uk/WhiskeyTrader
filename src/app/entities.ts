export interface WhiskeyTrade {
    id: number,
    whiskeyId: number,
    numberOfBottles: number,
    pricePerBottle: number,
    date: Date,
    direction: Direction
}

export interface WhiskeyPosition {
    id: number,
    whiskeyId: number,
    numberOfBottles: number,
    totalPurchasePrice: number,
    averagePricePerBottle: number,
    currentMarketPricePerBottle: number,
    realisedPnL: number,
    unrealisedPnL: number,
    pnLPerBottle: number,
    returnOnInvestment: number
}

export interface WhiskeyPrice {
    id: number,
    whiskeyId: number,
    date: Date,
    price: number
}

export interface Whiskey {
    id: number,
    name: string
}

export enum Direction {
    Buy = 1,
    Sell = -1
}