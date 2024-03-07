import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkCreateReview, thunkDeleteReview, thunkGetReview, thunkUpdateReview } from "../../redux/reviews";
import Button from "../Form/Button/Button";
import StarRatings from "../StarRatings/StarRatings";
import Error from "../Form/Error/Error";
import { thunkGetSpot } from "../../redux/spot";
import Delete from "../Form/Delete/Delete";
import { useModal } from "../../context/Modal";
import './ReviewForm.css'


const ReviewForm = ({spot, review}) => {
    const dispatch = useDispatch()
    const { setModalContent, closeModal } = useModal()
    const reviewInfo = useSelector((state) => state.reviews.currReview)
    const [rating, setRating] = useState(review ? review.rating : "")
    const [body, setBody] = useState(review ? review.body : "")
    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        if(review) dispatch(thunkGetReview(review.id))
    }, [dispatch, review])

    useEffect(()=> {
        setErrors({});
        const errorsObj = {}

        if (!rating) errorsObj.rating = "Must submit a rating."
        if (!body) errorsObj.body = "Please describe your review."
        else if (body.length > 1000) errorsObj.body = "Review too long! Review must be less than 1,000 characters."

        setErrors(errorsObj)
    }, [body, rating])

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        if(Object.values(errors).length === 0){
            const reviewData = review ? {...reviewInfo} : {}

            reviewData.rating = rating;
            reviewData.body = body;
            reviewData.spot_id = spot.id;

            let data;
            if(review){
                
                data = await dispatch(thunkUpdateReview(reviewData))
                
            } else {
                
                data = await dispatch(thunkCreateReview(reviewData))
            }

            if(data.errors){
                const errorsObj = {}

                for (const error of data.errors){
                    const [name, message] = error.split(" : ")
                    errorsObj[name] = message
                }

                return setErrors(errorsObj)
            }
            await dispatch(thunkGetSpot(spot.id))
            closeModal();
        }
    }

    console.log("Hi i'm spot!", spot)

    return (
        <div className="form-review">
            {review && (
                <div
                    className="delete"
                    title="Delete your review."
                    onClick={()=> setModalContent(
                        <Delete
                        spot={spot}
                        thunk={thunkDeleteReview}
                        item={review}
                        />
                    )}
                >
                    <i className="fa-solid fa-trash" />
                </div>
            )}
            <h1>{spot.title}</h1>
            <p className="review-form-review-title">Please rate your experience!</p>

            <form className="review-form-wrapper" onSubmit={onSubmit}>
                {submit && errors.rating && <p className="p-error">{errors.rating}</p>}
                <StarRatings rating={rating} setRating={setRating} />

                {submit && errors.body && <p className="p-error">{errors.body} </p>}
                <textarea
                    placeholder="Enter your review!"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="review-form-text-area"
                />
                <button className="spot-form-add-button" onClick={onSubmit}>{`${review ? "Update" : "Submit"} Review`}</button>
                
            </form>
        </div>
    )
 }

export default ReviewForm;