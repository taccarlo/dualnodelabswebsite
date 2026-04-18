import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import packageJson from '../../../package.json';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  version = packageJson.version;
}
