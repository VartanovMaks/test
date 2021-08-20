import React from 'react';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'

function Header2({lastClick}) {
    return (
        <div>
            <Link className="link-menu" to="/base/ivanov" >Ivanov </Link>
            <Link className="link-menu" to="/base/petrov" >Petrov</Link>
            <Link className="link-menu" to="/home" onClick={lastClick} > to menu</Link>

        </div>
    );
}

export default Header2;