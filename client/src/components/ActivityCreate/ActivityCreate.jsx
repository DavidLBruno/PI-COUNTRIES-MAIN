import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postActivities, getCountries } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";
import styles from './ActivityCreate.module.css';
import validate from "./Validator";

export default function ActivityCreate(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const countries = useSelector((state) => state.countries);
    const [errors, setErrors] = useState({});

    const [ input, setInput ] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        country: []
    });

    useEffect(() => {
        dispatch(getCountries())
    }, [dispatch])

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    function handleSelect(e){
        setInput({
            ...input,
            country: [...input.country, e.target.value]
        })
    };

    function handleDelete(el){
        setInput({
            ...input,
            country: input.country.filter( country => country !== el)
        })
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(input.name && input.difficulty && input.duration && input.season && input.country.length >= 1){
        dispatch(postActivities(input));
        alert('Actividad creada exitosamente');
        setInput    ({
            name: '',
                difficulty: '',
                duration: '',
                season: '',
                country: []
            });
        errors.firstTry = false
        navigate('/home')
        }
        if(errors.firstTry){
            alert('Completar los campos correspondientes')
        }
    }

    function handleCheckErrors(e) {
        e.preventDefault();
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
            countries: [...input.country, e.target.value]
        }))
        handleSubmit(e)
    }



    return (
        <div className={styles.body}>

            <div className={styles.bar}>
                <h1 className={styles.title}>Activity</h1>
                <Link to='/home'>
                    <button className={styles.btn}>Back</button>
                </Link>
            </div>

            <form onSubmit={ (e) => handleSubmit(e) } className={styles.form}>
            <div>
                <select name='country' onChange={(e) => handleSelect(e)}>
                    <option>Select Country</option>
                    {countries.map((country) => (
                    <option value={country.id}>{country.name}</option>
                ))}
            </select>
            </div>

            <div>
                    <label>Name: </label>
                    <input
                    type= "text"
                    value= {input.name}
                    name= "name"
                    onChange={handleChange}
                    />
                    {errors.name && (
                        <p className='error'>{errors.name}</p>
                    )}
                </div>

                <div>
                <label>Duration: </label>
                <select onChange={handleChange} name='duration'>
                    <option>-</option>
                    <option value='1'>1 hour</option>
                    <option value='2'>2 hours</option>
                    <option value='3'>3 hours</option>
                    <option value='4'>4 hours</option>
                </select>
                </div>

                <div>
                    <label>Season: </label>
                    <select onChange={handleChange} name='season'>
                        <option>-</option>
                        <option value='Summer'>Summer</option>
                        <option value='Spring'>Spring</option>
                        <option value='Winter'>Winter</option>
                        <option value='Autumn'>Autumn</option>
                    </select>
                </div>


                <div>
                    <label>Difficulty: </label>
                    <select onChange={handleChange} name='difficulty'>
                        <option>-</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                    </select>
                </div>


                { errors.name || errors.duration || errors.season || errors.difficulty || errors.country
                ? <h3>Files is required</h3>
                : <div>
                    <button onClick={e => handleCheckErrors(e)}>Create Activity</button>
                </div>
                }

                </form>

            <div className={styles.countries}>
                {input.country.map(el =>
                    <div className={styles.country}>
                        <p>{el}</p>
                        <button onClick={() => handleDelete(el)} className={styles.btnCountry}>x</button>
                    </div>
                )}
            </div>
        </div>
    )
}