import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  ChildActivationEnd,
} from '@angular/router';

import { filter, buffer, takeUntil, map } from 'rxjs/operators';

import { Subject, Subscription } from 'rxjs';
import { CounterCatService } from 'src/core/services/counter-cat.service';
import { CounterFavService } from 'src/core/services/counter-fav.service';
import { DataFavService } from 'src/core/services/data-fav.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  public title: String;
  private ngUnsubscribe$ = new Subject();

  public contadorMataGatos: number;
  public subscripcionCat: Subscription;

  public contadorFavoritos: number;
  public subscripcionFav: Subscription;

  public dataFav;
  public subscripcionDataFav: Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _counterCatService: CounterCatService,
    private _counterFavService: CounterFavService,
    private _dataFavService: DataFavService,
    ) {
    this.title = this._route.snapshot.firstChild.data['title'];
  }

  ngOnInit() {

    this.initVariables();
    this.tituloDinamico();

  }

  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
    this.subscripcionCat.unsubscribe();
    this.subscripcionFav.unsubscribe();
    this.subscripcionDataFav.unsubscribe();
  }

  public initVariables(){

    this.subscripcionCat = this._counterCatService.getContadorMatagatos().subscribe(data => {this.contadorMataGatos = data});
    this.subscripcionFav = this._counterFavService.getContadorFavoritos().subscribe(data =>{this.contadorFavoritos = data});
    this.subscripcionDataFav = this._dataFavService.getDataFav().subscribe(data => {this.dataFav = data});

  }

  public tituloDinamico(){
    const routeEndEvent$ = this._router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
    );

    this._router.events
      .pipe(
        filter(
          (e) =>
            e instanceof ChildActivationEnd &&
            e.snapshot.component === this._route.component
        ),
        buffer(routeEndEvent$),
        map(([ev]) => (ev as ChildActivationEnd).snapshot.firstChild.data),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((childRoute) => {
        this.title = childRoute['title'];
        //console.log(this.title);
      });
  }

}
