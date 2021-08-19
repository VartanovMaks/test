import React from 'react';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'

function Base() {
    return (
        <div>
            Work with base
            {/* <ul>
                <a href="/base/ivanov" className="link-menu">Ivanov </a>
                <a href="/base/petrov" className="link-menu">Petrov</a>
            </ul> */}
            <ul>
                <Link className="link-menu" to="/base/ivanov" >Ivanov </Link>
                <Link className="link-menu" to="/base/petrov" >Petrov</Link>
            </ul>


        </div>
    );
}

export default Base;