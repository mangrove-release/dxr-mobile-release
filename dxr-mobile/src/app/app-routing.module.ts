import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './visitor/user-login/user-login.component';

const routes: Routes = [


    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    {
        path: 'load',
        loadChildren: () => import('./load/load.module').then(m => m.LoadPageModule)
    },
    {
        path: 'unload',
        loadChildren: () => import('./unload/unload.module').then(m => m.UnloadPageModule)
    },

    {
        path: 'login',
        component: UserLoginComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'super-admin',
        loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminPageModule)
    },


];
@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
