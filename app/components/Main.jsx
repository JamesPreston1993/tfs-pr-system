import React from 'react';
import ReactDOM from 'react-dom';
import request from 'request';
import settings from '../config/settings';
import url from 'url';
import Table from './Table';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = { instances: [{
                name: '',
                pullRequests: []
            }]
        };
        this.buttonClick = this.buttonClick.bind(this);
    }    
    getPullRequests () {
        this.setState({ instances: [] });        
        for(let i = 0; i < settings.instances.length; i++) {
            let instance = settings.instances[i];
            let res = request(url.resolve(window.location.href, 'api/pullrequests/' + instance.key),
                (err, res, body) => {
                    if (!err) {                    
                        let newInstances = this.state.instances;
                        newInstances.push({
                            name: instance.name,
                            pullRequests: JSON.parse(res.body)
                        });
                        this.setState({ instances: newInstances });
                    }
            });
        }
    }
    renderTables () {
        return this.state.instances.map((instance) => {
            return <Table
                        key={instance.key}
                        name={instance.name}
                        pullRequests={instance.pullRequests}
                    />
        });
    }
    buttonClick() {        
        this.getPullRequests();
    }
    componentDidMount () {
        this.getPullRequests();
    }
    render () {
        return (
            <div>
                <nav>
                    <span>{settings.appName || 'TFS Pull Requests'}</span>
                    <div className="nav-btn-container">
                        <button onClick={this.buttonClick}><i className="fa fa-refresh"></i> Refresh</button>
                    </div>
                </nav>
                <div className="container">
                    { this.renderTables() }                    
                </div>
            </div>
        );
    }
};