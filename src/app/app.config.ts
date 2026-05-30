import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { PrivacyPolicyComponent } from './privacypolicy/privacypolicy';
import { CodeArenaComponent } from './codearena/codearena';
import { DesignPatternsComponent } from './design-patterns/design-patterns';
import { ExercisesComponent } from './exercises/exercises';
import { SingletonComponent } from './singleton/singleton';
import { BuilderComponent } from './builder/builder';
import { FactoryMethodComponent } from './factory-method/factory-method';
import { AbstractFactoryComponent } from './abstract-factory/abstract-factory';
import { AdapterComponent } from './adapter/adapter';
import { BridgeComponent } from './bridge/bridge';
import { CompositeComponent } from './composite/composite';
import { DecoratorComponent } from './decorator/decorator';
import { FacadeComponent } from './facade/facade';
import { StrategyComponent } from './strategy/strategy';
import { ObserverComponent } from './observer/observer';
import { IteratorComponent } from './iterator/iterator';
import { InterpreterComponent } from './interpreter/interpreter';
import { AboutComponent } from './about/about';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'privacypolicy', component: PrivacyPolicyComponent },
  { path: 'codearena', component: CodeArenaComponent },
  { path: 'design-patterns', component: DesignPatternsComponent },
  { path: 'design-patterns/singleton', component: SingletonComponent },
  { path: 'design-patterns/builder', component: BuilderComponent },
  { path: 'design-patterns/factory-method', component: FactoryMethodComponent },
  { path: 'design-patterns/abstract-factory', component: AbstractFactoryComponent },
  { path: 'design-patterns/adapter', component: AdapterComponent },
  { path: 'design-patterns/bridge', component: BridgeComponent },
  { path: 'design-patterns/composite', component: CompositeComponent },
  { path: 'design-patterns/decorator', component: DecoratorComponent },
  { path: 'design-patterns/facade', component: FacadeComponent },
  { path: 'design-patterns/strategy', component: StrategyComponent },
  { path: 'design-patterns/observer', component: ObserverComponent },
  { path: 'design-patterns/iterator', component: IteratorComponent },
  { path: 'design-patterns/interpreter', component: InterpreterComponent },
  { path: 'exercises', component: ExercisesComponent },
  { path: 'about', component: AboutComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(withEventReplay())],
};
