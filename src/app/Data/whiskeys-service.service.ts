import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Whiskey } from '../entities';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhiskeysService extends CrudService<Whiskey> {
  constructor(private http: HttpClient) {
    super(http);
  }

  get path(): string {
    return 'whiskeys';
  }

  new(whiskeyName: string): Observable<Whiskey> {
    const w: Whiskey = { id: this.getNewId(), name: whiskeyName, active: true, distiller: '', description: '', created: new Date(), updated: new Date() };
    return this.save(w);
  }
}