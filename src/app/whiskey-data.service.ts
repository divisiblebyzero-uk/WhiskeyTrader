import { Injectable } from '@angular/core';
import { Whiskey, WhiskeyPosition, WhiskeyPrice, WhiskeyTrade } from './entities';
import { WHISKEYS, WHISKEY_PRICES, WHISKEY_POSITIONS, WHISKEY_TRADES } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class WhiskeyDataService {

  private static readonly WHISKEYS_ITEM_KEY = 'whiskeys';
  private static readonly WHISKEY_PRICES_ITEM_KEY = 'whiskey-prices';

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
    const w: Whiskey = { id: this.getNewId(), name: whiskeyName, active: true };
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
    let whiskeyPrices: WhiskeyPrice[] = this.getWhiskeyPrices();

    whiskeyPrices = whiskeyPrices.filter(wp => wp.id != whiskeyPrice.id);
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
    let wp: WhiskeyPrice = { id: this.getNewId(), whiskeyId: whiskey.id, date: new Date(), price: 0, active: true };
    this.saveWhiskeyPrice(wp);
    return wp;
  }

  public getWhiskeyPositions(): WhiskeyPosition[] {
    return WHISKEY_POSITIONS;
  }

  public getWhiskeyTrades(): WhiskeyTrade[] {
    return WHISKEY_TRADES;
  }

  public getWhiskeyName(whiskeyId: string): string {
    const result = this.getWhiskeys().find(whiskey => whiskey.id == whiskeyId);
    return result?result.name:'Undefined';
  }
}
