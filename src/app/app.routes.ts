import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './auth/login/login';
import { StartLearning } from './start-learning/start-learning';
import { authGuardGuard } from './auth-guard-guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  {
    path: 'start',
    component: StartLearning,
    canActivate: [authGuardGuard],
  },
];
