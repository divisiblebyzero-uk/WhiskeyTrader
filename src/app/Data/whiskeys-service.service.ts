import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Whiskey, WhiskeyDetails } from '../entities';
import { Observable } from 'rxjs';
import { WhiskeyPricesService } from './whiskey-prices.service';
import { NotificationsService } from '../notifications.service';

@Injectable({
  providedIn: 'root'
})
export class WhiskeysService extends CrudService<Whiskey> {
  constructor(private http: HttpClient, private whiskeyPricesService: WhiskeyPricesService, private notifications: NotificationsService) {
    super(http, notifications);
  }

  get path(): string {
    return 'whiskeys';
  }

  new(whiskeyName: string): Observable<Whiskey> {
    const w: Whiskey = { id: this.getNewId(), name: whiskeyName, active: true, distiller: '', description: '', created: new Date(), updated: new Date() };
    return this.save(w);
  }

  name(id: string): Promise<string> {
    return new Promise<string>(resolve => {
      this.list().subscribe(whiskeys => {
        const candidate: string | undefined = whiskeys.find(w => w.id == id)?.name;
        if (candidate) {
          resolve(candidate);
        } else {
          resolve("");
        }
      })
    });
  }

  getWhiskeyDetails(whiskeyId: string): Promise<WhiskeyDetails> {
    return new Promise<WhiskeyDetails>(resolve => {
      this.list().subscribe(whiskeys => {
        const whiskey: Whiskey | undefined = whiskeys.find(w => w.id == whiskeyId);
        if (whiskey) {
          this.whiskeyPricesService.list().subscribe(prices => {
            resolve({
              whiskey: whiskey,
              prices: prices.filter(wp => wp.whiskeyId == whiskeyId && wp.active).sort((a,b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
              });
          });
        } else {
          throw 'Whiskey not found: ' + whiskeyId;
        }
      });
    });
  }

}