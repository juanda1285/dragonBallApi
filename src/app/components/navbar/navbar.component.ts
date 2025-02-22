import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectUserName } from '../../store/auth.selectors';
import { logout } from '../../store/auth.actions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
})
export class NavbarComponent {
  isLoggedIn = false;
  userName: string | null = null;


  constructor(
    private translate: TranslateService,
    private router: Router,private store: Store
  ) {
    this.store.select(selectIsAuthenticated).subscribe((isAuthenticated) => {
      this.isLoggedIn = isAuthenticated;
    });

    this.store.select(selectUserName).subscribe((name) => {
      this.userName = name;
    });
  }

  // Cambiar el idioma
  changeLanguage(lang: string): void {
    this.translate.use(lang);
  }

  // Cerrar sesión
  logout(): void {
    this.store.dispatch(logout());;
    this.router.navigate(['/login']);
  }
}
