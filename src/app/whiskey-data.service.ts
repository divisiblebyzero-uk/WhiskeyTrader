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





}
