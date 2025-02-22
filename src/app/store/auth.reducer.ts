import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from './auth.state';
import { login, logout } from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  on(login, (state, { username }) => ({
    ...state,
    isAuthenticated: true,
    user: username,
  })),
  on(logout, (state) => {
    localStorage.removeItem('auth');
    return {
      ...state,
      isAuthenticated: false,
      user: null
    }
  })
);
