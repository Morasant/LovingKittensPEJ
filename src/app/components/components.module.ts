import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from './ownerList/ownerList.component';

@NgModule({
  declarations: [
    OwnerListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    OwnerListComponent
  ],
  providers: [],
  bootstrap: []
})
export class ComponentsModule { }
