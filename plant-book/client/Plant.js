import React, { useEffect, useState } from "react";
import Plot from 'react-plotly.js';
import { get } from '../client/utilities.js';


const SinglePlant = (props) => {
    // var trace_moisture = {
    //     x: props.dates,
    //     y: props.moisture,
    //     mode: 'lines'
    // }

    // var trace_temp = {
    //     x: props.dates,
    //     y: props.temperature,
    //     mode: 'lines'
    // }

    // return (
    //     <div>
    //         <Plot 
    //            data = {[trace_moisture, trace_temp]}
    //            layout={{}}
    //            config={{responsive: true}}
    //         />
    //     </div>
    // )
    const [moistures, setMoistures] = useState([]);
    useEffect(() => {
        get("api/moistures").then( (moisObjs) => {
            setMoistures(moisObjs);
            // console.log(JSON.stringify(moisObjs));
        });
    }, []);
    console.log(JSON.stringify(moistures));
    return (
        <div>
            {props.name}: {JSON.stringify(moistures)}
        </div>
    )
};

const Plant = () => {
    const [plants, setPlants] = useState([]);
    useEffect(() => {
        get("api/plants").then( (plantObjs) => {
            setPlants(plantObjs);
        });
    }, []);

    if (plants.length === 0) {
        return (
            <div>No Plants!</div>
        );
    }

    const plantList = plants.map( (plantObj) => (
        <SinglePlant id={plantObj.sensorId} name={plantObj.name} />
    ))
    console.log("here 2")
    console.log(plantList)

    return (
        <>
        {plantList}
        </>
    ) 
  
};

export default Plant;
