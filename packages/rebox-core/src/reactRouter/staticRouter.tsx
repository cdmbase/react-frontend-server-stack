import * as React from 'react';
import * as PropTypes from 'prop-types';
import createStaticHistory from 'react-router/createStaticHistory';
import { Router } from 'react-router';

/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records 
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */
export default class StaticRouter extends React.Component<any, any> {
    static propTypes = {
        history: PropTypes.object,
    };

    static defaultProps = {
        history: createStaticHistory(),
    };

    getChildContext() {
        return {
            router: {
                // context needed by history so moved into it
                // this references could get lost...
                staticContext: this.props.history.context,
            }
        }
    }
    
    render() {
        const { history, ...props } = this.props;

        return <Router {...props} history={history}/>
    }
}