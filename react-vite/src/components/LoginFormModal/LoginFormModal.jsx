import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import FormInput, { errorHandler, toInput } from "../Form/Input/Input";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [credential, setCredential] = useState("")
  const [submitted, setSubmitted]= useState(false)
  const { closeModal } = useModal();


  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitted(true);

    if(Object.values(errors).length === 0){
      const serverResponse = await dispatch(
        thunkLogin({
          credential,
          password,
        })
      );
  
      if (serverResponse) {
        const errorsObj = {}

        for (const error of serverResponse){
          const [name, message] = error.split(" : ")
          errorsObj[name] = message
        }

        return setErrors(errorsObj);
      } 
        closeModal();
      
    }

  };

  useEffect(()=> {
    setErrors({})
    const errorsObj = {}

    if(!credential) errorsObj.credential = "Must provide a username or email"
    else if (password.length > 40){
      errorsObj.credential = "Username or Email must be less than 40 characters"
    }

    if(!password) errorsObj.password = "Password required"
    else if (password.length > 40) {
      errorsObj.password = "Password must be less than 40 characters"
    }

    setErrors(errorsObj)
  }, [credential, password])

  const demoUserLogin = async (e) => {
    e.preventDefault();
    
    await dispatch(thunkLogin({credential: "demo@aa.io", password: "password"}));

    closeModal();
  }

  return (
    <div className="login-modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <FormInput
        input={toInput("User name or Email", credential, setCredential)}
        errorHandler={errorHandler(submitted, errors.credential)}
        />
        <FormInput
        input={toInput("Password", password, setPassword, "password")}
        errorHandler={errorHandler(submitted, errors.password)}
        />
        <button className="logged-out-buttons" type="submit">Log In</button>
      </form>
      <p className="logged-out-buttons" onClick={demoUserLogin}>
                Log in as Demo User
            </p>
    </div>
  );
}

export default LoginFormModal;
