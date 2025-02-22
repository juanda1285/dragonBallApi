import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DragonBallService {
  private apiUrl = 'https://dragonball-api.com/api';

  constructor(private http: HttpClient) {}

  getCharacters(page: number = 1, search: string = ''): Observable<any> {
    let url = `${this.apiUrl}/characters`;

    if (search) {
      // Si hay un término de búsqueda, no incluir paginación
      url += `?name=${search}`;
    } else {
      // Si no hay búsqueda, incluir paginación
      url += `?page=${page}&limit=6`;
    }

    return this.http.get(url);
  }

  getCharacterById(id: string): Observable<any> {
    const url = `${this.apiUrl}/characters/${id}`;
    return this.http.get(url);
  }
}
