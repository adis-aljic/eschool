import React, { useRef, useState } from 'react';
import ListCurriculum from './ListCurriculum';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";

import OpenModal from '../../UI/Modal';

const Curriculum = () => {
  const [inputText, setInputText] = useState('');
  const [classCode, setClassCode] = useState("")
  const [addedCurriculum, setAddedCurriculum] = useState(false)
  const [isError, setIsError] = useState(null)
  
  const Navigate = useNavigate();
  const textAreaRef = useRef()
  const inputClassCodeRef = useRef()
  const user = JSON.parse(localStorage.getItem("user"))

  const textAreaHandler = () => {
    setInputText(textAreaRef.current.value);
  };
  const classCodeHandler = () =>{
    setClassCode(inputClassCodeRef.current.value)
    }

  const addCurriculumHandler = e =>{
    e.preventDefault()
    console.log(typeof inputText);
    // fetch("http://localhost:4000/api/curriculum/addcurriculum",{
        fetch("https://eschool-pw0m.onrender.com/api/curriculum/addcurriculum", {


        method:"POST",
        body: JSON.stringify({
            userId : user.id,
            classCode : classCode,
            curriculum : inputText
        }),
        mode:"cors",
        headers:{
            'Content-Type': 'application/json',
        }
    })
    .then(resolve => {
      if(resolve.ok){
        console.log("resolve");
        resolve.json()
        setAddedCurriculum(true)
        setTimeout(() => {
          setAddedCurriculum(false)
        }, 1500);
      }else{
        console.log("else");
        return
      }
    }) 
    .then((data) => {
      console.log("Data");
      console.log(data)
    }
     ).catch(error =>{
      setIsError({
        title: "Something went wrong",
        message: error.message
      });
      Navigate("/error")
    });
     setInputText("")
     setClassCode("")
     setAddedCurriculum(false)

  }

if(addedCurriculum){
  setIsError({
    title : "Suscessfull",
    message : "Curriculum is added .."
    
  })
}
  return (
    <>
    {isError && <OpenModal
            show={isError}

    title = {isError.title}
      body = {isError.message}
      onHide = {()=>setIsError(null)}
      />}
    <div className="container">
        <div className="row">
          <div className='col'>

          <h2>Add curriculum</h2>
          <br></br>
    <Form onSubmit={addCurriculumHandler}>
        <Form.Control ref={inputClassCodeRef} size='lg' onChange={classCodeHandler} value={classCode} placeholder="Input classcode"></Form.Control>

      <div class="form-floating">
  <textarea class="form-control" placeholder="Enter curriculum ..." id="floatingTextarea2" 
  value={inputText}
  onChange={textAreaHandler}
  ref={textAreaRef}
  style={{height : "25rem"}}
  ></textarea>
            <p for="floatingTextarea2">{inputText.length} charachters</p>
</div>
      <Button type='submit' style={{display:"flex", justifySelf : "center"}}>Save</Button>
    </Form>
          </div>
        <div className='col'>
          
      <span class="badge rounded-pill text-bg-primary" style={{cursor: "pointer"}} onClick={()=> setIsError({title : "Add curriculum information",
message : <p>1. To add a curriculum, input the class code for the class you wish to add it to.
<br></br>
2. Enter the curriculum in the following format: each lesson should be on a separate line, 
and include the lesson number followed by the name of the lesson. For example:<br></br>
<ul>
<li>
 1. Name of Lesson
</li>
<li>
 2. Name of Lesson
</li>
<li>
 3. Name of Lesson
</li>
 ...
</ul>
 3. On the right side, you will be able to view all your curriculums.
 <br></br>
 4. If you want a monthly plan, click on the "Get Monthly Plan" button. Enter the number of classes per week and the month for which you want the plan.
<br></br>


</p>})} >About <svg style={{marginRight: "5%"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg></span>
    <ListCurriculum></ListCurriculum>

        </div>
      </div>
    </div>
    </>

  );
};

export default Curriculum;
