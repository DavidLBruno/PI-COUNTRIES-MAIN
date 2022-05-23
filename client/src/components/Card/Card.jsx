import React from 'react';
import styles from './Card.module.css';
import { Link } from 'react-router-dom';

export default function Card({ name, img, continent, id}){
    return(
        <Link to={`/home/${id}`} style={{textDecoration:'none', color:'black'}} className={styles.card}>
        <div className={styles.card}>
            <h3 className={styles.name}>{name}</h3>
            <h5 className={styles.continent}>{continent}</h5>
            <img src={img} alt='Image not found' className={styles.img}/>
        </div>
        </Link>
    )
}