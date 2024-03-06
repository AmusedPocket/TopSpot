import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { thunkSignup } from "../../redux/session";
import { useModal } from "../../context/Modal";
import FormInput, { errorHandler, toInput } from "../Form/Input/Input";

import Button from "../Form/Button/Button";

function SignupFormPage() {
  const dispatch = useDispatch();

  const { closeModal } = useModal();

  const [email, setEmail] = useState("");
  const [user_name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("")
  const [last_name, setLastName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submit, setSubmit] = useState(false)



  useEffect(() => {
    setErrors({});
    const errorsObj = {}

    if (!first_name) errorsObj.first_name = "Must provide a first name."
    else if (first_name.length > 40) errorsObj.first_name = "First name must be less than 40 characters."

    if (!last_name) errorsObj.last_name = "Must provide a last name."
    else if (last_name.length > 40) errorsObj.last_name = "Last name must be less than 40 characters."

    if (!user_name) errorsObj.user_name = "Must provide a user name."
    else if (user_name.length > 40) errorsObj.username = "Username must be less than 40 characters."

    if (!email) errorsObj.email = "Email required."
    else if (email.length > 40) errorsObj.email = "Email must be less than 40 characters."
    else if (email && !email.match(/[\w\-_$@!#%;^&?]+@\w+\.\w+/)) errorsObj.email = "Email address must be valid."

    if (!password) errorsObj.password = "Password required."
    else if (password.length > 40) errorsObj.password = "Password must be less than 40 characters."

    if (!confirmPassword) errorsObj.confirmPassword = "Please re-type your password."
    if (password !== confirmPassword) {
      errorsObj.confirmPassword = "Confirm password does not match password."
      errorsObj.password = "Password does not match confirm password."
    }

    setErrors(errorsObj);
  }, [confirmPassword, first_name, last_name, user_name, email, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmit(true)

    if (Object.values(errors).length === 0) {
      const new_user = {
        email,
        user_name,
        password,
        first_name,
        last_name
      }


      const data = await dispatch(thunkSignup(new_user))
      console.log("data is: ", data)
      if (data) {
        const errorsObj = {}

        for (const error of data) {
          const [name, message] = error.split(" : ")
          errorsObj[name] = message
        }
        return setErrors(errorsObj);
      }

      closeModal();
    }
  }

  return (
    <div className="signup-modal">
      <h1>Sign Up for Top Spots!</h1>

      <form onSubmit={handleSubmit}>
        <FormInput
          input={toInput("First Name", first_name, setFirstName)}
          errorHandler={errorHandler(submit, errors.first_name)}
        />

        <FormInput
          input={toInput("Last Name", last_name, setLastName)}
          errorHandler={errorHandler(submit, errors.last_name)}
        />

        <FormInput
          input={toInput("Email", email, setEmail)}
          errorHandler={errorHandler(submit, errors.email)}
        />

        <FormInput
          input={toInput("Username", user_name, setUsername)}
          errorHandler={errorHandler(submit, errors.user_name)}
        />

        <FormInput
          input={toInput("Password", password, setPassword, "password")}
          errorHandler={errorHandler(submit, errors.password)}
        />

        <FormInput
          input={toInput("Confirm Password", confirmPassword, setConfirmPassword, "password")}
          errorHandler={errorHandler(submit, errors.confirmPassword)}
        />

        <Button text={"Sign Up"} />


      </form>
    </div>


  );
}

export default SignupFormPage;
