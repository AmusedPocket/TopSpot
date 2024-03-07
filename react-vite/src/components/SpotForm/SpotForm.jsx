import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useModal } from "../../context/Modal";
import { thunkCreateSpot, thunkDeleteSpot, thunkUpdateSpot } from "../../redux/spot";
import Delete from "../Form/Delete/Delete";
import FormInput, { toInput, errorHandler } from "../Form/Input/Input";
import FormSelect, { inputSelections } from "../Form/Select/Select";
import Error from "../Form/Error/Error";
import './SpotForm.css'

const SpotForm = ({ spot }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { setModalContent, closeModal } = useModal()

    const spotData = useSelector((state) => state.spot.currSpot)

    const [title, setTitle] = useState(spot ? spot.title : "")
    const [description, setDescription] = useState(spot ? spot.description : "")
    const [category, setCategory] = useState(spot ? spot.category : "")
    const [address, setAddress] = useState(spot ? spot.address : "")

    let addressParts = " , , , "
    if (address) {
        addressParts = address.split(",").map(part => part.trim())
    }

    const [streetAddress, setStreetAddress] = useState(spot ? addressParts[0] : "")
    const [city, setCity] = useState(spot ? addressParts[1] : "")
    const stateZip = addressParts[2].split(" ")
    const [state, setState] = useState(spot ? stateZip[0] : "")
    const [zipcode, setZipcode] = useState(spot ? stateZip[1] : "")
    const [phone, setPhone] = useState(spot ? spot.phone : "")

    const [errors, setErrors] = useState({})
    const [submit, setSubmit] = useState(false)

    useEffect(() => {
        setErrors({});
        const errorsObj = {};

        if (!title) errorsObj.title = "Must submit a title.";
        else if (title.length > 40) errorsObj.title = "Title must be less than 40 characters."
       
        if (!city) errorsObj.city = "Must enter a city.";
        if (!state) errorsObj.state = "Must select a state."
        if (!zipcode) errorsObj.zipcode = "Must enter a zipcode."
        if (!streetAddress) errorsObj.streetAddress = "Must enter an address."
        else if (address.length > 255) errorsObj.address = "Address must be less than 255 characters."

        if (!description) errorsObj.description = "Must set a description."
        else if (description.length > 255) errorsObj.description = "Description must be less than 255 characters."

        if (!category) errorsObj.category = "Must select a category"
        if (!phone) errorsObj.phone = "Must enter a phone number."
        else if (!/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phone)) errorsObj.phone = "Phone number must be a valid format."

        setErrors(errorsObj)
    }, [title, city, state, streetAddress, description, category, zipcode, phone])

    useEffect(() => {
        setAddress(`${streetAddress}, ${city}, ${state} ${zipcode}`)
    }, [streetAddress, city, state, zipcode])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);

        if (Object.values(errors).length === 0) {
            const formData = spot ? { ...spotData } : {}

            formData.title = title;
            formData.description = description;
            formData.category = category;
            formData.address = address;
            formData.phone = phone


            let data;
            if (spot) {

                data = await dispatch(thunkUpdateSpot(formData))
            } else {

                data = await dispatch(thunkCreateSpot(formData))
            }

            if (data.errors) {
                const errorsObj = {}
                for (const error of data.errors) {
                    const [name, message] = error.split(" : ")
                    errorsObj[name] = message;
                }

                return setErrors(errorsObj)
            }

            closeModal();
            navigate(`/spot/${data.id}`)
        }
    }

    return (
        <div className="spot-form">
            {spot && (
                <div
                    className="delete-spot"
                    title="Click to delete spot"
                    onClick={() =>
                        setModalContent(
                            <Delete
                                item={spot}
                                thunk={thunkDeleteSpot}
                                spot={spot} />
                        )}>
                    <i className="fa-solid fa-trash" />
                </div>
            )}
            <h1>{spot ? "Edit " : "Create a "}Spot</h1>
            <form onSubmit={handleSubmit}>
                <FormInput input={toInput("Spot Name", title, setTitle)}
                    errorHandler={errorHandler(submit, errors.title)}
                />
                <FormSelect
                    input={inputSelections(category, setCategory, [
                        "Restaurants",
                        "Shopping",
                        "Active Life",
                        "Health"
                    ])}
                    buttonText="Select a category."
                    errorHandler={errorHandler(submit, errors.category)}
                />

                <div className="div-error">
                    {submit && errors.spot_id && (
                        <Error error={errors.spot_id} />
                    )}
                </div>

                <FormInput input={toInput("Street Address", streetAddress, setStreetAddress)}
                    errorHandler={errorHandler(submit, errors.streetAddress)}
                />

                <FormInput
                    input={toInput("City", city, setCity)}
                    errorHandler={errorHandler(submit, errors.city)}
                />
                <FormSelect
                    className="form-select-category"
                    type={state}
                    input={inputSelections(state, setState, [
                        "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
                    ])}
                    buttonText={"Select a state."}
                    errorHandler={errorHandler(submit, errors.state)}
                />
                <FormInput
                    input={toInput("Zip code", zipcode, setZipcode)}
                    errorHandler={errorHandler(submit, errors.zipcode)}
                />
                <FormInput
                    input={toInput("Phone", phone, setPhone)}
                    errorHandler={errorHandler(submit, errors.phone)}
                />

                <div className="spot-form-text-area-wrapper">
                    {submit && errors.description && <p className="p-error">{errors.description}</p>}
                    <textarea
                        className="spot-form-text-area"
                        placeholder="Enter a description for your spot!"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="spot-form-add-button" onClick={handleSubmit}>{`${spot ? "Edit" : "Add"} Spot`}</button>
                </div>
            </form>
        </div>
    )
}

export default SpotForm;