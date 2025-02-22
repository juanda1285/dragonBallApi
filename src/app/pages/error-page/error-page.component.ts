import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterLink],
})
export class ErrorPageComponent {
  private route = inject(ActivatedRoute); // Inyecta ActivatedRoute

  errorType: string = ''; // Tipo de error (404, 400, etc.)
  errorMessage: string = ''; // Mensaje de error personalizado

  ngOnInit(): void {
    // Obtén el tipo de error de los parámetros de la ruta
    this.route.params.subscribe((params) => {
      this.errorType = params['type']; // Ejemplo: /error/404 -> type = '404'
      this.setErrorMessage(this.errorType); // Configura el mensaje según el tipo de error
    });
  }

  private setErrorMessage(type: string): void {
    switch (type) {
      case '404':
        this.errorMessage = 'Lo sentimos, el recurso que estás buscando no existe.';
        break;
      case '400':
        this.errorMessage = 'Lo sentimos, la solicitud no es válida.';
        break;
      default:
        this.errorMessage = 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo más tarde.';
        break;
    }
  }
}
