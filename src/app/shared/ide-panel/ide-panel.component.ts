import { Component, Input, inject, HostListener, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../../i18n/translate.pipe';
import { TranslateService } from '../../i18n/translate.service';
import { Router, RouterLink } from '@angular/router';

import Prism from 'prismjs';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-kotlin';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-csharp';

@Component({
  selector: 'app-ide-panel',
  imports: [NgFor, NgIf, TranslatePipe, RouterLink],
  templateUrl: './ide-panel.component.html',
  styleUrl: './ide-panel.component.css'
})
export class IdePanelComponent {
  @Input() codeSamples: Record<string, { code: string; lang: string }> = {};
  @Input() backKey = '';
  @Input() subtitleKey = '';
  @Input() titleKey = '';
  @Input() descriptionKey = '';
  @Input() hasExercise = false;

  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private translate = inject(TranslateService);
  private platformId = inject(PLATFORM_ID);

  activeLang = 'Java';
  languages = ['Java', 'Kotlin', 'TypeScript', 'Python', 'C#'];
  copied = false;
  isFullscreen = false;
  shareOpen = false;
  linkCopied = false;

  codeFlex = '4 1 0';
  infoFlex = '6 1 0';
  isDragging = false;
  private startPos = 0;
  private startFlex = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (!this.isDragging) return;
    this.doResize(e);
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (this.shareOpen) {
      this.shareOpen = false;
    } else if (this.isFullscreen) {
      this.isFullscreen = false;
    }
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.shareOpen = false;
  }

  toggleFullscreen() {
    this.isFullscreen = !this.isFullscreen;
  }

  toggleShare(e: Event) {
    e.stopPropagation();
    this.shareOpen = !this.shareOpen;
  }

  private get pageUrl(): string {
    return isPlatformBrowser(this.platformId) ? window.location.href : '';
  }

  get shareTargets(): { name: string; url: string }[] {
    const url = encodeURIComponent(this.pageUrl);
    const text = encodeURIComponent(this.translate.translate(this.titleKey));
    return [
      { name: 'LinkedIn', url: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` },
      { name: 'WhatsApp', url: `https://wa.me/?text=${text}%20${url}` },
      { name: 'X', url: `https://twitter.com/intent/tweet?url=${url}&text=${text}` },
      { name: 'Facebook', url: `https://www.facebook.com/sharer/sharer.php?u=${url}` },
      { name: 'Reddit', url: `https://www.reddit.com/submit?url=${url}&title=${text}` },
      { name: 'Email', url: `mailto:?subject=${text}&body=${url}` },
    ];
  }

  openShare(target: { name: string; url: string }, e: Event) {
    e.stopPropagation();
    if (isPlatformBrowser(this.platformId)) {
      if (target.name === 'Email') {
        window.location.href = target.url;
      } else {
        window.open(target.url, '_blank', 'noopener,noreferrer,width=600,height=600');
      }
    }
    this.shareOpen = false;
  }

  copyLink(e: Event) {
    e.stopPropagation();
    navigator.clipboard.writeText(this.pageUrl).then(() => {
      this.linkCopied = true;
      setTimeout(() => this.linkCopied = false, 2000);
    });
  }

  onDividerDown(e: MouseEvent | TouchEvent) {
    e.preventDefault();
    this.isDragging = true;
    this.startPos = this.getClientPos(e);
    this.startFlex = parseFloat(this.infoFlex);
  }

  private getClientPos(e: MouseEvent | TouchEvent): number {
    const isMobile = window.innerWidth <= 768;
    const val = 'touches' in e ? e.touches[0] : e;
    return isMobile ? val.clientY : val.clientX;
  }

  private doResize(e: MouseEvent | TouchEvent) {
    const dp = document.querySelector('.dp-page') as HTMLElement;
    if (!dp) return;
    const rect = dp.getBoundingClientRect();
    const isMobile = window.innerWidth <= 768;
    const pos = this.getClientPos(e);
    const total = isMobile ? rect.height : rect.width;
    const pct = ((pos - (isMobile ? rect.top : rect.left)) / total) * 100;
    const clamped = Math.max(30, Math.min(80, pct));
    this.infoFlex = `${clamped} 1 0`;
    this.codeFlex = `${100 - clamped} 1 0`;
  }

  get highlightedCode(): SafeHtml {
    const sample = this.codeSamples[this.activeLang];
    if (!sample) return '';
    const html = Prism.highlight(sample.code, Prism.languages[sample.lang], sample.lang);
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getCode(lang: string): string {
    return this.codeSamples[lang]?.code || '';
  }

  get patternSlug(): string | null {
    const url = this.router.url;
    const match = url.match(/\/design-patterns\/([^\/?#]+)/);
    return match ? match[1] : null;
  }

  copyCode() {
    const code = this.getCode(this.activeLang);
    navigator.clipboard.writeText(code).then(() => {
      this.copied = true;
      setTimeout(() => this.copied = false, 2000);
    });
  }

}
