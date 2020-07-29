import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataFavService {

  private dataFav$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor() {}

  public setDataFav(data){
    console.log(data);
    let newData = this.dataFav$.getValue();
    newData.push(data);
    console.log(newData);
    this.dataFav$.next(newData);
    console.log(this.dataFav$);

  }

  public getDataFav(): Observable<any>{
    return this.dataFav$.asObservable();
  }
}
