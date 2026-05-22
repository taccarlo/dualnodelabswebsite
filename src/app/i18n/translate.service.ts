import { Injectable, signal } from '@angular/core';
import { translations, Lang } from './translations';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  currentLang = signal<Lang>('en');

  translate(key: string): string {
    return translations[this.currentLang()]?.[key] ?? translations['en']?.[key] ?? key;
  }

  setLanguage(lang: Lang): void {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }

  toggleLanguage(): void {
    const next: Lang = this.currentLang() === 'en' ? 'it' : 'en';
    this.setLanguage(next);
  }

  constructor() {
    const saved = localStorage.getItem('lang') as Lang | null;
    if (saved === 'en' || saved === 'it') {
      this.currentLang.set(saved);
      document.documentElement.lang = saved;
    }
  }
}
