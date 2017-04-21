import { createHashHistory, createMemoryHistory } from 'history';
import { unmountComponentAtNode } from 'react-dom';
import { renderToStaticMarkup } from 'react-dom/server';
import thunk from 'redux-thunk';
import { push } from 'react-router-redux';
import * as $ from 'jquery';
import 'jest';
import { bootstrap, interfaces } from '../index'
import { ACTION_TYPES, getRoutes, getReducers } from './stubs';
import * as Redux from 'redux';
import * as ReactRouterRedux from "react-router-redux";
import * as History from 'history';


const CONTAINER_ID = "root";

history.pushState({}, "", "/");
$("body").append(`<div id="${CONTAINER_ID}"/><div>`);

describe("redux-bootstrap", () => {

    it("Should throw if the wrong configuration is used.", () => {

        let b: any = bootstrap;

        let throw1 = () => { b(); };

        let throw2 = () => {
            b({
                routes: getRoutes()
            });
        };

        let throw3 = () => {
            b({
                reducers: getReducers()
            });
        };

        expect(throw1).toThrow("Null argument options.");
        expect(throw2).toThrow("Invalid configuration field: reducers.");
        expect(throw3).toThrow("Invalid configuration field: routes.");

    });

    describe("Should be able to bootstrap applications.", () => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000
4	
        beforeAll(() => {
            bootstrap({
                container: "root",
                initialState: {},
                middlewares: [thunk],
                reducers: getReducers(),
                routes: getRoutes()
            });

        });

        afterAll(() => {
            // https://facebook.github.io/react/docs/top-level-api.html#reactdom.unmountcomponentatnode
            const rootNode = document.getElementById(CONTAINER_ID);
            unmountComponentAtNode(rootNode);
            rootNode.innerHTML = "";
        });


        it("Should be able to render the home page.", (done) => {
            setTimeout(() => {
                expect($("#home_page_title").text()).toEqual("Home Page!");
                done();
            }, 20);
        });

        it("Should be able to navigate to a page.", (done) => {
            let usersLink = document.getElementById("link_to_users");
            usersLink.click();
            setTimeout(() => {
                expect($("#users_page_title").text()).toEqual("Users Page!");
                done();
            }, 30);
        });

        it("Should be able to navigate to another to a page.", (done) => {
            let reposLink = document.getElementById("link_to_repos");
            reposLink.click();
            setTimeout(() => {
                expect($("#repos_page_title").text()).toEqual("Repos Page!");
                done();
            }, 30);
        });

        it("Should be able to return to the home page.", (done) => {
            let homeLink = document.getElementById("link_to_home");
            homeLink.click();
            setTimeout(() => {
                expect($("#home_page_title").text()).toEqual("Home Page!");
                done();
            }, 50);
        });

        it("Should be able to interact.", (done) => {

            // go to user page
            let usersLink = document.getElementById("link_to_users");
            usersLink.click();

            setTimeout(() => {

                // check counter and page title
                expect($("#users_page_title").text()).toEqual("Users Page!");
                expect($("#user_count").text()).toEqual("0");

                // trigger increase counter
                let addUserBtn = document.getElementById("add_user_btn");
                addUserBtn.click();

                // update counter
                setTimeout(() => {
                    expect($("#user_count").text()).toEqual("1");
                    done();
                }, 30);

            }, 30);

        });

    });

    describe("Should be able to bootstrap again.", () => {

        let result: interfaces.BootstrapResult;
        beforeAll(() => {
            result = bootstrap({
                container: "root",
                initialState: {},
                middlewares: [thunk],
                reducers: getReducers(),
                routes: getRoutes()
            });
        });


        it("Should expose history, root, store in result.", () => {
            expect(result).toMatchObject;
            expect(result).toHaveProperty("history");
            expect(result).toHaveProperty("root");
            expect(result).toHaveProperty("store");
        });

        afterAll(() => {
            const rootNode = document.getElementById(CONTAINER_ID);
            unmountComponentAtNode(rootNode);
            rootNode.innerHTML = "";
       });

    });

    describe("Should be able to bootstrap with hashHistory.", () => {

        let result: interfaces.BootstrapResult;
        beforeAll(() => {
            result = bootstrap({
                container: "root",
                createHistory: createHashHistory,
                initialState: {},
                middlewares: [thunk],
                reducers: getReducers(),
                routes: getRoutes()
            });
        });

        it("Should be able to render the home page.", (done) => {
            setTimeout(() => {
                expect($("#home_page_title").text()).toEqual("Home Page!");
                done();
            }, 20);
        });

        it("Should be able to navigate to a page.", (done) => {
            let usersLink = document.getElementById("link_to_users");
            usersLink.click();
            setTimeout(() => {
                expect($("#users_page_title").text()).toEqual("Users Page!");
                done();
            }, 30);
        });

        afterAll(() => {
            const rootNode = document.getElementById(CONTAINER_ID);
            unmountComponentAtNode(rootNode);
            rootNode.innerHTML = "";
        });

    });

    describe("Should bootstrap with efficient sync'ed history", () => {

        let history: History.History;
        let store: Redux.Store<any>;

        beforeAll(() => {
            const result = bootstrap({
                container: "root",
                initialState: {},
                middlewares: [thunk],
                reducers: getReducers(),
                routes: getRoutes()
            });
            history = result.history;
            store = result.store;
        });

        let eventTimer: any;
        let removeListener: Function;

        afterEach(() => {
            // clear our fallback timer between tests
            if (eventTimer) {
                clearTimeout(eventTimer);
                eventTimer = null;
            }
            // unsubscribe our history listener between tests
            if (removeListener) {
                removeListener();
            }
        });

        it("Should not call history listener for each 'counter' action (3x)", (done) => {
            eventTimer = setTimeout(() => done(), 200);
            let historyListenerCalled = 0;
            removeListener = history.listen(() => {
                historyListenerCalled += 1;
                if (historyListenerCalled >= 3) {
                    // without the fix...
                    done(new Error("unexpected call"));
                }
            });
            store.dispatch({ type: ACTION_TYPES.BUMP_COUNTER });
            store.dispatch({ type: ACTION_TYPES.BUMP_COUNTER });
            store.dispatch({ type: ACTION_TYPES.BUMP_COUNTER });
        });

        it("Should call history listener after 'routing' changed", (done) => {
            eventTimer = setTimeout(() => done(new Error("timeout")), 200);
            removeListener = history.listen(() => done());
            store.dispatch(push("/"));
        });

        afterAll(() => {
            const rootNode = document.getElementById(CONTAINER_ID);
            unmountComponentAtNode(rootNode);
        });

    });

    describe("Should bootstrap with memoryHistory and renderToStaticMarkup.", () => {

        let result: interfaces.BootstrapResult;
        beforeAll(() => {
            result = bootstrap({
                container: "root",
                createHistory: createMemoryHistory,
                initialState: {},
                middlewares: [thunk],
                reducers: getReducers(),
                render: renderToStaticMarkup,
                routes: getRoutes()
            });
            result.output = renderToStaticMarkup(result.root);
        });

        it("Should be able to render the home page to string.", () => {
            expect(result.output).toBe.toString;
            expect(result.output).toContain('<div id="home_page_title">Home Page!</div>');
        });

    });

    describe("Should bootstrap with memoryHistory and renderToStaticMarkup, with navigation.", () => {

        let result: interfaces.BootstrapResult;
        beforeAll(() => {
            result = bootstrap({
                container: "root",
                createHistory: createMemoryHistory,
                initialState: {},
                middlewares: [thunk],
                reducers: getReducers(),
                render: () => { /*  skip first render, we navigate first */ },
                routes: getRoutes()
            });
            result.history.push("/users");
            result.output = renderToStaticMarkup(result.root);
        });

        it("Should be able to render the users page to string.", () => {
            expect(result.output).toBe.toString;
            expect(result.output).toContain('<div id="users_page_title">Users Page!</div>');
        });

    });

    describe("Should bootstrap trigger callbacks when they are given through RouterParams", () => {
        let onUpdateFlag = false;
        let onErrorFlag = false;
        let result: interfaces.BootstrapResult;
        let store: Redux.Store<any>;
        beforeAll(() => {
            onUpdateFlag = false;
            onErrorFlag = false;
            result = bootstrap({
                container: "root",
                initialState: {},
                middlewares: [thunk],
                reducers: getReducers(),
                routerProps: {
                    onError: (error) => { onErrorFlag = true; },
                    onUpdate: () => { onUpdateFlag = true; }
                },
                routes: getRoutes()
            });
            store = result.store;
        });

        it("Should be able to trigger onUpdate callback when there is an update in router", () => {
            store.dispatch(push("/"));
            store.dispatch(push("/users"));
            expect(onUpdateFlag).toEqual(true);
        });

         it("Should be able to trigger onError callback when error occurs when doing transition in routes", () => {
            store.dispatch(push("/error"));
            expect(onErrorFlag).toEqual(true);
        });

    });

});