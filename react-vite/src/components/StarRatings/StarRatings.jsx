import {useEffect, useState} from "react";

const StarRatings = ({rating, setRating}) => {
    const starColors = {
        1: "#FFCB0D",
        2: "#FFA90E",
        3: "#FF7A08",
        4: "#FF4401",
        5: "#FA0F07"
    }

    const ratingText = (rating) => {
        switch(rating){
            case 1:
                return "Not trying that again."

            case 2:
                return "Not that good."
            
            case 3:
                return "Good, not great."
            
            case 4: 
                return "Very good!"

            case 5:
                return "Great!"
            
            default:
                return "";
        }
    }

    const [starRating, setStarRating] = useState(rating);

    const StarImage = ({number}) => {
        const starColor = number <= starRating ? starColors[starRating] : "lightgray";

        useEffect(() => {
            if(!setRating) setStarRating(rating)
        }, [])

        const createProps = () => {
            const def = () => {}

            return {
                onMouseEnter: setRating ? () => setStarRating(number) : def,
                onMouseLeave: setRating ? () => setStarRating(rating) : def,
                onClick: setRating ? () => setRating(number) : def
            }
        }

        const starStyling = {
            border: `1px solid ${starColor}`,
            backgroundColor: `${starColor}`,
            margin: `2px`,
            borderRadius: `8px`
        }

        return (
            <div style={starStyling} {...createProps()}>
                <i 
                    style={{padding: "5px", color:"white"}}
                    className={`fa-solid fa-star`}
                />
            </div>
        )
    }

    return (
        <>
            <div 
            className='rating-text'
            style={{
                height: setRating ? "30px" : "0",
                display: "flex",
                alignItems: "center"
            }}
            >
                {setRating && (
                    <p
                    style={{
                        fontFamily:`"Amatic SC", cursive`,
                        fontSize: "20px",
                        fontWeight: "bold"
                    }}
                    >
                        {ratingText(starRating)}
                    </p>
                )}
            </div>

            <div className="rating-bar" style={{display: "flex"}}>
                {[1,2,3,4,5].map((number) => (
                <StarImage key={number} number={number} />))}
            </div>
        </>
    )
}

export default StarRatings;