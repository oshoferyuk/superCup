import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AuthGuard } from './core/guards/auth-guard';
import { LoggedGuard } from './core/guards/logged-guard';

const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: '',
                canActivateChild: [AuthGuard],
                loadChildren: './modules/main/main.module#MainModule'
            },
            {
                path: 'login',
                canActivate: [LoggedGuard],
                loadChildren: './modules/auth/auth.module#AuthModule',
            },
            {
                path: 'saml',
                pathMatch: 'full',
                redirectTo: 'campaign'
            },
            {
                path: '**',
                component: PageNotFoundComponent,
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
