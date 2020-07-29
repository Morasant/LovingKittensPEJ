import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterFavService {

  private contadorFavoritos$: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor() {}

  public setContadorFavoritos(counter) {
    this.contadorFavoritos$.next(counter);
  }

  public getContadorFavoritos():Observable<any> {
    return this.contadorFavoritos$.asObservable();
  }

}
