import React, { useRef, useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import "./AboutModal.css"
// import { API_KEY } from ' /etc/secrets/firestack.js';
import OpenModal from '../../UI/Modal';
import Loader from '../../UI/Loader';
import Button from 'react-bootstrap/esm/Button';

import {  Navigate } from 'react-router-dom';
import * as filestack from 'filestack-js';
import {API_KEY} from "../../../firestack"
const client = filestack.init(API_KEY);

function UploadFile() {
  const [url, setUrl] = useState("");
  const [enteredTextarea, setEnteredTextarea] = useState("")
  const [eneteredClassCode, setClassCode] = useState("")
  const [ enteredTitle, setEnteredTitle ] = useState("")
  const [inProgress, setInProgress] = useState(false)
  const [isError, setIsError] = useState(null)
  const [classes, setClasses] = useState(JSON.parse(localStorage.getItem("MyClasses")))
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    setInProgress(true)
    // fetch('http://localhost:4000/api/classes/myclasses',{
        fetch("https://eschool-pw0m.onrender.com/api/classes/myclasses", {

      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${user.id}`,
      }),
      headers:{
        'Content-Type': 'application/json',
      },
    })  
    .then((resolve) => resolve.json())
    .then((data) =>{
        localStorage.setItem('MyClasses', JSON.stringify(data));
        setClasses(data);
      });
      setInProgress(false)

  }, [user.id]);

  const textareaRef = useRef()
  const classCodeRef = useRef()
  const inputTitleRef = useRef()
  
  const textAreaHandler =e =>{
      setEnteredTextarea(e.target.value)
    }
  const titleHandler =e =>{
      setEnteredTitle(e.target.value)
    }


const uploadFileHandler = (event) => {
    event.preventDefault();
    const options = {
        maxFiles: 3,
        fromSources : ["local_file_system"],
        // accept: ["image/*",".image/jpeg",".pdf","text/*"],
        // acceptFn: (file, options) => {
        //   const mimeFromExtension = options.mimeFromExtension(file.originalFile.name);
        //   if(options.acceptMime.length && !options.acceptMime.includes(mimeFromExtension)) {
        //     return Promise.reject('Cannot accept that file. Please upload txt, pdf or image file.')
        //   }
        //   return Promise.resolve()
        // },
        uploadInBackground: false,
        onUploadDone: (res) => {
            const url = res.filesUploaded[0].url
            setUrl(url)
        },
    };
    client.picker(options).open()
    
  };

  const handleFormSubmit = e=>{
    e.preventDefault()
    setInProgress(true)

    if(!eneteredClassCode && !enteredTextarea && !enteredTitle ){
      setInProgress(false)
        return setIsError({
          title: "All fields are required!",
          message: "One or more fields are empty"
        })
    }
    const user = JSON.parse(localStorage.getItem("user"))
    if(!classes) {
      setInProgress(false)

      return setIsError({
        title: 'Class code is not valid',
        message: 'Please input correct class code',
      });
    } 
     const schoolClass = classes.filter(x => x.abbrevation === eneteredClassCode.toUpperCase())

    if(schoolClass.length === 0) {
      setInProgress(false)
      return setIsError({
        title: 'Class is not found. ',
        message: 'Please check is class code valid or is class added',
      });
    }
    // fetch("http://localhost:4000/api/news",{
        fetch("https://eschool-pw0m.onrender.com/api/news", {


      method:"POST",
        body : JSON.stringify({
            url : `${url}`,
            text: `${enteredTextarea}`,
            title : `${enteredTitle}`,
            classId : schoolClass[0].id,
            school : schoolClass[0].school,
            schoolClass : schoolClass[0].schoolClass,
            departmant : schoolClass[0].departmant,
            city : schoolClass[0].city,
            user : user
          }),        
      headers: {
        'Content-Type': 'application/json',
      },
        
    })
    .then(resolve => resolve.json())
    .then(data => {

        if(data.statusCode > 299){
         return setIsError({
            title : "Information",
            message : data.message
          })
        }
          setIsError({
            title : "Information",
            message : "News is added"
          })
      }
      ).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });
      
    setClassCode("")
    setEnteredTextarea("")
    setEnteredTitle("")
      
         setInProgress(false)

    }
  const classCodeHandler = e =>{
    e.preventDefault()
    setClassCode(e.target.value)
  }
  const errorHandler = () => {
    setIsError(null);
  };

    

  return (

    <>
    <span class="badge rounded-pill text-bg-primary aboutModal" onClick={()=> setIsError({title : "Add news information",
message : <div>1. On the left side, you can find a list of all registered classes.<br></br>
2. You can refresh the list at any moment by clicking the "Refresh" button.<br></br>
3. On the right side, you can add a new news.<br></br>
<ul>
<li>
 - To add news, enter the class code to which you want to add the news.

</li>
<li>
 - Add news. Please note that news can have a maximum of 400 characters.

</li>
<li>

 - If you want to include a picture with the news, click on the "Upload Additional Files" button.

</li>
</ul>

</div>})}>About <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
  <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
</svg></span>
         {isError && (
        <OpenModal
        show={isError}
          title={isError.title}
          body={isError.message}
          onHide={errorHandler}
        />
      )}
      <Form onSubmit={handleFormSubmit}>
        <h2 className='headingAdminPanel'>Add news</h2>
        <Form.Control          data-toggle="tooltip" data-placement="top" title="Enter class code. See about for more information"
 type='text' size='lg'  ref={classCodeRef} required={true} value={eneteredClassCode} onChange={classCodeHandler} placeholder='Enter Class Code'></Form.Control>
        <Form.Control type='text' size='lg'          data-toggle="tooltip" data-placement="top" title="Enter title for news"
  ref={inputTitleRef} required={true} value={enteredTitle} onChange={titleHandler} placeholder='Enter Title'></Form.Control>
      
        <div className="form-floating">
  <textarea className="form-control" placeholder="Enter news ..." id="floatingTextarea2" 
  maxLength={400}
  value={enteredTextarea}
  onChange={textAreaHandler}
  ref={textareaRef}
  required={true}
style={{height: "15rem"}}
  ></textarea>
            <p for="floatingTextarea2">{enteredTextarea.length}/400</p>
</div>

          <Button style={{display:"flex", justifySelf : "center"}} type="button" onClick={uploadFileHandler}>Upload aditional file</Button>
          <Button type="submit" style={{display:"flex", justifySelf : "center"}}>Confirm</Button>

          {url ? <p>File suscesfully uploaded. Please click Confirm</p> : ""}
 
      </Form>
      {inProgress && <Loader />}

    </>
  );
}

export default UploadFile;
