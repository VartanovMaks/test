import React from 'react';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'

function Header1({lastClick}) {
    return (
        <div>
            <Link className="link-menu" to="/"  >Home</Link>
            <Link className="link-menu" to="/rules" >Rules</Link>
            <Link className="link-menu" to="/game" >Gam</Link>
            <Link className="link-menu" to="/base" onClick={lastClick}>Base</Link>

        </div>
    );
}

export default Header1;