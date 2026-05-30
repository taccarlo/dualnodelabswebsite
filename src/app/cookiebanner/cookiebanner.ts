import { Component, inject, PLATFORM_ID } from '@angular/core';
import { NgIf, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../i18n/translate.pipe';

@Component({
  selector: 'app-cookie-banner',
  imports: [NgIf, TranslatePipe],
  templateUrl: './cookiebanner.html',
  styleUrl: './cookiebanner.css'
})
export class CookieBannerComponent {
  private platformId = inject(PLATFORM_ID);
  visible = true;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const consent = localStorage.getItem('cookie-consent');
      if (consent) {
        this.visible = false;
      }
    }
  }

  accept() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie-consent', 'accepted');
    }
    this.visible = false;
  }

  decline() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cookie-consent', 'declined');
    }
    this.visible = false;
  }
}
