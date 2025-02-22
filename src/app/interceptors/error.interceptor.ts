import {
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export function errorInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const router = inject(Router);

    // Excluir solicitudes a /assets/i18n/ del interceptor
  if (request.url.includes('/assets/i18n/')) {

    return next(request); // Pasar la solicitud sin modificaciones
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorType = 'error'; // Valor por defecto para errores genéricos

      if (error.status === 404) {
        errorType = '404'; // Error 404
      } else if (error.status === 400) {
        errorType = '400'; // Error 400
      }

      // Redirigir a la página de error única con el tipo de error como parámetro
      router.navigate(['/error', errorType]);
      return throwError(() => error);
    })
  );
}
