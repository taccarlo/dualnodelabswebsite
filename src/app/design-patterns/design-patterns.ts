import { Component, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../i18n/translate.pipe';
import { TranslateService } from '../i18n/translate.service';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-design-patterns',
  imports: [NgFor, RouterLink, TranslatePipe],
  templateUrl: './design-patterns.html',
  styleUrl: './design-patterns.css'
})
export class DesignPatternsComponent {
  version = packageJson.version;
  private translateService = inject(TranslateService);

  creationalPatterns = [
    { name: 'Singleton', route: '/design-patterns/singleton' },
    { name: 'Builder', route: '/design-patterns/builder' },
    { name: 'Factory Method', route: '/design-patterns/factory-method' },
    { name: 'Abstract Factory', route: '/design-patterns/abstract-factory' },
  ];
  structuralPatterns = [
    { name: 'Adapter', route: '' },
    { name: 'Bridge', route: '' },
    { name: 'Composite', route: '' },
    { name: 'Decorator', route: '' },
    { name: 'Facade', route: '' },
  ];
  behavioralPatterns = [
    { name: 'Strategy', route: '/design-patterns/strategy' },
    { name: 'Observer', route: '/design-patterns/observer' },
    { name: 'Iterator', route: '/design-patterns/iterator' },
    { name: 'Interpreter', route: '/design-patterns/interpreter' },
  ];

  get currentLang() {
    return this.translateService.currentLang();
  }

  toggleLanguage() {
    this.translateService.toggleLanguage();
  }
}
