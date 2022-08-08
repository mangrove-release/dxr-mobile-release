import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './visitor/user-login/user-login.component';

const routes: Routes = [


    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    },
    // {
    //     path: 'load',
    //     loadChildren: () => import('./driver/driver.module').then(m => m.DriverPageModule)
    // },
    // {
    //     path: 'tabs',
    //     component: TabsPage,
    //     children: [
    //         {
    //             path: 'tab1',
    //             loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
    //         },
    //         {
    //             path: 'tab2',
    //             loadChildren: () => import('./tab2/tab2.module').then(m => m.Tab2PageModule)
    //         },
    //         {
    //             path: 'tab-three',
    //             loadChildren: () => import('./tab3/tab3.module').then(m => m.Tab3PageModule)
    //         },


    //     ]
    // },
    // {
    //     path: 'visitor',
    //     loadChildren: () => import('./visitor/visitor.module').then(m => m.VisitorPageModule)
    // },
    {
        path: 'load',
        loadChildren: () => import('./load/load.module').then(m => m.LoadPageModule)
    },
    {
        path: 'unload',
        loadChildren: () => import('./unload/unload.module').then(m => m.UnloadPageModule)
    },
    // {
    //     path: 'dumper',
    //     loadChildren: () => import('./dumper/dumper.module').then(m => m.DumperPageModule)
    // },

    // {
    //     path: 'login/:redirectSessionId',
    //     component: UserLoginComponent
    // },
    {
        path: 'login',
        component: UserLoginComponent
    },
    // {
    //     path: ':redirectSessionId',
    //     component: AppComponent
    // },
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
