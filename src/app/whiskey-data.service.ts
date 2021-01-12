import { Injectable } from '@angular/core';
import { Direction, Whiskey, WhiskeyDetails, WhiskeyPrice, WhiskeyTrade } from './entities';
import { environment as env } from '../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, publishReplay, refCount, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from './notifications.service';

@Injectable({
  providedIn: 'root'
})
export class WhiskeyDataService {

  private static readonly WHISKEYS_ITEM_KEY = 'whiskeys';
  private static readonly WHISKEY_PRICES_ITEM_KEY = 'whiskey-prices';
  private static readonly WHISKEY_TRADES_ITEM_KEY = 'whiskey-trades';

  private BASE_API_URL = env.api.serverUrl + "/api/data";
  public WHISKEYS_URL = this.BASE_API_URL + "/whiskeys";
  private WHISKEYPRICES_URL = this.BASE_API_URL + "/whiskeyprices";
  private WHISKEYTRADES_URL = this.BASE_API_URL + "/whiskeytrades";

  constructor(private notifications: NotificationsService, private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.notifications.showError(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getNewId(): string {
    const stringArr = [];
    for(let i = 0; i<4; i++){
      // tslint:disable-next-line:no-bitwise
      const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      stringArr.push(S4);
    }
    return stringArr.join('-');
  }

  whiskeys: Observable<Whiskey[]>|null = null;
  whiskeyPrices: Observable<WhiskeyPrice[]>|null = null;
  whiskeyTrades: Observable<WhiskeyTrade[]>|null = null;

  public getWhiskeys(): Observable<Whiskey[]> {
    if (!this.whiskeys) {
      console.log("whiskey cache empty - fetching from server");
      this.whiskeys = this.http.get<Whiskey[]>(this.WHISKEYS_URL)
      .pipe(
        catchError (this.handleError<Whiskey[]>('getWhiskeys', [])),
        publishReplay(1),
        refCount()
      )
    }
    return this.whiskeys;
  }

  private clearWhiskeysCache() {
    this.whiskeys = null;
  }

  public saveWhiskey(whiskey: Whiskey): Observable<Whiskey> {
    whiskey.updated = new Date();
    return this.http.put<Whiskey>(this.WHISKEYS_URL, whiskey)
    .pipe(
      catchError(this.handleError<Whiskey>('getWhiskey', whiskey))
    );
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

  public getWhiskeyName(whiskeyId: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.getWhiskeys().subscribe(whiskeys => {
        const result = whiskeys.find(whiskey => whiskey.id == whiskeyId);
        resolve(result?result.name:'Undefined');
      });
    });
  }

  public getWhiskeyDetails(whiskeyId: string): Promise<WhiskeyDetails> {
    return new Promise<WhiskeyDetails>(resolve => {
      this.getWhiskeys().subscribe(whiskeys => {
        const whiskey: Whiskey | undefined = whiskeys.find(w => w.id == whiskeyId);
        if (whiskey) {
          resolve({
            whiskey: whiskey,
            prices: this.getWhiskeyPrices().filter(wp => wp.whiskeyId == whiskeyId && wp.active)
          });
        } else {
          throw 'Whiskey not found: ' + whiskeyId;
        }
      });
    });
  }
}
