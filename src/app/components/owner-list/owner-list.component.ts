import { Component, OnInit } from '@angular/core';
import { OwnersService } from 'src/core/services/owners.service';
import { CounterCatService } from 'src/core/services/counter-cat.service';
import { Subscription } from 'rxjs';
import { CounterFavService } from 'src/core/services/counter-fav.service';
import { DataFavService } from 'src/core/services/data-fav.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-owner-list',
  templateUrl: 'owner-list.component.html',
})
export class OwnerListComponent implements OnInit {
  public ownerList;
  public withoutOwnerList;
  public errorMessage;
  public loading;
  public selected;
  public ownerSelected;

  public subscripcionCat: Subscription;
  public countCat = 0;
  public subscripcionFav: Subscription;
  public countFav = 0;

  public subscripcionDataFav: Subscription;
  public dataFav;

  private finishPage: number;
  private actualPage: number;

  public search: boolean;
  public filterSearch;
  public url;

  constructor(
    private _ownerService: OwnersService,
    private _route: ActivatedRoute,
    private _counterCatService: CounterCatService,
    private _counterFavService: CounterFavService,
    private _dataFavService: DataFavService,
    ) {}

  ngOnInit() {
    this.initVariables();
    this.searchBar();
    this.getOrderList(this.actualPage);

    //Falta poner límite 2 caracteres filter search
  }

  public initVariables(){
    this.ownerList = [];
    this.withoutOwnerList = "";
    this.loading = true;

    this.subscripcionCat = this._counterCatService.getContadorMatagatos().subscribe(counter => {this.countCat = counter});
    this.subscripcionFav = this._counterFavService.getContadorFavoritos().subscribe(counter => {this.countFav = counter});

    this.actualPage = 1;

    this.search = false;
    this.filterSearch = '';

  }
  public getOrderList(actualPage) {

    this._counterCatService.setContadorMatagatos(this.incrementCat());

    this._ownerService.get(actualPage).subscribe(
      (response: any) => {
        if (response) {
          //console.log(response);
          this.ownerList = response.result;
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

  public onSelect(id){

    this.selected = id;

    this._counterCatService.setContadorMatagatos(this.incrementCat());

    this._ownerService.getDetail(id).subscribe(
      (response: any) => {
        if (response) {
          //console.log(response);
          this.ownerSelected = response.result;
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

  public onSubmit(filterSearch){

    this._counterCatService.setContadorMatagatos(this.incrementCat());

    this.filterSearch = filterSearch;

    this._ownerService.getSearchDetail(this.filterSearch, this.actualPage).subscribe(
      (response: any) => {
        if (response) {
          //console.log(response);
          this.ownerList = response.result;
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

  public incrementCat(){
    this.countCat +=1;
    return this.countCat;
  }

  public incrementFav(){
    this.countFav +=1;
    return this.countFav;
  }

  public saveFav(owner){
    this.errorMessage = '';
    this.subscripcionDataFav = this._dataFavService.getDataFav().subscribe(data => {this.dataFav = data});
    let comprobacion = this.dataFav.includes(owner);
    if(!comprobacion){
      this._counterFavService.setContadorFavoritos(this.incrementFav());
      this._dataFavService.setDataFav(owner);
    }
    else {
      this.errorMessage = 'existe';
      $(".alert").alert('show');
      setTimeout(function() {
        $(".alert").alert('close');
    }, 3000);
    }

  }

  public showMore(){
    if (this.actualPage < this.finishPage) {
      this.actualPage ++;
      if(this.search){
        this.onSubmit(this.filterSearch);
        this.actualPage = 1;
      }
      else{
        this.getOrderList(this.actualPage);
      }

    } else {
      console.log('No more lines. Finish page!');
    }
  }

  public searchBar(){
    this._route.url.subscribe(data => this.url = data);
    this.url.forEach(element => {
      if(element.path == 'search'){
        this.search = true;
      }
      else{
        this.search = false;
      }
    });
  }
}
