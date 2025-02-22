import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { DragonBallService } from '../../services/dragon-ball.service';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatIcon } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, TruncatePipe, MatIcon, TranslateModule],
})
export class CharacterDetailComponent implements OnInit {
  character: any;

  constructor(
    private route: ActivatedRoute,
    private dragonBallService: DragonBallService,
    private location: Location
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
}
