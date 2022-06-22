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
    return (
        <div>
            {props.moisture}: {props.temperature}
        </div>
    )
};

const Plant = () => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        get("api/plants").then( (plantObjs) => {
            // const temperatures = plantObjs.map(obj => {
            //     obj.temp
            // });
            setPlants(plantObjs);
        });
    }, []);
    let plantList = null;
    const hasPlants = plants.length !== 0;
    if (hasPlants) {
        plantList = plants.map( (obj) => (
            <SinglePlant moisture={obj.name} temperature={obj.sensorId}/>
        ));
    } else {
        plantList = <div>No Plants!</div>
    }
    return (
        <>
        {plantList}
        </>
    )    
};

export default Plant;
