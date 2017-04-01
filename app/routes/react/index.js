import React from 'react';
import { Route, Router, browserHistory } from 'react-router';
import Main from '../../components/Main';

export default class AppRoutes extends React.Component {
    render() {
        return (
            <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
                <Route path="/" component={Main}/>
            </Router>
        );
    }
}