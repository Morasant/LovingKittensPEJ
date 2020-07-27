import { NgModule } from '@angular/core';

import { BodyComponent } from './body/body.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../components/components.module';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [
    BodyComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    PagesModule,
  ],
  exports: [
    BodyComponent,
  ],
  providers: [],
  bootstrap: []
})
export class LayoutModule { }
