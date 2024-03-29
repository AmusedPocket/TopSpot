import React, { useState } from "react";
import './SearchBar.css'


export const SearchBar = ({setResults}) => {
    const [input, setInput] = useState("");

    const fetchData = (value) => {
        fetch('/api/spots')
            .then((response) => response.json())
            .then((data) => {
                const spots = Array.isArray(data.spots) ? data.spots : Object.values(data.spots);
            
                const results = spots
                    .filter((spot) => {
                        return (
                        value &&
                        spot &&
                        spot.title &&
                        spot.title.toLowerCase().includes(value.toLowerCase()))
                    })
                // .map((spot) => Object.values(spot)); 


            //     const convertedResults = results.map((spotValues) => {
            //         return spotValues.map((value) => {
            //             // Check if the value is an object, if so, stringify it
            //             if (typeof value === 'object' && value !== null) {
            //                 return JSON.stringify(value);
            //             }
            //             return value;
            //         });
            //     });

           setResults(results)
           
            
        })
        .catch((error) => {
            console.error("Error fetching data: ", error)
        })
    }

    const handleChange = (value) => {
        setInput(value);
        fetchData(value);
    }
    return (
    <div className="search-bar">
        <i className="fa-brands fa-searchengin" id="search-icon"/>
        <input placeholder="Search TopSpots!" className="search-bar-input" value={input} onChange={(e) => handleChange(e.target.value)}/>
    </div>
    )
}