import { useEffect, useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";


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
          email,
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
    
    await dispatch(thunkLogin({email: "demo@aa.io", password: "password"}));

    closeModal();
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
