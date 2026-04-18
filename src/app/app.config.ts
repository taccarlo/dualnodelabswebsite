import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { PrivacyPolicyComponent } from './privacypolicy/privacypolicy';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
