import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from '../app/admin/admin.module';
import { HomeModule } from '../app/home/home.module';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import('../app/admin/admin.module').then(m => AdminModule)
  },
  {
    path: 'home',
    loadChildren: () => import('../app/home/home.module').then(m => HomeModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
