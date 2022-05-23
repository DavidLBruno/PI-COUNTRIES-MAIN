import React from "react";
import styles from './Paginated.module.css'

export default function Paginated({countriesPerPage, allCountries, paginated}){
    const pageNumbers = [];
    for (let  i = 0;  i < Math.ceil(allCountries/countriesPerPage);  i++) {
        pageNumbers.push(i + 1);
    }
    return(
        <div>
            <div className={styles.bar}>
                { pageNumbers &&
                pageNumbers.map(number => (
                    <div key={number}>
                        <button onClick={() => paginated(number)}>{number}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}