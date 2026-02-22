# Repository Guidelines

## Project Structure & Module Organization
- `src/pages/`: Astro routes (site pages and RSS endpoints like `src/pages/tenki/[location].xml.ts`).
- `src/components/`: UI components (`.astro`) and icon components (`.tsx`).
- `src/services/`: External integrations (`weather/` for WeatherAPI, `summary/` for Gemini).
- `src/utils/` and `src/types/`: shared helpers and TypeScript types.
- `scripts/update-weather.ts`: batch job that fetches weather + generates summaries.
- `data/weather-history.json`: persisted weather summary history committed by automation.
- `.github/workflows/update-weather.yml`: scheduled daily update and commit workflow.

## Build, Test, and Development Commands
- `pnpm install`: install dependencies (project uses `pnpm` lockfile).
- `pnpm dev` (or `pnpm start`): run local dev server at `http://localhost:4321`.
- `pnpm build`: create production build in `dist/`.
- `pnpm preview`: preview the built site locally.
- `pnpm update-weather`: run the weather update script manually (requires API keys).
- `pnpm astro check`: run Astro/TypeScript diagnostics before opening a PR.

## Coding Style & Naming Conventions
- Language: TypeScript + Astro with ES modules and strict TS settings.
- Use 2-space indentation, semicolons, and single quotes to match existing files.
- Component files: PascalCase (for example, `WeatherCard.astro`).
- Utilities/services: descriptive lowercase filenames (`api.ts`, `data.ts`, `gemini.ts`).
- Keep import paths consistent with existing relative style or `@/*` alias when useful.

## Testing Guidelines
- No dedicated test runner is configured yet.
- Minimum validation for changes:
  1. `pnpm astro check`
  2. `pnpm build`
  3. For data pipeline changes, run `pnpm update-weather` with `.env` configured.
- If adding tests, colocate near source or under `src/**/__tests__/` and document the command in `package.json`.

## Commit & Pull Request Guidelines
- Follow concise, imperative commit subjects (history includes automation commits like `Update weather information`).
- Keep manual commits scoped and descriptive, e.g., `Fix RSS location slug handling`.
- PRs should include:
  1. What changed and why
  2. Linked issue (if any)
  3. Validation steps run (`astro check`, `build`, script run)
  4. Screenshots for UI changes or sample RSS output for feed changes

## Security & Configuration Tips
- Copy `.env.example` to `.env` and set `WEATHER_API_KEY` and `GEMINI_API_KEY`.
- Never commit secrets; use GitHub Secrets for workflow execution.
