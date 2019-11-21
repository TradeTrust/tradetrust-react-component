# react-component-template

React component boilerplate.

## Features

- [**React**](http://reactjs.org/) - A JavaScript library for building user interfaces.
- [**Webpack**](https://webpack.js.org/) - Component bundler.
- [**React testing library**](https://testing-library.com/) - Simple and complete testing utilities that encourage good testing practices.
- [**Emotion**](https://emotion.sh/) - Library designed for writing css styles with JavaScript.
- [**Babel**](https://babeljs.io/) - Write next generation JavaScript today.
- [**Jest**](https://facebook.github.io/jest) - JavaScript testing framework used by Facebook.
- [**ESLint**](http://eslint.org/) - Make sure you are writing a quality code.
- [**Prettier**](https://prettier.io/) - Enforces a consistent style by parsing your code and re-printing it.
- [**Typescript**](https://www.typescriptlang.org/) - JavaScript superset, providing optional static typing
- [**Circle CI**](https://circleci.com/) - Automate tests and linting for every push or pull request.
- [**Storybook**](https://storybook.js.org/) - Tool for developing UI components in isolation with documentation.
- [**Semantic Release**](https://semantic-release.gitbook.io/semantic-release/) - Fully automated version management and package publishing.
- [**Debug**](https://github.com/visionmedia/debug) - JS debugging utility that works both in node.js and browsers.

## Install

The easiest way to use **react-component-template** is through github by clicking on `Use this template` button in the repository page.

You can also download or `git clone` this repo

```sh
$ git clone https://github.com/Open-Attestation/react-component-template.git my-module
$ cd my-module
$ rm -rf .git
$ npm install
```

Make sure to edit the following files according to your module's info:

- package.json (module name and version)
- webpack.config.js: replace `<please add the name of your library>` placeholder
- README.md
- LICENSE
- src/logger: replace `PLACEHOLDER_PROJECT_NAME`

## Commands

```sh
$ npm run storybook # open storybook and start editing your components
$ npm run storybook:build # generate docs
$ npm run test:watch # run tests with Jest
$ npm run test:coverage # run tests with coverage
$ npm run lint # lint code
$ npm run build # build component
```

## Setting up CI with automatic semantic-release versioning

Generate CircleCI API token and run:

```sh
$ npx semantic-release-cli setup --ask-for-passwords`
```

You will need to provide credentials for github and npm.

## Changing stuff

### Removing Emotion

- Uninstall npm packages

```sh
$ npm uninstall @emotion/core @emotion/styled @emotion/babel-preset-css-prop
```

- Remove `@emotion/babel-preset-css-prop` from Babel presets (configuration is made in package.json file)
- Remove `@emotion/core` from Typescript configuration (in tsconfig.json file)
- Remove `.storybook/webpack.config.js` (file created only for emotion css property support in storybook)

## License

GPL-3.0
