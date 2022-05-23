import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';

export default function(){
    return(
        <body className={styles.body}>
            <div>
                <Link to = '/home'>
                    <button className={styles.btn}>Login</button>
                </Link>
            </div>
        </body>
    )
}