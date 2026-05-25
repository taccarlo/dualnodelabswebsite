import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-codearena',
  imports: [TranslatePipe],
  templateUrl: './codearena.html',
  styleUrl: './codearena.css'
})
export class CodeArenaComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
