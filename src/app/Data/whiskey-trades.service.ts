import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Direction } from 'readline';
import { Observable } from 'rxjs';
import { Whiskey, WhiskeyTrade } from '../entities';
import { NotificationsService } from '../notifications.service';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class WhiskeyTradesService extends CrudService<WhiskeyTrade> {
  constructor(private http: HttpClient, private notifications: NotificationsService) {
    super(http, notifications);
  }

  get path(): string {
    return 'whiskeytrades';
  }

  new(whiskey: Whiskey, numberOfBottles: number, price: number, direction: Direction): Observable<WhiskeyTrade> {
    const wt: WhiskeyTrade = { id: this.getNewId(), whiskeyId: whiskey.id, numberOfBottles: numberOfBottles, pricePerBottle: price, date: new Date(), direction: direction, active: true };
    return this.save(wt);
  }
}