import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent, ErrorPageComponent } from '.';


const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: LoginPageComponent
            },
            {
                path: 'error/:status',
                component: ErrorPageComponent
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AuthRoutingModule {
}
