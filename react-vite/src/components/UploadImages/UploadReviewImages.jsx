import {useState} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import Button from "../Form/Button/Button";
import { thunkUploadReviewImage } from "../../redux/review_images";
import { thunkGetSpot } from "../../redux/spot";

const UploadReviewImageFeed = ({file, reviewImages, setReviewImages}) => {
    const url = URL.createObjectURL(file);
    const happyFileSize = (fileSize) => {
        if(fileSize < 1024){
            return `${fileSize} bytes`
        } else if (fileSize >= 1024 && fileSize < 1048576){
            return `${(fileSize / 1024).toFixed(1)} kilobytes`
        } else if (fileSize >= 1048576){
            return `${(fileSize / 1048576).toFixed(1)} megabytes`
        }
    }

    return (
        <div className="image-feed-file">
            <img src={url} alt="image-preview"/>
            <div
                className="image-hover-card"
                onClick={() => {
                    setReviewImages(Array.from(reviewImages).filter((obj) => obj !== file));
                }}
                >
                    <p>{file.name}</p>
                    <p>{happyFileSize(file.size)}</p>
                    <i className="fa-solid fa-trash-can fa-bounce"/>
                </div>
        </div>
    )
}

const UploadReviewImages = ({spotId}) => {
    const dispatch = useDispatch();
    const {closeModal} = useModal();
    const [reviewImages, setReviewImages] = useState([])
    const [loadingImages, setLoadingImages] = useState(false)

    const onSubmit = async (e) => {
        e.preventDefault();

        setLoadingImages(true);

        for (const image of reviewImages){
            const form = new FormData()
            form.append("image", image);
            form.append("spot_id", spotId);
            await dispatch(thunkUploadReviewImage(form))
        }

        await dispatch(thunkGetSpot(spotId));

        setLoadingImages(false);

        closeModal();
    }

    const style = () => {
        if(reviewImages.length === 0 || loadingImages){
            return {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflowY: "hidden"
            }
        }
        if(reviewImages.length === 1){
            return {
                alignItems: "center"
            }
        }
        if(reviewImages.length === 2){
            return {
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "flex-start"
            }
        }
    }  
    return (
        <div className="upload-review-images">
            <form onSubmit={onSubmit} encType="multipart/form-data">
                <label>
                    Add Review Image(s)
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e)=> 
                        setReviewImages([...Array.from(reviewImages), ...e.target.files])}
                    />
                </label>
                <div style={style()} className="review-image-container">
                    {loadingImages && <div className="review-image-loader" />}

                    {!loadingImages && reviewImages.length === 0 && (
                        <p className="no-images">No Selected Images</p>
                    )}

                    {!loadingImages && reviewImages.length > 0 && Array.from(reviewImages).map((file, index) =>(
                        <UploadReviewImageFeed 
                        key={index}
                        file={file}
                        reviewImages={reviewImages}
                        setReviewImages={setReviewImages}
                        />
                    ))}
                </div>
                <Button text={"Upload Image(s)"} />
            </form>
        </div>
    )
}

export default UploadReviewImages;