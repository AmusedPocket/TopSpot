import StarRatings from "../../StarRatings/StarRatings"


const SpotFeedItem = ({spot}) => {
    const {title, avg_rating, description, reviews} = spot
    const numberOfReviews = Object.values(reviews).length
    return (
        <div className="spot-feed-item">
            <div className="title-rating">
                <p className="title">{title}</p>
                <div className="rating">
                    <StarRatings rating={Math.round(Number(avg_rating))} />
                    <p>
                        {numberOfReviews} review{numberOfReviews > 1 ? "s" : ""}
                    </p>
                </div>
            </div>
            
            <div className="description">
                <p className="description-title">Spot description:</p>
                <p className="description-message">{description}</p>
            </div>

        </div>
    )
}

export default SpotFeedItem;