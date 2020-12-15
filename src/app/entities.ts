export interface WhiskeyTrade {
    id: string,
    whiskeyId: number,
    numberOfBottles: number,
    pricePerBottle: number,
    date: Date,
    direction: Direction
}

export interface WhiskeyPosition {
    id: string,
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
    id: string,
    whiskeyId: string,
    date: Date,
    price: number,
    active: boolean
}

export interface Whiskey {
    id: string,
    name: string,
    active: boolean
}

export enum Direction {
    Buy = 1,
    Sell = -1
}