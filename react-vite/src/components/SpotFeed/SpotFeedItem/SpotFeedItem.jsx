import StarRatings from "../../StarRatings/StarRatings"
import './SpotFeedItem.css'

const SpotFeedItem = ({spot}) => {
    const {title, avg_rating, description, reviews, images} = spot
    const numberOfReviews = Object.values(reviews).length
   
   
    let url = Object.values(images)[0]?.url
    if(!url){
        url = "https://topspots.s3.us-west-1.amazonaws.com/logo.png"
    }
    const reviewsText = () => {
        if(numberOfReviews >= 1){
            return `Based on ${numberOfReviews} review${numberOfReviews > 1 ? "s" : ""}.`
        } else {
            return `Brand new spot! Be the first to review!`
        }
    }
   
    return (
        <div className="spot-feed-item" style={{
            backgroundImage: `url(${url})`
        }}>
            <p className="spot-card-title">{title}</p>
            <div className="title-rating">
                
                <div className="spot-card-rating">
                    <StarRatings rating={Math.round(Number(avg_rating))} />
                    <p>
                        {reviewsText()}
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