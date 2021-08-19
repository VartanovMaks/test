import React from 'react';
import {useParams, Link} from "react-router-dom";

function BaseDetails() {
    const {id} = useParams();
    return (
        <div>
            <h2>User details</h2>
            <h3>{id}</h3>
            {/* <a href="/base"> <button>Вернуться в базу</button> </a> */}
            <Link className="link-menu" to="/base" ><button>Вернуться в базу</button>  </Link>
        </div>
    );
}

export default BaseDetails;