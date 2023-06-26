import React, { useRef, useState } from 'react';
import ListCurriculum from './ListCurriculum';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import OpenModal from '../../UI/Modal';
const Curriculum = () => {
  const [inputText, setInputText] = useState('');
  const [classCode, setClassCode] = useState("")
  const [addedCurriculum, setAddedCurriculum] = useState(false)
  const [isError, setIsError] = useState(null)

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
      // fetch("https://teacher-aid.onrender.com/api/curriculum/addcurriculum", {
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
    <ListCurriculum></ListCurriculum>

        </div>
      </div>
    </div>
    </>

  );
};

export default Curriculum;
