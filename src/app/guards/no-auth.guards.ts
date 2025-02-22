import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) { }

  canActivate() {
    return this.store.select((state: any) => state.auth.isAuthenticated).pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/characters']); // Cambia '/characters' por la ruta que desees
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
