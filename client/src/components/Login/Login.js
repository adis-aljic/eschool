import { useContext, useRef, useState } from "react";
import "./Login.css";
import validatePassword from "./passwordValidation";
import OpenModal from "../UI/Modal";
import Button from "../UI/Button";
import AuthContex from "../../store/Auth-ctx";
import "cors";
import { useNavigate } from "react-router-dom";

import Loader from "../UI/Loader";

const Login = (props) => {
  const Navigate = useNavigate();
  const ctx = useContext(AuthContex);
  const [isError, setIsError] = useState(null);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredRegEmail, setEnteredRegEmail] = useState("");
  const [enteredRegPassword, setEnteredRegPassword] = useState("");
  const [enteredFirstName, setEnteredFirstName] = useState("");
  const [enteredLastName, setEnteredLastName] = useState("");
  const [forgotPass, setForgotPass] = useState(false);
  const [inputEmailForgetEmail, setInputEmailForgetEmail] = useState("");
  const [recievedNewPass, setRecievedNewPass] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const inputedEmail = useRef();
  const inputedPassword = useRef();
  const inputedRegEmail = useRef();
  const inputedRegPassword = useRef();
  const inputedFirstName = useRef();
  const inputedLastName = useRef();
  const inputedForgetPassEmailRef = useRef();

  const emailChangeHandler = () => setEnteredEmail(inputedEmail.current.value);

  const passwordChangeHandler = () =>
    setEnteredPassword(inputedPassword.current.value);

  const emailRegChangeHandler = () =>
    setEnteredRegEmail(inputedRegEmail.current.value);

  const passwordRegChangeHandler = () =>
    setEnteredRegPassword(inputedRegPassword.current.value);

  const firstNameChangeHandler = () =>
    setEnteredFirstName(inputedFirstName.current.value);

  const lastNameChangeHandler = () =>
    setEnteredLastName(inputedLastName.current.value);



  const forgotPasswordHandler = () => setForgotPass(true);

  const clearForgetenPasswordHandler = () => setForgotPass(false);

  const forgetPassEmailHandler = (e) =>
    setInputEmailForgetEmail(inputedForgetPassEmailRef.current.value);

  const errorHandler = () => setIsError(null);

  const onRegistredSubmitHandler = (e) => {
    e.preventDefault();
    setInProgress(true);
    const email = inputedRegEmail.current.value;
    const password = inputedRegPassword.current.value;
    const first_name = inputedFirstName.current.value;
    const last_name = inputedLastName.current.value;
    if (!email.includes("@")) {
      setIsError({
        title: "Email is not valid",
        message: "Please input correct email",
      });
      setInProgress(false);
      return;
    }
    if (first_name.length < 2 && last_name.length < 2) {
      setInProgress(false);
      setIsError({
        title: "Invalid data format",
        message: "First and Last name must be at least three characters long",
      });
      return;
    }

    if (!validatePassword(password)) {
      setInProgress(false);
      setIsError({
        title: "Invalid password format",
        message:
          "Password must contain one capital letter, one special character, one number and at least 8 characters",
      });
      return;
    }
    // fetch("http://localhost:4000/api/user/newuser", {
      fetch("https://eschool-pw0m.onrender.com/api/user/newuser", {

      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
        firstName: `${first_name}`,
        lastName: `${last_name}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        ctx.onRegistred(data);
    
        console.log(data);
      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });
;
    setEnteredRegEmail("");
    setEnteredFirstName("");
    setEnteredLastName("");
    setEnteredRegPassword("");
    setIsError({
      title: "Account created",
      message:
        "You account is suscesfuly created. You will recieved email with confirmation email. After confirmination you will be able to log in.",
    });
    setInProgress(false);
  };

  const onLoginSubmitHandler = (e) => {
    e.preventDefault();
    setInProgress(true);

    const email = inputedEmail.current.value;
    const password = inputedPassword.current.value;
    if (!email.includes("@")) {
      setInProgress(false);

      setIsError({
        title: "Email is not valid",
        message: "Please input correct email",
      });
      return;
    }

    if (!validatePassword(password)) {
      setInProgress(false);

      setIsError({
        title: "Invalid password format",
        message:
          "Password must contain one capital letter, one special character, one number and at least 8 characters",
      });
      return;
    }
    setTimeout(() => {
      

    // fetch("http://localhost:4000/api/user/login", {
        fetch("https://eschool-pw0m.onrender.com/api/user/login", {

      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        ctx.onLogin(data);
          setIsError({title : data.title,
                    message : data.message})
        
        if (data.isAuth && data.role === "teacher") {
          Navigate("/home");
        }
        else if(data.isAuth && data.role === "student"){
          Navigate("/student")
        }
        
      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });;

    }, 500);


    setEnteredEmail("");
    setEnteredPassword("");
    setInProgress(false);
  };

  const forgottenPassworOnSubmitdHandler = (e) => {
    e.preventDefault();
    setInProgress(true);
    // fetch("http://localhost:4000/api/user/forgetenpassword", {
        fetch("https://eschool-pw0m.onrender.com/api/user/forgetenpassword", {

      
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        email: `${inputEmailForgetEmail}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        setRecievedNewPass(true);
        setIsError({
          title: "Suscess ...",
          message: data.message
        });
      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });

    setForgotPass(false);
    setInputEmailForgetEmail("");
    setInProgress(false);
  };
  const clearRecievedNewPass = () => {
    setRecievedNewPass(false);
  };
  return (
    <>
      {recievedNewPass && (
        <OpenModal
        show={recievedNewPass}
          title={"Pasword Recovered"}
          body={"Please check your new password in email!"}
          onHide={clearRecievedNewPass}
        ></OpenModal>
      )}
      {forgotPass && (
        <OpenModal
        show={forgotPass}
          title={"Forgoten password"}
          message={"After you enter your new email and new password you will recieved email with password"}
          onHide={clearForgetenPasswordHandler}
         body ={

           <form onSubmit={forgottenPassworOnSubmitdHandler}>
           <input
           placeholder="email"
           type="email"
           value={inputEmailForgetEmail}
           ref={inputedForgetPassEmailRef}
           onChange={forgetPassEmailHandler}
           ></input>
            <Button type="submit">Send</Button>
          </form>
          }
        >
        </OpenModal>
      )}
      {isError && (
        <OpenModal
          title={isError.title}
          body={isError.message}
          onHide={errorHandler}
          show={isError}
        />
      )}
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true"></input>

        <div className="signup">
          <form onSubmit={onRegistredSubmitHandler}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>

            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={inputedRegEmail}
              value={enteredRegEmail}
              onChange={emailRegChangeHandler}
            ></input>
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              ref={inputedFirstName}
              value={enteredFirstName}
              onChange={firstNameChangeHandler}
            ></input>
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              ref={inputedLastName}
              value={enteredLastName}
              onChange={lastNameChangeHandler}
            ></input>
       
            <input
              type="password"
              name="pswd"
              placeholder="Password"
              ref={inputedRegPassword}
              value={enteredRegPassword}
              onChange={passwordRegChangeHandler}
            ></input>
            <Button type="submit">Sign up</Button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={onLoginSubmitHandler}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="e-mail"
              name="e-mail"
              placeholder="Email"
              ref={inputedEmail}
              value={enteredEmail}
              onChange={emailChangeHandler}
            ></input>
            <input
              ref={inputedPassword}
              type="password"
              name="password"
              placeholder="Password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
            ></input>
            <Button type="submit">Login</Button>
          </form>
          <button onClick={forgotPasswordHandler} className="forget_pass">
            Forgot password ?
          </button>
        </div>
        {inProgress && <Loader />}
      </div>
    </>
  );
};

export default Login;
