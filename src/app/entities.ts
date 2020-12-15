export interface WhiskeyTrade {
    id: string,
    whiskeyId: string,
    numberOfBottles: number,
    pricePerBottle: number,
    date: Date,
    direction: Direction,
    active: boolean
}

export interface WhiskeyPosition {
    id: string,
    whiskeyId: string,
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

export interface PersistencePayload {
    whiskeys: Whiskey[],
    whiskeyPrices: WhiskeyPrice[],
    whiskeyTrades: WhiskeyTrade[]
}