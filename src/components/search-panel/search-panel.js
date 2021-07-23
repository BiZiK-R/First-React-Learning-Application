import React, {Component} from 'react';
import './search-panel.css';

export default class SearcPanel extends Component {
    state = {
        term: ''
    }

    onUpdataSearch = (e) => {
        const term = e.target.value.toLowerCase();
        this.setState({term});
        this.props.onUpdataSearch(term);
    }

    render() {
        return (
            <input
                className="form-control search-input"
                type="text"
                placeholder="Поиск по записям"
                onChange={this.onUpdataSearch}
            />
        )
    }
}