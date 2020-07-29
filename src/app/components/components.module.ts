import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  declarations: [
    OwnerListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    InfiniteScrollModule,
  ],
  exports: [
    OwnerListComponent
  ],
  providers: [],
  bootstrap: []
})
export class ComponentsModule { }
