
import "./CategoryCard.css"
import { useNavigate } from "react-router-dom";

const CategoryTile = ({ category, url, index }) => {
    const navigate = useNavigate()
    const catIcon = {
        Restaurants: "fa-utensils",
        Shopping: "fa-store",
        "Active Life": "fa-person-walking",
        Health: "fa-file-medical"
    }
    console.log("Category is: ", category)
    return (
        <div className="c-wrap" id={`category-${index}`} onMouseLeave={(e) => {
            const background = e.target.closest('.background')

            if (background) {
                background.style.filter = "blur(2px)"
            }
        }} onMouseEnter={(e) => {
            const background = e.target.closest('.background')

            if (background) {
                background.style.filter = "none"
            }
        }}
        onClick={() => navigate(`/category/${category}`)}>
            <div className="background" style={{
                backgroundImage: `url(${url})`
            }}>

            </div>
            <div className="category-tile" id={index} 

            >
                <i className={`fa-solid ${catIcon[category]} fa-lg`} />
                <p className="category-name">

                    {category.split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ")}
                </p>
            </div>


        </div>
    )
}

export default CategoryTile;