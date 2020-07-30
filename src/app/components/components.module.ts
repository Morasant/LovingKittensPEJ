import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OwnerListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  exports: [
    OwnerListComponent,
  ],
  providers: [],
  bootstrap: []
})
export class ComponentsModule { }
