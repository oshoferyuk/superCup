# FlippUi

## Development server

Run `npm i ` and `npm start` for a dev server. Navigate to `http://localhost:9001/`. The app will automatically reload if you change any of the source files.

## Build for prod 

Run `npm run build:prod` to build the project with AoT and minified. The build artifacts will be stored in the `dist/` directory.

## Running unit tests for development

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io) via chrome headless browser.

## Running unit tests for prod

Run `npm run test:prod` to execute the single run unit tests with coverage.

## Running end-to-end tests

Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `npm start`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
