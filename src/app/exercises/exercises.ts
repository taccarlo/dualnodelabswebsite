import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-exercises',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './exercises.html',
  styleUrl: './exercises.css'
})
export class ExercisesComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
