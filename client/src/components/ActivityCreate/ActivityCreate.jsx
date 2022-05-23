import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postActivities, getCountries } from "../../actions/index";
import { useDispatch, useSelector } from "react-redux";

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'You need a name';
    }else if(!input.duration){
        errors.duration = 'You need a duration'
    }else if(!input.season){
        errors.season = 'You need a Season'
    }else if(!input.difficulty){
        errors.difficulty = 'You need a difficulty'
    }

    return errors;
};

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

    function handleSubmit(e){
        e.preventDefault();
        alert('Activity created successfully!');
        dispatch(postActivities(input));
        navigate('/home');
    };

    function handleDelete(el){
        setInput({
            ...input,
            country: input.country.filter( country => country !== el)
        })
    }



    return (
        <div>
            <Link to='/home'><button>Back</button></Link>
            <h1>Create Activity</h1>
            <form onSubmit={(e) => handleSubmit(e)}>

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
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
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

                <div>
                <select name='country' onChange={(e) => handleSelect(e)}>
                    {countries.map((country) => (
                        <option value={country.id}>{country.name}</option>
                    ))}
                </select>
                </div>

                <button type="submit">Create Activity</button>

            </form>

                {input.country.map(el =>
                    <div>
                        <p>{el}</p>
                        <button onClick={() => handleDelete(el)}>x</button>
                    </div>
                )}

        </div>
    )
}