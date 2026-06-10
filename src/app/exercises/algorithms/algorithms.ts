import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslateService } from '../../i18n/translate.service';
import { RouterLink } from '@angular/router';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-exercises-algorithms',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './algorithms.html',
  styleUrl: './algorithms.css'
})
export class AlgorithmsComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
