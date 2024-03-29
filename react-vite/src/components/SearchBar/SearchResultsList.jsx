import React from "react";
import './SearchResultsList.css';
import { NavLink } from "react-router-dom";


export const SearchResultsList = ({results}) => {
    const firstThreeResults = results.slice(0, 3)
    return(
        <div className="results-list">
          {firstThreeResults.map((result, index) => {
            return <NavLink to={`/spot/${result.id}`}>
            <div className="results-list-results" key={index}>{result.title}</div>
            
            </NavLink>
          })}
        </div>
    )
}