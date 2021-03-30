import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeCartComponent } from "./home-cart/home-cart.component";
import { HomeContentComponent } from "./home-content/home-content.component";
import { HomeDetailComponent } from "./home-detail/home-detail.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'detail/:id',
                component: HomeDetailComponent
            },
            {
                path: 'cart',
                component: HomeCartComponent
            },
            {
                path: '',
                component: HomeContentComponent
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class HomeRoutingModule { }