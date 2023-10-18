import { Route } from '@angular/router';
import { ShellComponent } from './core/components/shell/shell.component';
import {
  DashboardComponent,
  ItemListComponent,
  ItemFormComponent,
  UserListComponent,
  UserFormComponent
} from './pages';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './auth/guards';



export const appRoutes: Route[] = [
  { 
    path: 'login', 
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule) },
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        data: {breadcrumb: 'Inventory'},
        component: ItemListComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'items',
        data: {breadcrumb: 'Inventory'},
        component: ItemListComponent,
      },
      {
        path: 'items/form',
        component: ItemFormComponent,
      },
      {
        path: 'items/form/:id',
        component: ItemFormComponent,
      },
      {
        path: 'users',
        data: {breadcrumb: 'Users'},
        component: UserListComponent,
      },
      {
        path: 'users/form',
        component: UserFormComponent,
      },
      {
        path: 'users/form/:id',
        component: UserFormComponent,
      },
    ],
  },
];
