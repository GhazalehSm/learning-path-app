import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './auth/login/login';
import { StartLearning } from './start-learning/start-learning';
import { authGuard } from './auth/guard/auth-guard';
import { LearningPaths } from './learning-paths/learning-paths';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'login', component: Login },
  {
    path: 'start',
    component: StartLearning,
    canActivate: [authGuard],
  },
  {
    path: 'paths',
    component: LearningPaths,
    canActivate: [authGuard],
  },
];
