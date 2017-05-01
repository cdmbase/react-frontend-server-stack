![](https://raw.githubusercontent.com/redux-bootstrap/redux-bootstrap.github.io/master/img/profile.png)

# Full Stack Packages for Front-end Server

[![Join the chat at https://gitter.im/redux-bootstrap/redux-bootstrap](https://badges.gitter.im/redux-bootstrap/redux-bootstrap.svg)](https://gitter.im/redux-bootstrap/redux-bootstrap?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/redux-bootstrap/redux-bootstrap.svg?branch=master)](https://travis-ci.org/redux-bootstrap/redux-bootstrap)
[![Test Coverage](https://codeclimate.com/github/redux-bootstrap/redux-bootstrap/badges/coverage.svg)](https://codeclimate.com/github/redux-bootstrap/redux-bootstrap/coverage)
[![NPM version](https://badge.fury.io/js/redux-bootstrap.svg)](https://badge.fury.io/js/redux-bootstrap)
[![Dependencies](https://david-dm.org/redux-bootstrap/redux-bootstrap.svg)](https://david-dm.org/redux-bootstrap/redux-bootstrap#info=dependencies)
[![img](https://david-dm.org/redux-bootstrap/redux-bootstrap/dev-status.svg)](https://david-dm.org/redux-bootstrap/redux-bootstrap/#info=devDependencies)
[![Known Vulnerabilities](https://snyk.io/test/github/redux-bootstrap/redux-bootstrap/badge.svg)](https://snyk.io/test/github/redux-bootstrap/redux-bootstrap)


[![NPM](https://nodei.co/npm/redux-bootstrap.png?downloads=true&downloadRank=true)](https://nodei.co/npm/redux-bootstrap/)
[![NPM](https://nodei.co/npm-dl/redux-bootstrap.png?months=9&height=3)](https://nodei.co/npm/redux-bootstrap/)

Here you can find enhanced redux-bootstrap with [TypeScript](https://www.typescriptlang.org/index.html) and [Rx](http://reactivex.io/) under hood.

**A `bootstrap()` function for initializing [Redux](https://github.com/reactjs/redux) applications.**

This module works by exporting a `bootstrap` function you can call in your project. It does not 
generate files for you – it is **not a project template or project scaffolding tool**. It is not 
related to the [Bootstrap](http://getbootstrap.com/) responsive front-end framework.

## Note

This is still in work-in-progress.


## Why do I need this?
This library handles most of the common application initialization/bootstrapping that takes 
place every time you create a new Redux project.

When you create a new Redux project you usually need to take care of a few things:

- Install dependencies.
- Integrate [React Router](https://github.com/reactjs/react-router) with Redux.
- Integrate [Rx with redux-observable](https://github.com/redux-observable/redux-observable).
- Create a Root reducer.
- Configure [redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension).
- Integrate [redux-immutable-state-invariant](https://github.com/leoasis/redux-immutable-state-invariant) with Redux.
- Apply middleware.
- Combine reducers into a root reducer.
- Create the store.
- Sync history with store.
- Create the Root component (Provider, Router).
- Set the routes, history and store in the Root component.
- Render the Root component.


The redux-bootstrap package handles all this stuff for you!

This idea is based on the `bootstrap` functions built into other modern JS frameworks such as
[Angular 2.0](https://angular.io/docs/ts/latest/api/platform/browser/bootstrap-function.html) and
[Aurelia](http://aurelia.io/docs.html#/aurelia/bootstrapper/1.0.0-beta.1.2.0/doc/api/overview).

## How can I use it?

First you should install [learna](https://www.npmjs.com/package/lerna).
```
$ npm install --global lerna 
```

Download packages from [repository](https://github.com/cdmbase/react-frontend-server-stack.git).

Create your new project in 'packages' directory. In 'package.json' file you need to set dependency

```
"dependencies": {
    ```
    "@redux-bootstrap/bootstrap": "^0.0.1",
    ```
```

Then you should go to main directory and bind your new project with '@redux-bootstrap/bootstrap'. 

```
$ learna bootstrap --sort
```
Install dependencies
```
$ npm install
$ npm run install
```

Then use the `bootstrap` function in your application’s entry point.

All you need to do is import your routes file, your reducers and any additional middleware 
and pass them to the `bootstrap` function as configuration:

```ts
import { bootstrap, interfaces } from "@redux-bootstrap/bootstrap";
import routes from "./routes";
import usersReducer from "./reducers/usersReducer";
import reposReducer from "./reducers/reposReducer";
// Example middlewares:
import thunk from "redux-thunk";
import * as createLogger from "redux-logger";

bootstrap({
    container: "root",                    // optional
    createHistory: createBrowserHistory,  // optional
    historyOptions: {},                   // optional
    initialState: {},                     // optional
    middlewares: [thunk, createLogger()], // optional
    render: ReactDOM.render,              // optional
    routerProps: interfaces.RouterProps   // optional
    reducers: {
        usersReducer,
        reposReducer,
    },
    routes: routes
});
```

That’s it – routing, and DevTools are ready and you can start working on your app!

## Where can I find an example?
If you are looking for a sample application, you can refer to the [packages](https://github.com/cdmbase/react-frontend-server-stack/tree/readme/packages) directory. There you can find examples:

[redux-bootstrap-example](https://github.com/cdmbase/react-frontend-server-stack/tree/readme/packages/redux-bootstrap-example) directory.

[redux-fela-example](https://github.com/cdmbase/react-frontend-server-stack/tree/readme/packages/redux-fela-example) directory.

Also you can see [experimental](https://github.com/cdmbase/react-frontend-server-stack/tree/readme/experimental) examples:


## Redux immutable state
Redux Bootstrap uses [redux-immutable-state-invariant](https://github.com/leoasis/redux-immutable-state-invariant)  automaticaly in development mode.
Therefore you will get an error message when you try to mutate your state either inside a dispatch or between dispatches. You don't need to use [Immutable.js](https://facebook.github.io/immutable-js/) and [`redux-immutable`](https://github.com/gajus/redux-immutable).


## Accessing the Store, History & Root Component
Sometimes you need to access the store, synched history or root component.  The result object 
returned by the `bootstrap` function provides access to these.

```ts
interface BootstrapResult {
    store: Redux.Store<any>,
    history: History.History, // history for react-router-redux 4.0
    output: any, // value returned by render()
    root: JSX.Element
}
```

For example, when enabling hot loader:

```ts
const result = bootstrap({/* ... */});

if (module.hot) {
    module.hot.accept("../reducers", () => {
        const nextRootReducer = require("../reducers/index").default;
        // If you use module.exports or Babel 5, remove .default:
        // const nextRootReducer = require("../reducers/index");
        result.store.replaceReducer(nextRootReducer);
    });
}
```

## TypeScript inside
All packages were written with TypeScript 2.0 or higher. So you can enjoy the best development experience and build scalable apps.


## Development

If you want to develop gitstack locally you must follow the following instructions:

* Fork or Clone this [repository](https://github.com/cdmbase/react-frontend-server-stack.git)

* Install the Redux Stack project in your computer

```
git clone https://github.com/cdmbase/react-frontend-server-stack.git
cd graphql-server
npm install
npm run install
```
to run example
```
cd packages/redux-bootstrap-example
npm start
```
```
to run build with watch. Go to main directory and run
```
npm run build:packages:watch
```
