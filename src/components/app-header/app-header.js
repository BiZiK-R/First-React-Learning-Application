import React from 'react';
import './app-header.css';


const AppHeader = ({liked, allPosts}) => {
    return (
        <div className="app-header">
            <h1>Andrey Gorbunov</h1>
            <h2>{allPosts} записей, из низ понравилось {liked}</h2>
        </div>
    )
}

export default AppHeader;