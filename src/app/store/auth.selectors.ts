import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.state'; // Ajusta la ruta según tu proyecto

// Selecciona el feature state de autenticación
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selecciona la propiedad `isAuthenticated` del estado de autenticación
export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectUserName = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);
