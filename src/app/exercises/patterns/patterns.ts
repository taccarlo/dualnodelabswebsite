import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslateService } from '../../i18n/translate.service';
import { RouterLink } from '@angular/router';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-exercises-patterns',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './patterns.html',
  styleUrl: './patterns.css'
})
export class PatternsComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
