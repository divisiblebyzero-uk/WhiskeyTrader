import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Whiskey, WhiskeyPrice } from '../entities';
import { NotificationsService } from '../notifications.service';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class WhiskeyPricesService extends CrudService<WhiskeyPrice> {
  constructor(private http: HttpClient, private notifications: NotificationsService) {
    super(http, notifications);
  }

  get path(): string {
    return 'whiskeyprices';
  }

  new(whiskey: Whiskey): Observable<WhiskeyPrice> {
    const wp: WhiskeyPrice = { id: this.getNewId(), whiskeyId: whiskey.id, date: new Date(), price: 0, active: true };
    return this.save(wp);
  }

  public getLatestPrice(whiskeyId: string): Promise<number> {
    return new Promise<number>(resolve => {
      this.list().subscribe(ps => {
        resolve(ps.filter(p => p.whiskeyId == whiskeyId && p.active).sort((a,b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))[0].price);
      });
    });
  }
}