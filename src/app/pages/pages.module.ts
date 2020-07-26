import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { HomeComponent } from './Home/home.component';
import { OwnersComponent } from './Owners/owners.component';
import { SearchComponent } from './Search/search.componet';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    OwnersComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: []
})
export class PagesModule { }
