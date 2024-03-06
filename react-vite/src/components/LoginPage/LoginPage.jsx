import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkLogin } from "../../redux/session";
import FormInput, { errorHandler, toInput } from "../Form/Input/Input";
import Button from "../Form/Button/Button";

const LoginPage = () => {
    const dispatch = useDispatch();
    const {closeModal} = useModal()
    const [credential, setCredential] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const [submit, setSubmit] = useState(false);

    useEffect(()=>{
        setErrors({})
        const errorsObj = {}

        if(!credential) errorsObj.credential = "Must provide a username or email."
        else if(credential.length > 40) errorsObj.credential = "Email or username must be less than 40 characters."

        if(!password) errorsObj.password = "Please submit a password."
        else if(password.length > 40) errorsObj.password = "Password must be less than 40 characters."
    
        setErrors(errorsObj)
    }, [credential, password])

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmit(true);
        if(Object.values(errors).length === 0){
            const data = await dispatch(thunkLogin({credential, password}))

            if(data){
                const errorsObj = {}

                for(const error of data){
                    const [name, message] = error.split(" : ")
                    errorsObj[name] = message;
                }
                return setErrors(errorsObj)
            }
            closeModal();
        }
    }

    const demoUserLogin = async (e) => {
        e.preventDefault();
        
        await dispatch(thunkLogin({credential: "demo@aa.io", password: "password"}));
    
        closeModal();
      }
    
    return(
        <div className="login-form">
            <h1>Log in</h1>
            <form onSubmit={onSubmit}>
                <FormInput 
                    input={toInput("Username or Email", credential, setCredential)}
                    errorHandler={errorHandler(submit, errors.credential)}
                />
                <FormInput
                    input={toInput("Password", password, setPassword, "password")}
                    errorHandler={errorHandler(submit, errors.password)}
                />
                
                <Button text={"Log In"}/>
                
            </form>

            <p className="" onClick={demoUserLogin}>
                Log in as Demo User
            </p>
        </div>
    )

}

export default LoginPage;