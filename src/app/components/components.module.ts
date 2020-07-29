import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from './owner-list/owner-list.component';

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
