import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
import { DragonBallService } from '../../services/dragon-ball.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';;
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  standalone: true,
  imports: [CommonModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    FormsModule,
  ],
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
  characters: any[] = [];
  totalCharacters = 0;
  pageSize = 6;
  pageIndex = 0;
  searchQuery = '';

  constructor(
    private dragonBallService: DragonBallService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.dragonBallService
      .getCharacters(this.pageIndex + 1, this.searchQuery)
      .subscribe({
        next: (response: any) => {

          if (this.searchQuery) {
            // Respuesta cuando se filtra por nombre (sin paginación)
            this.characters = response;
            this.totalCharacters = response.length;
          } else {
            // Respuesta con paginación
            this.characters = response.items; // Lista de personajes
            this.totalCharacters = response.meta.totalItems; // Total de personajes
          }
        },
        error: (error) => {
          console.error('Error al cargar personajes:', error);
        },
      });
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target.value;
    this.pageIndex = 0;
    this.loadCharacters();
  }

  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.loadCharacters();
  }

  onCharacterClick(id: string): void {
    this.router.navigate(['/characters', id]);
  }
}
