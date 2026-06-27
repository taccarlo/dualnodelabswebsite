import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { TranslateService } from '../../../i18n/translate.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import packageJson from '../../../../../package.json';

@Component({
  selector: 'app-pattern-exercise',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './pattern-exercise.html',
  styleUrl: './pattern-exercise.css'
})
export class PatternExerciseComponent {
  version = packageJson.version;
  private route = inject(ActivatedRoute);
  private translateService = inject(TranslateService);

  slug = '';

  constructor() {
    this.route.paramMap.subscribe(params => {
      this.slug = params.get('slug') || '';
    });
  }

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }

  get patternName(): string {
    return this.slug.charAt(0).toUpperCase() + this.slug.slice(1);
  }
}
