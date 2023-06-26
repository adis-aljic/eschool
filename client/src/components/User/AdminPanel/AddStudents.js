import { useState, useRef } from 'react';

import Loader from '../../UI/Loader';
import OpenModal from '../../UI/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

const AddStudent = (props) => {
  const Navigate = useNavigate();
  const [enteredFirstName, setEnteredFirstName] = useState('');
  const [enteredLastName, setEnteredLastName] = useState('');
  const [enteredAbrevation, setEnteredAbrevation] = useState('');
  const [enteredAbrevation1, setEnteredAbrevation1] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [message, setEnteredMessage] = useState("");
  const [enteredExistEmail , setEnteredExistEmail] = useState("")
  const [inProgress, setInProgress] = useState(false)
  const [isError, setIsError] = useState(null)

  const inputFirstNameRef = useRef();
  const existEmailRef = useRef();
  const inputLastNameRef = useRef();
  const inputAbrevationRef = useRef();
  const inputAbrevationRef1 = useRef();
  const inputEmailRef = useRef();
  const classes = JSON.parse(localStorage.getItem("MyClasses"))

  const firstNameHandler = (e) => {
    setEnteredFirstName(inputFirstNameRef.current.value);
  };
  const lastNameHandler = (e) => {
    setEnteredLastName(inputLastNameRef.current.value);
  };
  const abrevationHandler = (e) => {
    setEnteredAbrevation(inputAbrevationRef.current.value);
  };
  const abrevationHandler1 = (e) => {
    setEnteredAbrevation1(inputAbrevationRef1.current.value);
  };
  const emailHandler = (e) => {
    setEnteredEmail(inputEmailRef.current.value);
  };
  const existEmailHandler = (e) => {
    setEnteredExistEmail(existEmailRef.current.value);
  };
  const existingStudentHandler = e=>{
    e.preventDefault()
    if(!enteredExistEmail || !enteredAbrevation1){
      setEnteredMessage("All fields must be inputed!")
        setTimeout(() => {
          setEnteredMessage("")
        }, 1000);
      return
    }
    const myClass = classes.filter(classes => classes.abbrevation === enteredAbrevation1)
    console.log(myClass);
    if(myClass.length === 0) {
      setEnteredExistEmail("")
        setEnteredAbrevation1("")
        setIsError({
          title: "Class is not found",
          message : "Please check if you are entered right class code"
        })

        return
      }
    // fetch("http://localhost:4000/api/user/findAndAddStudent",{
      // fetch("https://teacher-aid.onrender.com/api/user/findAndAddStudent", {
        fetch("https://eschool-pw0m.onrender.com/api/user/findAndAddStudent", {

      method : "POST",
      mode : "cors",
      body : JSON.stringify({
        email : enteredExistEmail,
        classId : myClass[0].id
      }),
      headers : {"Content-Type" : "application/json"}
    })
    .then(resolve => resolve.json())
    .then(data => {
      if(data.statusCode > 299){
        setInProgress(false)
      return  setIsError({title: "Error",
      message: `${data.message}`})
      }
      setIsError({title: "User is added",
      message: `Student ${data.firstName} ${data.lastName} is added to class ${enteredAbrevation}`})
    }).catch(error =>{
      setIsError({
        title: "Something went wrong",
        message: error.message
      });
      Navigate("/error")
    });
    setEnteredExistEmail("")
    setEnteredAbrevation1("")
  }

  const addStudentHandler = (e) => {
    e.preventDefault();
    setInProgress(true)
    if(!enteredFirstName || !enteredLastName || !enteredEmail) {
      setInProgress(false)
      setEnteredFirstName("")
        setEnteredLastName("")
        setEnteredAbrevation("")
        setEnteredEmail("")
        setEnteredMessage("All fields must be inputed!")
        setTimeout(() => {
          setEnteredMessage("")
        }, 1000);
      return 
    }
    const myClass = classes.filter(classes => classes.abbrevation === enteredAbrevation.toUpperCase())
    console.log(myClass);
    if(myClass.length === 0) {
      setInProgress(false)
      setEnteredFirstName("")
        setEnteredLastName("")
        setEnteredAbrevation("")
        setEnteredEmail("")
        setIsError({
          title: "Class is not found",
          message : "Please check if you are entered right class code"
        })
      return
    }
    // fetch("https://teacher-aid.onrender.com/api/user/newstudent", {
      
      // fetch('http://localhost:4000/api/user/newstudent', {
          fetch("https://eschool-pw0m.onrender.com/api/user/newstudent", {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        email: `${enteredEmail}`,
        password : "Adis123%",
        // password: `${enteredEmail.slice(0,enteredEmail.indexOf("@"))}_${Math.trunc(Math.random()*10000+1000)}`,
        firstName: `${enteredFirstName}`,
        lastName: `${enteredLastName}`,
        role : "student",
        classId : myClass[0].id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        setEnteredFirstName("")
        setEnteredLastName("")
        setEnteredAbrevation("")
        setEnteredEmail("")
     
        if(data.statusCode > 299){
          setInProgress(false)
        return  setIsError({title: "Error",
        message: `${data.message}`})
        }

        setIsError({title: "User is added",
        message: `Student ${data.firstName} ${data.lastName} is added to class ${enteredAbrevation}`})
      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });

      setInProgress(false)

  };
  const errorHandler = () => setIsError(false)
  return (
    <>
              {isError && (
        <OpenModal
          title={isError.title}
          body={isError.message}
          message={message}
          show={isError}

          onHide={errorHandler}
        />
      )}
      <Form onSubmit={addStudentHandler}>
        <h1>Add new student</h1>
        <Form.Control
          type="text"
          size='lg'
          name="firstName"
          placeholder="First Name"
          ref={inputFirstNameRef}
          value={enteredFirstName}
          onChange={firstNameHandler}
          maxLength={10}></Form.Control>
        <Form.Control
          type="text"
          size='lg'
          name="lastName"
          placeholder="Last name"
          ref={inputLastNameRef}
          value={enteredLastName}
          onChange={lastNameHandler}
          maxLength={20}></Form.Control>

        <Form.Control
          type="email"
          size='lg'
          name="email"
          placeholder="Enter email"
          value={enteredEmail}
          ref={inputEmailRef}
          onChange={emailHandler}></Form.Control>
        <Form.Control
          type="text"
          size='lg'
          name="abrevation"
          placeholder="Enter code for class"
          value={enteredAbrevation}
          ref={inputAbrevationRef}
          onChange={abrevationHandler}></Form.Control>
    
        <Button style={{display:"flex", justifySelf : "center"}} type="submit">Add new student</Button>
      </Form>
      <br></br>

      <div className='row'>
        
       <h1> Add existing student by email </h1>
      </div>
      <br></br>
       <form onSubmit={existingStudentHandler}>
        <Form.Control
        ref={existEmailRef}
        value={enteredExistEmail}
        type='text'
        size='lg'
        onChange={existEmailHandler}
        placeholder='Email'
        ></Form.Control>
        <Form.Control
        ref={inputAbrevationRef1}
        value={enteredAbrevation1}
        type='text'
        size='lg'
        onChange={abrevationHandler1}
        placeholder='Class Code'
        ></Form.Control>
        <Button style={{display:"flex", justifySelf : "center"}} type="submit">Add student</Button>
       </form>
      {inProgress && <Loader />}
    </>

  );
};

export default AddStudent;
