import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeNavComponent } from './home-nav/home-nav.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { HomeCartComponent } from './home-cart/home-cart.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent, 
    HomeNavComponent, 
    HomeContentComponent, 
    HomeDetailComponent, 
    HomeCartComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class HomeModule { }
