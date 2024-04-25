import React, { useState } from "react";
import './SearchBar.css'


export const SearchBar = ({setResults}) => {
    // Front end search
        // const [input, setInput] = useState("");
    
        // const fetchData = (value) => {
        //     fetch('/api/spots')
        //         .then((response) => response.json())
        //         .then((data) => {
        //             const spots = Array.isArray(data.spots) ? data.spots : Object.values(data.spots);
                
        //             const results = spots
        //                 .filter((spot) => {
        //                     return (
        //                     value &&
        //                     spot &&
        //                     spot.title &&
        //                     spot.title.toLowerCase().includes(value.toLowerCase()))
        //                 })
                

        //        setResults(results)
            
                
        //     })
        //     .catch((error) => {
        //         console.error("Error fetching data: ", error)
        //     })
        // }

        // const handleChange = (value) => {
        //     setInput(value);
        //     fetchData(value);
        // }
        // return (
        // <div className="search-bar">
        
        //     <i className="fa-brands fa-searchengin" id="search-icon"/>
        //     <input placeholder="Search TopSpots!" className="search-bar-input" value={input} onChange={(e) => handleChange(e.target.value)}/>
        // </div>
        // )
    const [wordEntered, setWordEntered] = useState("")
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord)

    }
    
    return (
        <div className="search-bar">
            <i className="fa-brands fa-searchengin" id="searh-icon"/>
            <input placeholder="Search TopSpots!" type="text" className="search-bar-input" onChange={handleFilter} />
        </div>
    )
}