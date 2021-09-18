import React from 'react';
import {Link} from 'react-router-dom'

function Header({lastClick}) {
    return (
        <div className="menu">
            <Link className="link-item" to="/"  >Home</Link>
            <Link className="link-item" to="/films" >Films</Link>
            <Link className="link-item" to="/films/create" >Film create</Link>

        </div>
    );
}

export default Header;