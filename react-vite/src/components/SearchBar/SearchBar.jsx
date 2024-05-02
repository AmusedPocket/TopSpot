import React, { useState, useEffect } from "react";
import './SearchBar.css'


export const SearchBar = ({ setResults }) => {
    // Front end search
    const [input, setInput] = useState("");
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            console.log("input is: ", input)
            const fetchData = (input) => {
                fetch(`/api/spots/search?q=${input}`)
                    .then((response) => response.json())
                    .then((data) => {
                        setResults(data)

                    })
                    .catch((error) => {
                        console.error("Error fetching data: ", error)
                    })
            }

            fetchData(input);

        }, 500)
        return () => {
            clearTimeout(timeOutId)
        }
    }, [input])


    const handleChange = (value) => {
        console.log("value is:", value)
        setInput(value);
        // fetchData(value);
    }
    return (
        <div className="search-bar">

            <i className="fa-brands fa-searchengin" id="search-icon" />
            <input placeholder="Search TopSpots!" className="search-bar-input" value={input} onChange={(e) => handleChange(e.target.value)} />
        </div>
    )
    // const [wordEntered, setWordEntered] = useState("")
    // const handleFilter = (event) => {
    //     const searchWord = event.target.value;
    //     setWordEntered(searchWord)

    // }

    // return (
    //     <div className="search-bar">
    //         <i className="fa-brands fa-searchengin" id="searh-icon"/>
    //         <input placeholder="Search TopSpots!" type="text" className="search-bar-input" onChange={handleFilter} />
    //     </div>
    // )
}