import { Component, OnInit, HostListener } from '@angular/core';
import { OwnersService } from 'src/core/services/owners.service';
import { CounterCatService } from 'src/core/services/counter-cat.service';
import { Subscription, Observable, fromEvent } from 'rxjs';
import { CounterFavService } from 'src/core/services/counter-fav.service';
import { DataFavService } from 'src/core/services/data-fav.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, debounceTime } from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'app-owner-list',
  templateUrl: 'owner-list.component.html',
})
export class OwnerListComponent implements OnInit {
  public principalList;
  public ownerList;
  public withoutOwnerList: string;
  public errorMessage: string;
  public loading: boolean;
  public selected: any;
  public ownerSelected: any;

  public subscripcionCat: Subscription;
  public countCat: number;
  public subscripcionFav: Subscription;
  public countFav: number;

  public subscripcionDataFav: Subscription;
  public dataFav: any[];

  private finishPage: number;
  private actualPage: number;

  public search: boolean;
  public filterSearch;
  public url: any[];

  public showGoUpButton: boolean;
  public showScrollHeight: number;
  public hideScrollHeight: number;

  public listOptions: FormGroup;

  constructor(
    private _ownerService: OwnersService,
    private _route: ActivatedRoute,
    private _counterCatService: CounterCatService,
    private _counterFavService: CounterFavService,
    private _dataFavService: DataFavService
  ) {}

  ngOnInit() {
    this.initVariables();
    this.searchBar();
    this.getOwnerList(this.actualPage);
  }

  public initVariables() {
    this.principalList = [];
    this.ownerList = [];
    this.loading = true;

    this.subscripcionCat = this._counterCatService
      .getContadorMatagatos()
      .subscribe((counter) => {
        this.countCat = counter;
      });
    this.subscripcionFav = this._counterFavService
      .getContadorFavoritos()
      .subscribe((counter) => {
        this.countFav = counter;
      });

    this.actualPage = 1;

    this.search = false;
    this.filterSearch = '';

    this.showGoUpButton = false;
    this.showScrollHeight = 100;
    this.hideScrollHeight = 100;
  }
  public getOwnerList(actualPage: number) {
    this._counterCatService.setContadorMatagatos(this.incrementCat());

    this._ownerService.get(actualPage).subscribe(
      (response: any) => {
        if (response) {
          this.principalList = response.result;

          this.principalList.forEach((element: any) => {
            this.ownerList.push(element);
          });

          console.log(this.ownerList);

          this.finishPage = response._meta.pageCount;

          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
        console.log(this.errorMessage);
      }
    );
  }

  public onSelect(id: any) {
    this.selected = id;

    this._counterCatService.setContadorMatagatos(this.incrementCat());

    this._ownerService.getDetail(id).subscribe(
      (response: any) => {
        if (response) {
          this.ownerSelected = response.result;
          console.log(this.ownerSelected);

          this.loading = false;
        } else {
          this.loading = false;
        }
      },
      (error) => {
        this.errorMessage = <any>error;
        if (this.errorMessage != null) {
        }
        console.log(this.errorMessage);
      }
    );
  }

  public getSearchList() {
    this._counterCatService.setContadorMatagatos(this.incrementCat());
    this._ownerService
      .getSearchDetail(this.filterSearch, this.actualPage)
      .subscribe(
        (response: any) => {
          if (response) {
            this.principalList = response.result;

            this.principalList.forEach((element: any) => {
              this.ownerList.push(element);
            });
            console.log(this.ownerList);

            this.finishPage = response._meta.pageCount;

            this.loading = false;
          } else {
            this.loading = false;
          }
        },
        (error) => {
          this.errorMessage = <any>error;
          if (this.errorMessage != null) {
          }
          console.log(this.errorMessage);
        }
      );
  }

  public onSubmit(filter) {
    this.filterSearch = filter;

    this.actualPage = 1;
    this.ownerList = [];
    if (this.filterSearch.length > 1) {
      this.getSearchList();
    } else {
      this.getOwnerList(this.actualPage);
    }
  }

  public incrementCat() {
    this.countCat += 1;
    return this.countCat;
  }

  public incrementFav() {
    this.countFav += 1;
    return this.countFav;
  }

  public saveFav(owner: { id: any }) {
    this.errorMessage = '';
    this.subscripcionDataFav = this._dataFavService
      .getDataFav()
      .subscribe((data) => {
        this.dataFav = data;
      });

    let comprobacion = this.dataFav.some((e: { id: any }) => e.id == owner.id);

    if (!comprobacion) {
      this._counterFavService.setContadorFavoritos(this.incrementFav());
      this._dataFavService.setDataFav(owner);
    } else {
      this.errorMessage = 'existe';
      $('#alert-fav').removeClass('collapse');
      setTimeout(function () {
        $('#alert-fav').addClass('collapse');
      }, 2500);
    }
  }

  public closeAlert() {
    $('#alert-fav').addClass('collapse');
  }

  public showMore() {
    if (this.actualPage < this.finishPage) {
      this.actualPage++;
      if (this.search) {
        if (this.filterSearch == '') {
          this.getOwnerList(this.actualPage);
        } else {
          this.getSearchList();
        }
      } else {
        this.getOwnerList(this.actualPage);
      }
    } else {
      console.log('Ya no hay más páginas con dueños.');
    }
  }

  //Comprueba que está en la página Buscar
  public searchBar() {
    this._route.url.subscribe((data) => (this.url = data));
    this.url.forEach((element: { path: string }) => {
      if (element.path == 'search') {
        this.search = true;
      } else {
        this.search = false;
      }
    });
  }

  public scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showGoUpButton = true;
    } else if (
      this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showGoUpButton = false;
    }
  }
}
