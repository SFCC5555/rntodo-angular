import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent) },
  { path: 'todos', canActivate: [authGuard], loadComponent: () => import('./pages/todos/todos.component').then(m => m.TodosComponent) },
  { path: 'confirm', loadComponent: () => import('./pages/confirm/confirm.component').then(m => m.ConfirmComponent) },
  { path: 'download', loadComponent: () => import('./pages/download/download.component').then(m => m.DownloadComponent) },
  { path: '**', redirectTo: 'login' },
];
