import { useRef, useState, useEffect } from 'react';
// import Button from '../../UI/Button';
import Button from 'react-bootstrap/esm/Button';
import Card from '../../UI/Card';
import Form from 'react-bootstrap/Form';
import Loader from '../../UI/Loader';
import OpenModal from '../../UI/Modal';
import styles from "./AdminPanel.module.css"
const RegistrerClass = () => {
  const [searchSchool, setSearchSchool] = useState('');
  const [filteredSchool, setFilteredSchool] = useState([]);
  const [enteredClassCode, setEneteredClassCode] = useState('');
  const classCodeRef = useRef();
  const [text, setText] = useState('');
  const [myClasses, setMyClasses] = useState(JSON.parse(localStorage.getItem("classList")))
  const [inProgress, setInProgress] = useState(false)
  const [isError, setIsError] = useState(null)
  useEffect(()=>{
    // fetch("http://localhost:4000/api/classes/list") 
        //  fetch("https://teacher-aid.onrender.com/api/classes/list")
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
    setEneteredClassCode(classCodeRef.current.value);
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
    fetch('http://localhost:4000/api/classes/addclass', {
      // fetch("https://teacher-aid.onrender.com/api/classes/addclass", {

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
         {isError && (
        <OpenModal
          title={isError.title}
          body={isError.message}
          onConfirm={errorHandler}
        />
      )}
    <div className='container'>
      <div className='row'>
        <div className='col'>

 

      <h1>Register class</h1>
      <Form.Control
        type="search"
        size='lg'
        className='bg-primary text-light

        '
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
      <Form onSubmit={onSubmitRegistrerClassHandler}>
        <Form.Control
          type="text"
          size='lg'
          name="classCode"
          placeholder="Class Code"
          ref={classCodeRef}
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

