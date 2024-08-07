import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { ROUTES } from './constants/routes';
import { UserListComponent } from './modules/users/user-list/user-list.component';
import { UserDetailsComponent } from './modules/users/user-details/user-details.component';
import { NotFoundComponent } from './modules/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: ROUTES.USER,
        component: UserListComponent,
      },
      {
        path: `${ROUTES.USER}/:id`,
        component: UserDetailsComponent,
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];
