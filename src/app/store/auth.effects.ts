// import { Injectable } from '@angular/core';
// import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { of } from 'rxjs';
// import { catchError, map, mergeMap } from 'rxjs/operators';
// import { login, loginSuccess, loginFailure } from './auth.actions';

// @Injectable()
// export class AuthEffects {
//   constructor(private actions$: Actions) {}

//   login$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(login), // Escucha la acción 'login'
//       mergeMap((action) => {
//         // Simula una llamada HTTP o lógica de autenticación
//         if (action.username === 'juan' && action.password === '1234') {
//           return of(loginSuccess({ username: action.username })); // Despacha éxito
//         } else {
//           return of(loginFailure({ error: 'Usuario o contraseña incorrectos' })); // Despacha error
//         }
//       }),
//       catchError((error) => of(loginFailure({ error: error.message }))) // Maneja errores
//     )
//   );
// }
