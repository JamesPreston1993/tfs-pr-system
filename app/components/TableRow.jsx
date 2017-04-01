import React from 'react';

export default class TableRow extends React.Component {
    render () {
        return (
            <tr>                
                <td className="location">
                    <span className="title">{this.props.project}</span>
                    <span className="subtitle">{this.props.repo}</span>
                </td>
                <td className="description">
                    <span className="title">PR #{this.props.number}</span>
                    <span className="subtitle">{this.props.title}</span>
                </td>
                <td className="creator">
                    <span className="title">{this.props.creator}</span>
                    <span className="subtitle">{this.props.created}</span>
                </td>
                <td className="url">
                    <a target="_blank" href={this.props.url}>
                        <i className="fa fa-lg fa-external-link"/>
                    </a>
                </td>
            </tr>
        );
    }
};