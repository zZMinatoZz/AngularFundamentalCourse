import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminBooksComponent } from "./admin-books/admin-books.component";
import { AdminCreateComponent } from "./admin-create/admin-create.component";
import { AdminEditComponent } from "./admin-edit/admin-edit.component";
import { AdminHomeComponent } from "./admin-home/admin-home.component";

const routes: Routes = [
    {
        path: 'home',
        component: AdminHomeComponent,
        children: [
            {
                path: '',
                component: AdminBooksComponent
            },
            {
                path: 'edit/:id',
                component: AdminEditComponent
            },
            {
                path: 'create',
                component: AdminCreateComponent
            },
            {
                path: '**',
                redirectTo: '',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'home',
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

export class AdminRoutingModule { }