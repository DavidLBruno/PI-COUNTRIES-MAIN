import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../actions/index";
import { useEffect } from "react";

export default function Detail(){
    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        dispatch(getDetail(params.id));
    }, [dispatch, params.id])
    const myCountries = useSelector((state) => state.detail)


    return (
        myCountries.length ?
        <div>
            <div>
                <div>
                    <div>
                        <h2>{myCountries[0].name}</h2> <Link to='/home'>Back</Link>
                    </div>
                    <div>
                        <img src={myCountries[0].img} alt="la bandera del pais" />
                    </div>
                </div>
                <div>
                    <h4>ID: {myCountries[0].id.toUpperCase()}</h4>
                    <h4>CAPITAL: {myCountries[0].capital.toUpperCase()}</h4>
                    <h4>POPULATION: {myCountries[0].population} HABITANTES</h4>
                    <h4>CONTINENT: {myCountries[0].continent.toUpperCase()}</h4>
                    <h4>REGION: {myCountries[0].subregion.toUpperCase()}</h4>
                    <h4>AREA: {myCountries[0].area} KM2</h4>
                </div>
            </div>

            <div>
                <h2>Activities</h2>
                <div>
                    {
                        myCountries[0].activities.length > 0 ? myCountries[0].activities.map(activity => {
                            return (
                                <div>
                                    <h3>Name: {activity.name}</h3>
                                    <h4>Difficulty: {activity.difficulty}</h4>
                                    <h4>Duration: {activity.duration}</h4>
                                    <h4>Season: {activity.season}</h4>
                                </div>
                            )
                        })
                        : <div><h4>No activities found</h4></div>
                    }
                </div>
            </div>
        </div>
        : <div><h1>No country information found</h1></div>
    )
}