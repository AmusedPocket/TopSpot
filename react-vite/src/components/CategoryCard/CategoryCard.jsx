import { NavLink } from "react-router-dom";

const CategoryCard = ({category, url}) => {
    const catIcon = {
        Restaurants: "fa-solid fa-utensils",
        Shopping: "fa-solid fa-store",
        ActiveLife: "fa-solid fa-person-walking",
        Health: "fa-solid fa-file-medical"
    }

    return(
        <NavLink className="category-container" to={`/category/${category}`}>
            <div 
                className="background"
                style={{
                    backgroundImage: `url(${url})`,
                }} 
            />

            <div className="category-card">
                <i className={`${catIcon[category]} fa-lg`} />
                <p className="category-name">
                    {category.split(" ").map((word) => word[0].toUpperCse() + word.slice(1)).join(" ")}
                </p>
            </div>
        </NavLink>
    )
}

export default CategoryCard;