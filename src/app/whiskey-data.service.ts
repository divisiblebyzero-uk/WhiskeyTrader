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

  public saveWhiskey(whiskey: Whiskey): void {
    
  }

  public addNewWhiskey(whiskeyName: string): Whiskey {
    const currentMaxId = Math.max.apply(Math, WHISKEYS.map(w => w.id));
    return { id: currentMaxId+1, name: whiskeyName };
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
