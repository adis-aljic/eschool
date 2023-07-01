import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Loader from '../../UI/Loader';
import OpenModal from '../../UI/Modal';
import styles from "./AdminPanel.module.css"
import "./AboutModal.css"
import { useNavigate } from "react-router-dom";
const RegistrerClass = () => {
  const [searchSchool, setSearchSchool] = useState('');
  const [filteredSchool, setFilteredSchool] = useState([]);
  const [enteredClassCode, setEneteredClassCode] = useState('');
  const classCodeRef = useRef();
  const [text, setText] = useState('');
  const [myClasses, setMyClasses] = useState(JSON.parse(localStorage.getItem("classList")))
  const [inProgress, setInProgress] = useState(false)
  const [isError, setIsError] = useState(null)
  
  const Navigate = useNavigate();
  useEffect(()=>{
    // fetch("http://localhost:4000/api/classes/list") 
        fetch("https://eschool-pw0m.onrender.com/api/classes/list")

    .then(resolve => resolve.json())
    .then(data => {
      console.log(data);
      setMyClasses(data)
      localStorage.setItem("classList", JSON.stringify(data))

    }
    
    )
  },[])
  const classCodeHandler = () => {
    setEneteredClassCode(classCodeRef.current.value.toUpperCase());
  };
  const errorHandler = () =>{
    setIsError(null)
  }
  const onSubmitRegistrerClassHandler = (e) => {
    e.preventDefault();
    setInProgress(true)
    if (!enteredClassCode) {
      setInProgress(false)
      setIsError({
        title: "Class code is not entered",
        message: "Please enter class code"
      })
      return
      
    }
    const result = myClasses.find((classItem) => classItem.abbrevation === enteredClassCode.toUpperCase());
    if(!result) {
      setInProgress(false)
      setIsError({
        title: "School is not found.",
        message: "Please enter valid school code or check if school is added  "
      })
      return    }
    const user = JSON.parse(localStorage.getItem('user'));
    // fetch('http://localhost:4000/api/classes/addclass', {
        fetch("https://eschool-pw0m.onrender.com/api/classes/addclass", {


      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${result.id}`,
      }),
      headers: {
        'Content-Type': 'application/json',
        auth: `${user.token}`,
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        setIsError({
          title:"Class is registred",
          message: `Class ${data.abbrevation} is registred.`
            
        })
      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });
      setInProgress(false)
      setEneteredClassCode("")
  };

  const searchSchoolHandler = (e) => {
    e.preventDefault();
    console.log(myClasses);
    setSearchSchool(e.target.value.toUpperCase());
    if(e.target.value === ""){
      setText("")
    }
    const found = myClasses.filter((schoolClass) =>
      schoolClass.school.includes(searchSchool)
    );
    setFilteredSchool(found);

    if (found.length === 0) {
      setText('School not found. Try again !!!');
    }
    if (searchSchool.length < 2 && filteredSchool.length === 0) {
      setText('');
      setFilteredSchool([]);
    }
  };
  return (
    < >
    
    <span class="badge rounded-pill text-bg-primary aboutModal"  onClick={()=> setIsError({title : "Register Class information",
message : <div>1. On the left side, you can find a list of all registered classes.<br></br>
2. You can refresh the list at any moment by clicking the "Refresh" button.<br></br>
3. On the right side, you can register class.<br></br>
<ul>
<li>
 - To register a class, type the class code in the designated field and click on the button to register it.

</li>
<li>
 - If you are unsure about the class code, you can search for it. In the search bar, enter at least three characters to see the search results.

</li>

</ul>

</div>})}>About <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
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
      <br></br>
    <div className='container'>
      <div className='row'>
        <div className='col'>

 

      <h1 className='headingAdminPanel'>Register class</h1>
      <br></br>
      <Form.Control
        type="search"
        size='lg'
        className='bg-info text-light
                         data-toggle="tooltip" data-placement="top" title="Enter class code for class where you want add student"

        '                     
            data-toggle="tooltip" data-placement="top" title="Search for all added class or schools"

        value={searchSchool}
        onChange={searchSchoolHandler}
        placeholder="Search ..."></Form.Control>
        <ul className={styles.listFilteredSchool}>
      {filteredSchool.length > 0 ? (
        filteredSchool.map((x) => (
            <li key={x.id} className={styles.filteredSchool}>
              {x.school}
              <br></br>
              {x.schoolClass} - {x.departmant}
              <br></br>
              {x.abbrevation}
            </li>
        ))
        ) 
        : (
          <p>{text} </p>
          )}
          </ul>
          <br></br>
          <br></br>
      <Form onSubmit={onSubmitRegistrerClassHandler}>
        <Form.Control
          type="text"
          size='lg'
          name="classCode"
          placeholder="Class Code"
          ref={classCodeRef}
          data-toggle="tooltip" data-placement="top" title="Enter class code for class which you want register "

          value={enteredClassCode}
          onChange={classCodeHandler}></Form.Control>
        <Button  type="submit" style={{display:"flex", justifySelf : "center"}}>Register Class</Button>
      </Form>
      {inProgress && <Loader />}

      </div>
      </div>
         </div>
    </>
  );
};
export default RegistrerClass;

