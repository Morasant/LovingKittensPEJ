import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataFavService {

  private dataFav$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {}

  public setDataFav(data){
    let newData = this.dataFav$.getValue();
    if(newData.includes(data) != true){
      newData.push(data);
      this.dataFav$.next(newData);
    }

  }

  public getDataFav(): Observable<any>{
    return this.dataFav$.asObservable();
  }
}
