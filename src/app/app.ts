import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation';
import { CookieBannerComponent } from './cookiebanner/cookiebanner';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, CookieBannerComponent],
  template: '<app-navigation></app-navigation><router-outlet></router-outlet><app-cookie-banner></app-cookie-banner>'
})
export class App {
  title = 'dualnodelabswebsite';
}
