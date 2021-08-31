import React from 'react';
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'

function Header({lastClick}) {
    return (
        <div>
            <Link className="link-menu" to="/"  >Home</Link>
            <Link className="link-menu" to="/films" >Films</Link>

        </div>
    );
}

export default Header;