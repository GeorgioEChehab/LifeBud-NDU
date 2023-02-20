import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: HomePage,
    children: [
      {
        path: 'main',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/main/main.module').then((m) => m.MainPageModule)
          }
        ]
      },
      {
        path: 'forecast',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/forecast/forecast.module').then((m) => m.ForecastPageModule)
          }
        ]
      },
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/add/add.module').then((m) => m.AddPageModule)
          }
        ]
      },
      {
        path: 'done',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/tasks/tasks.module').then((m) => m.TasksPageModule)
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/settings/settings.module').then((m) => m.SettingsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/main',
        pathMatch: 'full'
      }
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}