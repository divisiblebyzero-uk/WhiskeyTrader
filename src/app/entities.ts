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
    whiskeyId: string,
    numberOfBottles: number,
    totalPurchases: number,
    totalSales: number,
    averagePricePerBottle: number,
    currentMarketPricePerBottle: number,
    openPosition: boolean,
    profit: number,
    profitPerBottle: number,
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

export interface WhiskeyDetails {
    whiskeyId: string,
    whiskeyName: string,
    prices: WhiskeyPrice[]
}