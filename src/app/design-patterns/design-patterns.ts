import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-design-patterns',
  imports: [NgFor, TranslatePipe],
  templateUrl: './design-patterns.html',
  styleUrl: './design-patterns.css'
})
export class DesignPatternsComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);

  creationalPatterns = ['Singleton', 'Builder', 'Factory Method', 'Abstract Factory'];
  structuralPatterns = ['Adapter', 'Bridge', 'Composite', 'Decorator', 'Facade'];
  behavioralPatterns = ['Strategy', 'Observer', 'Iterator', 'Interpreter'];

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
