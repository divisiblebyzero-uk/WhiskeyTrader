import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { Whiskey } from "../entities";
import { environment as env } from '../../environments/environment';

export abstract class CrudService<T extends { id?: string, active: boolean }> {
  private values$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  private fetched: boolean = false;

  protected constructor(protected _http: HttpClient, protected cache = true) {}

  abstract get path(): string;

  get url(): string {
    return env.api.serverUrl + "/api/data/" + this.path;
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


  list(): Observable<T[]> {
    if (this.fetched && this.values$.value && this.cache) {
      return this.values$.asObservable();
    }
    console.log("Not found: fetching");
    return this._http.get<T[]>(`${this.url}`).pipe(
      switchMap((values: T[]) => {
        this.values$.next(values);
        return this.values$;
      }),
      tap(w => this.fetched = true)
    );
  }

  get(valueId: number | string): Observable<T> {
    return this._http.get<T>(`${this.url}/${valueId}`);
  }

  save(value: T): Observable<T> {
    return this._http.put<T>(`${this.url}`, value).pipe(
      tap((_value: T) => {
        const values: T[] = [...this.values$.value].filter(v => v.id != _value.id);
        values.push(_value);
        this.values$.next(values);
        return _value;
      })
    );
  }

  delete(value: T): Observable<T> {
    value.active = false;
    return this.save(value);
  }

  editValue(value: T, _value: T) {
    const values: T[] = [...this.values$.value];
    const valueIndex: number = values.findIndex(
      (item: T) => item.id === value.id
    );
    values[valueIndex] = _value;
    this.values$.next(values);
    return _value;
  }
}


