import { Injectable } from '@angular/core';
import { Whiskey, WhiskeyPosition, WhiskeyPrice, WhiskeyTrade } from './entities';
import { WHISKEYS, WHISKEY_PRICES, WHISKEY_POSITIONS, WHISKEY_TRADES } from './mock-data';

@Injectable({
  providedIn: 'root'
})
export class WhiskeyDataService {

  constructor() { }

  public getWhiskeys(): Whiskey[] {
    return WHISKEYS;
  }

  public getWhiskeyPrices(): WhiskeyPrice[] {
    return WHISKEY_PRICES;
  }

  public getWhiskeyPositions(): WhiskeyPosition[] {
    return WHISKEY_POSITIONS;
  }

  public getWhiskeyTrades(): WhiskeyTrade[] {
    return WHISKEY_TRADES;
  }

  public getWhiskeyName(whiskeyId: number): string {
    const result = this.getWhiskeys().find(whiskey => whiskey.id == whiskeyId);
    return result?result.name:'Undefined';
  }
}
