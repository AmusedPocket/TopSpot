import { NavLink } from "react-router-dom";
import "./CategoryCard.css"

const CategoryTile = ({category, url}) => {
    const catIcon = {
        Restaurants: "fa-utensils",
        Shopping: "fa-store",
        "Active Life": "fa-person-walking",
        Health: "fa-file-medical"
    }
    console.log("image url is: ", url)
    return(
        <NavLink className="category-container" to={`/category/${category}`}>
            <div 
                className="background"
                style={{
                    backgroundImage: `url(${url})`,
                }} 
            />

            <div className="category-tile">
                <i className={`fa-solid ${catIcon[category]} fa-lg`} />
                <p className="category-name">
                    {category.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")}
                </p>
            </div>
        </NavLink>
    )
}

export default CategoryTile;