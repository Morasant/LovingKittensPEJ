import { Component, OnInit } from '@angular/core';
import { OwnersService } from 'src/core/services/owners.service';
import { CounterCatService } from 'src/core/services/counter-cat.service';
import { Subscription } from 'rxjs';
import { CounterFavService } from 'src/core/services/counter-fav.service';
import { DataFavService } from 'src/core/services/data-fav.service';

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

  public subcripcionCat: Subscription;
  public subcripcionFav: Subscription;
  public countCat = 0;
  public countFav = 0;

  private finishPage: number;
  private actualPage: number;
  private showGoUpButton: boolean;

  constructor(
    private _ownerService: OwnersService,
    private _counterCatService: CounterCatService,
    private _counterFavService: CounterFavService,
    private _dataFavService: DataFavService,
    ) {}

  ngOnInit() {
    this.initVariables();
    this.getOrderList(this.actualPage);
  }

  public initVariables(){
    this.subcripcionCat = this._counterCatService.getContadorMatagatos().subscribe(counter => {this.countCat = counter});
    this.subcripcionFav = this._counterFavService.getContadorFavoritos().subscribe(counter => {this.countFav = counter});

    this.actualPage = 1;
    this.showGoUpButton = false;

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

    this._counterCatService.setContadorMatagatos(this.incrementCat());

    this._ownerService.getDetail(id).subscribe(
      (response: any) => {
        if (response) {
          //console.log(response);
          this.selected = response.result;
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
    this._counterFavService.setContadorFavoritos(this.incrementFav());
    this._dataFavService.setDataFav(owner);
  }

  public verMas(){
    if (this.actualPage < this.finishPage) {
      this.actualPage ++;
      this.getOrderList(this.actualPage);

    } else {
      console.log('No more lines. Finish page!');
    }
  }
/*   add20lines() {
    const line = 'Another new line -- ';
    let lineCounter = this.linesToWrite.length;
    for (let i = 0; i < 20; i ++) {
      this.linesToWrite.push(line + lineCounter);
      lineCounter ++;
    }
  } */

  onScroll() {
    if (this.actualPage < this.finishPage) {
      /* this.actualPage ++;
      this.getOrderList(this.actualPage); */

    } else {
      console.log('No more lines. Finish page!');
    }
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }
}
