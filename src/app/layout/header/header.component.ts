import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  ChildActivationEnd,
} from '@angular/router';

import { filter, tap, buffer, takeUntil, map } from 'rxjs/operators';

import { Subject, Observable, Subscription } from 'rxjs';
import { CounterCatService } from 'src/core/services/counter-cat.service';
import { CounterFavService } from 'src/core/services/counter-fav.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  public title: String;
  private ngUnsubscribe$ = new Subject();

  public contadorMataGatos: number;
  public subcripcionCat: Subscription;

  public contadorFavoritos: number;
  public subcripcionFav: Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _counterCatService: CounterCatService,
    private _counterFavService: CounterFavService,
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
    this.subcripcionCat.unsubscribe();
    this.subcripcionFav.unsubscribe();
  }

  public initVariables(){

    this.subcripcionCat = this._counterCatService.getContadorMatagatos().subscribe(data => {this.contadorMataGatos = data});
    this.subcripcionFav = this._counterFavService.getContadorFavoritos().subscribe(data =>{this.contadorFavoritos = data});

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
