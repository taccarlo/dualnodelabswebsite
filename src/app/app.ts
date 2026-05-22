import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent],
  template: '<app-navigation></app-navigation><router-outlet></router-outlet>'
})
export class App {
  title = 'dualnodelabswebsite';
}
