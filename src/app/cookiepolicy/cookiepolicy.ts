import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-cookiepolicy',
  imports: [TranslatePipe],
  templateUrl: './cookiepolicy.html',
  styleUrl: './cookiepolicy.css'
})
export class CookiePolicyComponent {
  private translateService = inject(TranslateService);
  version = packageJson.version;

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
