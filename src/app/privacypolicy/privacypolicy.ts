import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-privacypolicy',
  imports: [TranslatePipe],
  templateUrl: './privacypolicy.html',
  styleUrl: './privacypolicy.css'
})
export class PrivacyPolicyComponent {
  private translateService = inject(TranslateService);
  version = packageJson.version;

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
