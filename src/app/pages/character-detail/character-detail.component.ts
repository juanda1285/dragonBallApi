import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DragonBallService } from '../../services/dragon-ball.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, TruncatePipe, MatIcon, MatButtonModule, TranslateModule],
})
export class CharacterDetailComponent implements OnInit {
  character: any;
  showFullDescription: { [key: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private dragonBallService: DragonBallService,
    private location: Location,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.dragonBallService.getCharacterById(id).subscribe((response: any) => {
        this.character = response;
      });
    }
  }

  goBack(): void {
    this.location.back();
  }

  toggleDescription(characterId: number) {
    this.showFullDescription[characterId] = !this.showFullDescription[characterId];
  }

  isFullDescriptionShown(characterId: number): boolean {
    return this.showFullDescription[characterId] || false;
  }

  getTranslation(key: string): string {
    return this.translate.instant(key);
  }
}
