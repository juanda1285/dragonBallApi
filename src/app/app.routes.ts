import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guards';

import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { NoAuthGuard } from './guards/no-auth.guards';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] }, // Carga el LoginComponent
  { path: '', redirectTo: '/characters', pathMatch: 'full' }, // Redirige a /characters
  {
    path: 'characters',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/character-list/character-list.component').then(
        (m) => m.CharacterListComponent
      ),
  },
  {
    path: 'characters/:id',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./pages/character-detail/character-detail.component').then(
        (m) => m.CharacterDetailComponent
      ),
  },
  { path: 'error/:type', component: ErrorPageComponent }, // Página genérica para otros errores
  { path: '**', redirectTo: '/error/404' },
];
