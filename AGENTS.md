# AGENTS.md

## Build & Verify
- **Build:** `npx ng build` (must pass with zero errors before deploy)
- **Lint/Typecheck:** none configured

## Project Overview
Angular 19 SSR app at `C:\DUALNODE\dualnodelabswebsite` — design patterns website with IDE-style code viewer. Firebase Hosting (Classic).

## Component Architecture
- **Shared `IdePanelComponent`** at `src/app/shared/ide-panel/` — handles ALL IDE panel logic: Prism highlighting, divider drag/resize, copy button, language tabs. All 13 pattern pages (`src/app/singleton/`, `src/app/builder/`, `src/app/factory-method/`, `src/app/abstract-factory/`, `src/app/adapter/`, `src/app/bridge/`, `src/app/composite/`, `src/app/decorator/`, `src/app/facade/`, `src/app/strategy/`, `src/app/observer/`, `src/app/iterator/`, `src/app/interpreter/`) use `<app-ide-panel>` with `@Input()` code samples and translation keys.
- **All layout CSS** (`.dp-page`, `.code-panel`, `.ide-tabs`, `.divider`, `.info-panel`, `.pattern-title`, `.pattern-desc`, `.info-footer`) lives in shared component CSS.
- Divider resize clamp: code panel 30%–80%, info panel 70%–20%.
- 5 languages per pattern: Java, Kotlin, TypeScript, Python, C#.
- `.ide-tabs { overflow: hidden; margin: 8px 0; }`, `.ide-tab { flex: 1; }`.

## Key Conventions
- Always build with `npx ng build` before finishing work.
- No `ng-content` — use `@Input()` for translation keys.
- Kotlin `${expr}` in backtick strings escapes as `\${expr}`.
- i18n via custom `TranslateService` + `TranslatePipe` (not `@angular/localize`).
- No comments in source files unless asked.
