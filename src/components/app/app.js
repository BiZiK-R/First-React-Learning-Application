import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import PostStatusFilter from '../post-status-filter';
import PostList from '../post-list';
import PostAddForm from '../post-add-form';
import './app.css';

export default class App extends Component {
    state = {
        data : [
            {label: "Going to learn React", important: false, like: false, id: 1},
            {label: "That is so good", important: false, like: false, id: 2},
            {label: "I need a brack...", important: true, like: false, id: 3}
        ],
        term: '',
        filter: 'all',
        maxId: 4
    }

    

    deleteItem = (id) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);
            
            const before = data.slice(0, index);
            const after = data.slice(index+ 1);

            const newArr = [...before, ...after];

            return {
                data: newArr
            }
        });
    }

    addItem = (body) => {
        const {maxId} = this.state;
        const newItem = {
            label: body,
            important: false,
            id: maxId
        }

        this.setState(({data, maxId}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr,
                maxId: ++maxId
            }
        })
    }

    onToggle = (id, item) => {
        this.setState(({data}) => {
            const index = data.findIndex(elem => elem.id === id);

            const old = data[index];
            const newItem = {...old, [item]: !old[item]};
            
            const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

            return{
                data: newArr
            }
        })
    }

    searchPost = (items, term) => {
        if (term.length === 0) {
            return items
        }

        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term) > -1
        });
    }

    filterPost = (items, filter) => {
        if (filter === 'like') {
            return items.filter(item => item.like)
        } else {
            return items
        }
    }

    onUpdataSearch = (term) => {
        this.setState({term})
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render() {
        const {data, term, filter} = this.state;

        const liked = data.filter(item => item.like).length;
        const allPosts = data.length;

        const visiblePosts = this.filterPost(this.searchPost(data, term), filter);

        return (
            <div className="app">
                <AppHeader
                    liked={liked}
                    allPosts={allPosts}/>
                <div className="search-panel d-flex">
                    <SearchPanel
                        onUpdataSearch={this.onUpdataSearch}/>
                    <PostStatusFilter
                        filter={filter}
                        onFilterSelect={this.onFilterSelect}/>
                </div>
                <PostList 
                    posts={visiblePosts}
                    onDelete={this.deleteItem}
                    onToggle={this.onToggle}/>
                <PostAddForm
                    onAdd={this.addItem}/>
            </div>
        )
    }
}