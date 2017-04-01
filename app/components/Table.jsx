import React from 'react';
import TableRow from './TableRow';

export default class Table extends React.Component {        
    renderRows () {
        const props = this.props;
        if (props.pullRequests.length) {
            return props.pullRequests.map((pr) => {
                return <TableRow
                            key={props.key + '_' + pr.number}
                            project={pr.project}
                            repo={pr.repo}
                            number={pr.number}
                            title={pr.title}
                            creator={pr.creator}
                            created={pr.created}
                            url={pr.url}
                        />
            });
        }
        return <tr>
                <td colSpan="4">
                    <span className="title">No Pull Requests</span>
                    <span className="subtitle">Try clicking the Refresh button</span>
                </td>
            </tr>
    }    
    render () {
        return (
            <table>
                <caption>{this.props.name}</caption>
                <colgroup>
                    <col width="20%"/>
                    <col width="50%"/>
                    <col width="25%"/>
                    <col width="5%"/>
                </colgroup>
                <thead>
                    <tr>
                        <th className="location">Location</th>
                        <th className="description">Details</th>
                        <th className="creator">Created</th>
                        <th className="url">URL</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        );
    }
};