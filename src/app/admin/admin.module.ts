import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminEditComponent } from './admin-edit/admin-edit.component';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminBooksComponent } from './admin-books/admin-books.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatDividerModule } from '@angular/material/divider'
import { MatListModule } from '@angular/material/list'
import { MatExpansionModule } from '@angular/material/expansion'
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdminLoginComponent, AdminHomeComponent, AdminEditComponent, AdminCreateComponent, AdminBooksComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    SharedModule,
    MatDividerModule,
    MatListModule,
    MatExpansionModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
