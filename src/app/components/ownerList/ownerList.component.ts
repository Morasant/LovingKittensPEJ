import { Component, OnInit } from '@angular/core';
import { OwnersService } from 'src/core/services/owners.service';
import { CounterService } from 'src/core/services/counter.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: 'ownerList.component.html',
})
export class OwnerListComponent implements OnInit {
  public ownerList;
  public withoutOwnerList;
  public errorMessage;
  public loading;
  public selected;

  constructor(private ownerService: OwnersService,
    private counterService: CounterService) {}

  ngOnInit() {
    this.getOrderList();
  }

  public getOrderList() {

    this.counterService.setContadorMatagatos(this.counterService.getContadorMatagatos()+1);

    this.ownerService.get().subscribe(
      (response: any) => {
        if (response) {
          console.log(response);
          this.ownerList = response.result;
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
    this.counterService.setContadorMatagatos(this.counterService.getContadorMatagatos()+1);

    this.ownerService.get(id).subscribe(
      (response: any) => {
        if (response) {
          console.log(response);
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
}
