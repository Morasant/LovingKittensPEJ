import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router, ActivatedRoute, RouterModule, NavigationEnd, ChildActivationEnd, RouteConfigLoadEnd  } from '@angular/router';

import { filter, tap, buffer, takeUntil, switchMapTo, map, shareReplay } from 'rxjs/operators';

import { Subject, defer } from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: 'body.component.html'
})

export class BodyComponent implements OnInit, OnDestroy {

  private ngUnsubscribe$ = new Subject();

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const routeEndEvent$ = this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        tap(() => console.warn("END")),
    );

    this.router.events
      .pipe(
        filter(e => e instanceof ChildActivationEnd && e.snapshot.component === this.route.component),
        buffer(routeEndEvent$),
        map(([ev]) => (ev as ChildActivationEnd).snapshot.firstChild.data),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe(childRoute => {
        console.log('childRoute', childRoute);
      })
   }
   ngOnDestroy () {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
