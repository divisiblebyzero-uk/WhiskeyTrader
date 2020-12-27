import { Injectable } from '@angular/core';
import { Direction, Whiskey, WhiskeyDetails, WhiskeyPosition, WhiskeyPrice, WhiskeyTrade } from './entities';

@Injectable({
  providedIn: 'root'
})
export class WhiskeyDataService {

  private static readonly WHISKEYS_ITEM_KEY = 'whiskeys';
  private static readonly WHISKEY_PRICES_ITEM_KEY = 'whiskey-prices';
  private static readonly WHISKEY_TRADES_ITEM_KEY = 'whiskey-trades';

  constructor() { }

  getNewId(): string {
    const stringArr = [];
    for(let i = 0; i<4; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  public getWhiskeys(): Whiskey[] {
    const jsonData = localStorage.getItem(WhiskeyDataService.WHISKEYS_ITEM_KEY);
    if (jsonData) {
      return JSON.parse(jsonData);
    } else {
      return [];
    }
  }

  public saveWhiskey(whiskey: Whiskey): void {
    whiskey.updated = new Date();

    let whiskeys: Whiskey[] = this.getWhiskeys();

    whiskeys = whiskeys.filter(w => w.id != whiskey.id);
    whiskeys.push(whiskey);

    this.saveWhiskeys(whiskeys);
  }

  private saveWhiskeys(whiskeys: Whiskey[]): void {
    const jsonData = JSON.stringify(whiskeys);
    localStorage.setItem(WhiskeyDataService.WHISKEYS_ITEM_KEY, jsonData);
  }

  public addNewWhiskey(whiskeyName: string): Whiskey {
    const w: Whiskey = { id: this.getNewId(), name: whiskeyName, active: true, distiller: '', description: '', created: new Date(), updated: new Date() };
    this.saveWhiskey(w);
    return w;
  }

  public deleteAll(): void {
    localStorage.clear();
  }

  public deleteWhiskey(whiskey: Whiskey): void {
    whiskey.active = false;
    this.saveWhiskey(whiskey);
  }

  public getWhiskeyPrices(): WhiskeyPrice[] {
    const jsonData = localStorage.getItem(WhiskeyDataService.WHISKEY_PRICES_ITEM_KEY);
    if (jsonData) {
      return JSON.parse(jsonData);
    } else {
      return [];
    }
  }

  public saveWhiskeyPrice(whiskeyPrice: WhiskeyPrice): void {
    const whiskeyPrices: WhiskeyPrice[] = this.getWhiskeyPrices().filter(wp => wp.id != whiskeyPrice.id);
    whiskeyPrices.push(whiskeyPrice);
    this.saveWhiskeyPrices(whiskeyPrices);
  }

  public saveWhiskeyPrices(whiskeyPrices: WhiskeyPrice[]): void {
    const jsonData = JSON.stringify(whiskeyPrices);
    localStorage.setItem(WhiskeyDataService.WHISKEY_PRICES_ITEM_KEY, jsonData);
  }

  public deleteWhiskeyPrice(whiskeyPrice: WhiskeyPrice): void {
    whiskeyPrice.active = false;
    this.saveWhiskeyPrice(whiskeyPrice);
  }

  public addNewWhiskeyPrice(whiskey: Whiskey): WhiskeyPrice {
    const wp: WhiskeyPrice = { id: this.getNewId(), whiskeyId: whiskey.id, date: new Date(), price: 0, active: true };
    this.saveWhiskeyPrice(wp);
    return wp;
  }

  public getLatestPrice(whiskeyId: string): number {
    const prices = this.getWhiskeyPrices().filter(p => p.whiskeyId == whiskeyId && p.active);
    if (prices.length > 0) {
      return prices.sort((a,b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))[0].price;
    } else {
      return 0;
    }
  }

  public getWhiskeyTrades(): WhiskeyTrade[] {
    const jsonData = localStorage.getItem(WhiskeyDataService.WHISKEY_TRADES_ITEM_KEY);
    if (jsonData) {
      return JSON.parse(jsonData);
    } else {
      return [];
    }
  }

  public addNewWhiskeyTrade(whiskey: Whiskey, numberOfBottles: number, price: number, direction: Direction): WhiskeyTrade {
    const wt: WhiskeyTrade = { id: this.getNewId(), whiskeyId: whiskey.id, numberOfBottles: numberOfBottles, pricePerBottle: price, date: new Date(), direction: direction, active: true };
    this.saveWhiskeyTrade(wt);
    return wt;
  }

  public saveWhiskeyTrade(whiskeyTrade: WhiskeyTrade): void {
    const whiskeyTrades: WhiskeyTrade[] = this.getWhiskeyTrades().filter(wt => wt.id != whiskeyTrade.id);
    whiskeyTrades.push(whiskeyTrade);
    this.saveWhiskeyTrades(whiskeyTrades);
  }

  public saveWhiskeyTrades(whiskeyTrades: WhiskeyTrade[]) {
    const jsonData = JSON.stringify(whiskeyTrades);
    localStorage.setItem(WhiskeyDataService.WHISKEY_TRADES_ITEM_KEY, jsonData);
  }

  public deleteWhiskeyTrade(whiskeyTrade: WhiskeyTrade): void {
    whiskeyTrade.active = false;
    this.saveWhiskeyTrade(whiskeyTrade);
  }

  public getWhiskeyName(whiskeyId: string): string {
    const result = this.getWhiskeys().find(whiskey => whiskey.id == whiskeyId);
    return result?result.name:'Undefined';
  }

  public getWhiskeyDetails(whiskeyId: string): WhiskeyDetails {
    const whiskey = this.getWhiskeys().find(w => w.id == whiskeyId);
    if (whiskey) {
      return {
        whiskey: whiskey,
        prices: this.getWhiskeyPrices().filter(wp => wp.whiskeyId == whiskeyId && wp.active)
      }
    } else {
      throw 'Whiskey not found: ' + whiskeyId;
    }
  }
}
