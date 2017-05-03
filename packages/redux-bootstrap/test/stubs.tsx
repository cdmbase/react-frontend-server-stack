import * as React from 'react';
import { IndexRoute, Route, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { interfaces } from '../src/index';
import * as Redux from 'redux';

// ******************************************************************************
// * UTILS
// ******************************************************************************
function makeActionCreator(type: string, ...argNames: string[]) {
    return function (...args: any[]) {
        let action: any = { type: type };
        argNames.forEach((arg, index) => {
            let argName: string = argNames[index];
            let argValue: any = args[index];
            action[argName] = argValue;
        });
        return action;
    }
}

// ******************************************************************************
// * LAYOUT
// ******************************************************************************
class AppLayout extends React.Component<any, any> {
    public render() {
        return (
            <div>
                <div>
                    <Link id="link_to_home" className="link_to" to="/">Home</Link>
                    <Link id="link_to_users" className="link_to" to="/users">Users</Link>
                    <Link id="link_to_repos" className="link_to" to="/repos">Repos</Link>
                </div>
                {this.props.children}
            </div>
        )
    }
}

// ******************************************************************************
// * HOME
// ******************************************************************************
class Home extends React.Component<any, any> {
    public render() {
        return (
            <div id="home_page_title">Home Page!</div>
        )
    }
}

// ******************************************************************************
// * CONSTANTS
// ******************************************************************************
export const ACTION_TYPES = {
    ADD_REPO_BEGIN: 'ADD_REPO_BEGIN',
    ADD_REPO_SUCCESS: 'ADD_REPO_SUCCESS',
    ADD_USER_BEGIN: 'ADD_USER_BEGIN',
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    BUMP_COUNTER: 'BUMP_CONTER'
}

// ******************************************************************************
// * USER PAGE ACTIONS
// ******************************************************************************
