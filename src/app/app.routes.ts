import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ROUTES } from './constants/routes';
import { UserListComponent } from './modules/users/user-list/user-list.component';
import { UserDetailsComponent } from './modules/users/user-details/user-details.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { HomeComponent } from './modules/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: ROUTES.HOME,
        component: HomeComponent,
      },
      {
        path: ROUTES.USERS,
        component: UserListComponent,
      },
      {
        path: `${ROUTES.USERS}/:id`,
        component: UserDetailsComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
