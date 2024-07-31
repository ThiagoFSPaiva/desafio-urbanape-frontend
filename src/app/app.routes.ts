import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';

import { UserComponent } from './user/user.component';
import { authGuard } from '../auth/auth.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { adminGuard } from '../auth/admin.guard';
import { CardComponent } from './card/card.component';



export const routes: Routes = [
  { path: "", component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [authGuard] },
      { path: 'user', component: UserComponent, canActivate: [adminGuard] },
      { path: 'card', component: CardComponent, canActivate: [adminGuard] },
    ],
  },
  { path: 'not-found', component: PageNotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];