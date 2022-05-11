import React from 'react';
import { Link } from 'react-router-dom'

export default function(){
    return(
        <div>
            <h1>Welcome to LandingPage</h1>
            <Link to = '/home'>
                <button>Login</button>
            </Link>
        </div>
    )
}