# redux-bootstrap-example

[![Join the chat at https://gitter.im/redux-bootstrap/redux-bootstrap](https://badges.gitter.im/redux-bootstrap/redux-bootstrap.svg)](https://gitter.im/redux-bootstrap/redux-bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/redux-bootstrap/redux-bootstrap-example.svg?branch=master)](https://travis-ci.org/redux-bootstrap/redux-bootstrap-example)
[![Dependencies](https://david-dm.org/redux-bootstrap/redux-bootstrap-example.svg)](https://david-dm.org/redux-bootstrap/redux-bootstrap-example)
[![img](https://david-dm.org/redux-bootstrap/redux-bootstrap-example/dev-status.svg)](https://david-dm.org/redux-bootstrap/redux-bootstrap-example?type=dev)

<img src="https://pbs.twimg.com/media/Czu_yEEWEAAJNwA.jpg:large" width="600" />

An example to showcase how to use [redux-bootstrap](https://github.com/redux-bootstrap/redux-bootstrap).

## Features
This template features:
- Webpack-dev-server with hot module replacement enabled.
- Node.js express application with server-side rendering.
- Debugging with sourcemaps enabled.
- Webpack bundle size reports.
- Test coverage reports with sourcemaps enabled.

- Run and deploy the application using a Docker container.

## How to run this example?

> :warning: Please ensure that you are using the latest version of Node.js and Docker.

To build and run this example you will need to do the following:

Clone the repository:

```
$ git clone https://github.com/redux-bootstrap/redux-bootstrap-example.git
```

Move into the project:

```
$ cd redux-bootstrap-example
```

Install node modules:

```
$ npm install
```

Install the Webpack development server:

```
$ npm install -g webpack-dev-server
```

## Commands

- `$ npm start` runs the app using `webpack-dev-server` at `http://127.0.0.1:8080` with [HMR](https://webpack.github.io/docs/hot-module-replacement.html) enabled.
- `$ npm test` runs the application unit tests.
- `$ npm run coverage` generates a test coverage report.
- `$ npm run stats` generates a bundle size report.
- `$ npm run release` prepares everything ready for the generation of a Docker image.

## Docker suppor
After executing the release command:

```
$ npm run release
```

You will be ready to create and run a docker container:

```
$ docker build -t redux-bootstrap/example .
$ docker run -p 3000:3000 redux-bootstrap/example
```

## Questions & issues
Please use the [redux-bootstrap issues page](https://github.com/redux-bootstrap/redux-bootstrap/issues) 
instead of the issues page in this repo. If you have any questions about this example or the usage 
of redux-bootstrap.
