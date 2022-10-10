This project is an Angular.js app that generates and mints NFTs. Users can upload images, organizing them in layers. These images will compose our NFTs.
Each NFT will be generated (by the back-end) chosing an image for each layer, with a distribution determined by some user defined weights (e.g. a layer could represent the hair style, and each image of the layer will be a different hair style or color).
The back-end procedurally generates NFTs, sends them back to the UI.
At this point the user will be able to chose whether to mint the NFTs in the blockchain, in the Polygon test net.

# A NFT generation and minting app

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
