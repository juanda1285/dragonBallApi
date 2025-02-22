export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
};
