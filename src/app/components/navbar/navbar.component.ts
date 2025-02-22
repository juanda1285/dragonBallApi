import { Component } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
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
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, TranslateModule],
})
export class NavbarComponent {
  isLoggedIn = false;
  userName: string | null = null;
  currentLanguage: string = 'es';


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
  changeLanguage() {
    this.currentLanguage = this.currentLanguage === 'es' ? 'en' : 'es'; // Cambia entre 'es' y 'en'
    const language = this.currentLanguage;
    // Aquí llamas a tu servicio o función para cambiar el idioma en la aplicación
    // Por ejemplo:
    this.translate.use(language); // Si estás usando ngx-translate
  }

  getLanguageText(): string {
    return this.currentLanguage === 'es' ? 'SPANISH' : 'ENGLISH';
  }

  // Cerrar sesión
  logout(): void {
    this.store.dispatch(logout());;
    this.router.navigate(['/login']);
  }
}
