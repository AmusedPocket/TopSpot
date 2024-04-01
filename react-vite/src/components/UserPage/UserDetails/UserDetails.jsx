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
                            onChange={(e)=> onChange(e.target.value)}
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
    const [first_name, setFirstName] = useState(user.first_name)
    const [last_name, setLastName] = useState(user.last_name)
    const [user_name, setUserName] = useState(user.user_name)
    const [email, setEmail] = useState(user.email)

    const [errors, setErrors] = useState({})

    useEffect(()=> {
        setErrors({});
        const errorsObj = {}

        if(!first_name) errorsObj.first_name = "Must submit a first name."
        else if (first_name.length > 30) errorsObj.first_name = "First name must be less than 30 characters."

        if(!last_name) errorsObj.last_name = "Must submit a last name."
        else if (last_name.length > 30) errorsObj.last_name = "Last name must be less than 30 characters."

        if(!email) errorsObj.email = "Must submit an email."
        if(!validateEmail(email)) errorsObj.email = "Must enter a valid email."
        else if (email.length > 30) errorsObj.email = "Email must be less than 30 characters."

        if(!user_name) errorsObj.user_name = "Username required."
        else if(user_name.length > 30) errorsObj.user_name = "Username must be less than 30 characters."
        setErrors(errorsObj)
    }, [email, first_name, last_name, user_name])

    const validateEmail = (email) => {
        const validEmail = /^[\w\-_$]+(\.[\w\-_$]+)*@[\w\-]+(\.[\w\-]+)*(\.[a-zA-Z]{2,})$/;
        return validEmail.test(email)
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(Object.values(errors).length === 0){
            const updatedInfo = {
                user_id: user.id,
                email,
                user_name,
                first_name,
                last_name
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
        
    }

    return (
        <div className="edit-user-form">
            <form className="update-user" onSubmit={onSubmit} ref={inputRef}>
                {[
                    [first_name, "First Name", setFirstName],
                    [last_name, "Last Name", setLastName],
                    [user_name, "User Name", setUserName],
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