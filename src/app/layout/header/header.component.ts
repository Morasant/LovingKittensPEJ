import { Component, OnInit, OnDestroy } from '@angular/core';

import {
  Router,
  ActivatedRoute,
  NavigationEnd,
  ChildActivationEnd,
} from '@angular/router';

import { filter, tap, buffer, takeUntil, map } from 'rxjs/operators';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private ngUnsubscribe$ = new Subject();

  public title: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.title = this.route.snapshot.firstChild.data['title'];
  }

  ngOnInit() {
    const routeEndEvent$ = this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      tap(() => console.warn('END'))
    );

    this.router.events
      .pipe(
        filter(
          (e) =>
            e instanceof ChildActivationEnd &&
            e.snapshot.component === this.route.component
        ),
        buffer(routeEndEvent$),
        map(([ev]) => (ev as ChildActivationEnd).snapshot.firstChild.data),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe((childRoute) => {
        this.title = childRoute['title'];
        console.log(this.title);
      });
  }
  ngOnDestroy() {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}