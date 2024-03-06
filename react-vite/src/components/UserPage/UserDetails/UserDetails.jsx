import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { thunkUpdateUser } from "../../../redux/session";
import Error from "../../Form/Error/Error";

const UserData = ({value, label, onChange, user, form}) => {
    const [data, setData] = useState(false)

    return (
        <div className="entry-field">
            <p className="label">
                {label
                    .split("_")
                    .map((word) => word[0].toUpperCase() + word.slice(1))
                    .join(" ")}
                :
            </p>
            <div className="display-field">
                {!data ? (
                    <p className="value">
                        {value}
                        <i
                        className="fa-regular fa-pen-to-square"
                        onClick={() => setData(true)}
                        />
                    </p>
                ) : (
                    <>
                        <input
                            type="text"
                            value={value}
                            onChange={(e)=> setData(true)}
                        />
                        <button className="submit">
                            <i 
                                className="fa-solid fa-check-to-slot"
                                onClick={()=> {
                                    setData(false);
                                    form.current.dispatchEvent(
                                        new Event("submit", {cancelable: true, bubbles: true})
                                    )
                                }}
                                />
                        </button>
                        <i
                            className="fa-solid fa-square-xmark"
                            onClick={()=> {
                                onChange(user[label]);
                                setData(false)
                            }}/>
                    </>
                )}
                
            </div>
        </div>
    )  
}

const UserDetails = ({user}) => {
    const dispatch = useDispatch();

    const inputRef = useRef()
    const [firstName, setFirstName] = useState(user.first_name)
    const [lastName, setLastName] = useState(user.last_name)
    const [userName, setUserName] = useState(user.username)
    const [email, setEmail] = useState(user.email)

    const [errors, setErrors] = useState({})

    useEffect(()=> {
        setErrors({});
        const errorsObj = {}

        if(!firstName) errorsObj.first_name = "Must submit a first name."
        else if (firstName.length > 30) errorsObj.first_name = "First name must be less than 30 characters."

        if(!lastName) errorsObj.last_name = "Must submit a last name."
        else if (lastName.length > 30) errorsObj.last_name = "Last name must be less than 30 characters."

        if(!email) errorsObj.email = "Must submit an email."
        if(!validateEmail(email)) errorsObj.email = "Must enter a valid email."
        else if (email.length > 30) errorsObj.email = "Email must be less than 30 characters."

        if(!userName) errorsObj.userName = "Username required."
        else if(userName.length > 30) errorsObj.userName = "Username must be less than 30 characters."
        setErrors(errorsObj)
    }, [firstName, lastName, email, userName])

    const validateEmail = (email) => {
        const validEmail = /^[\w\-_$]+(\.[\w\-_$]+)*@[\w\-]+(\.[\w\-]+)*(\.[a-zA-Z]{2,})$/;
        return validEmail.test(email)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const updatedInfo = {
            user_id: user.id,
            email,
            firstName,
            lastName
        }

        const data = await dispatch(thunkUpdateUser(updatedInfo));

        if(data){
            const errorsObj = {}

            for (const error of data){
                const [name, message] = error.split(" : ")
                errorsObj[name] = message
            }

            return setErrors(errorsObj);
        }
    }

    return (
        <div className="edit-user-form">
            <form className="update-user" onSubmit={onSubmit} ref={inputRef}>
                {[
                    [firstName, "firstName", setFirstName],
                    [lastName, "lastName", setLastName],
                    [userName, "userName", setUserName],
                    [email, "email", setEmail],
                ].map(([value, label, onChange], index) => (
                    <div key={index}>
                        {errors[label] ? (
                            <Error error={errors[label]}/>
                        ) : (
                            <p style={{height: '20px'}}/>
                        )}
                    <UserData
                        value={value}
                        label={label}
                        onChange={onChange}
                        user={user}
                        form={inputRef}
                        />
                    </div>
                ))}
            </form>
        </div>
    )
}

export default UserDetails;