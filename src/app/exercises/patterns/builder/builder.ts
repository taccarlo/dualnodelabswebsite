import { Component, AfterViewInit, ElementRef, Inject, PLATFORM_ID, viewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslatePipe } from '../../../i18n/translate.pipe';
import { RouterLink } from '@angular/router';
import sdk from '@stackblitz/sdk';

@Component({
  selector: 'app-builder-exercise',
  imports: [TranslatePipe, RouterLink],
  templateUrl: './builder.html',
  styleUrl: './builder.css'
})
export class BuilderExerciseComponent implements AfterViewInit {
  private containerRef = viewChild<ElementRef<HTMLDivElement>>('stackblitzContainer');

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const container = this.containerRef()?.nativeElement;
    if (!container) return;

    sdk.embedProjectId(container, 'secret-python-fy4wvmjq', {
      forceEmbedLayout: true,
      terminalHeight: 50,
      hideExplorer: true,
      hideNavigation: true,
    }).catch(() => {});
  }
}
