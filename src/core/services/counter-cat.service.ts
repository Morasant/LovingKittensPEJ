import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CounterCatService {

  private contadorMatagatos$: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor() {}

  public setContadorMatagatos(counter) {
    this.contadorMatagatos$.next(counter);
  }

  public getContadorMatagatos():Observable<any> {
    return this.contadorMatagatos$.asObservable();
  }

}
