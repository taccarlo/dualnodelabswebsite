import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import packageJson from '../../../package.json';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';

@Component({
  selector: 'app-privacypolicy',
  imports: [RouterLink, TranslatePipe],
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
