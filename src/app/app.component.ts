import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { login } from './store/auth.actions';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, TranslateModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'appinit';

  constructor(private store: Store, private translate: TranslateService) {
    this.translate.setDefaultLang('es');
  }

  ngOnInit() {
    const authData = localStorage.getItem('auth');
    if (authData) {
      const { username } = JSON.parse(authData);
      this.store.dispatch(login({ username })); // Restaurar el estado
    }
  }
}
