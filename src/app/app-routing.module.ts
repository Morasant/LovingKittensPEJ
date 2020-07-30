import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BodyComponent } from './layout/body/body.component';
import { HomeComponent } from './pages/Home/home.component';
import { OwnersComponent } from './pages/Owners/owners.component';
import { SearchComponent } from './pages/Search/search.componet';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: BodyComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        data:{
          title: 'Inicio',
        },
      },

      {
        path: 'owners',
        component: OwnersComponent,
        data:{
          title: 'Dueños',
        },
      },

      {
        path: 'search',
        component: SearchComponent,
        data:{
          title: 'Buscar',
        },
      }
    ],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
