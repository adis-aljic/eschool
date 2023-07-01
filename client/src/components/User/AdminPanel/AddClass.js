import { useState, useRef, useContext } from 'react';
import Loader from '../../UI/Loader';
import OpenModal from '../../UI/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from "react-router-dom";
import AuthContex from '../../../store/Auth-ctx';
import "./AboutModal.css"
const AddClass = (props) => {
  const Navigate = useNavigate();
  const ctx = useContext(AuthContex)
  const [enteredSchool, setEnteredSchool] = useState('');
  const [enteredClass, setEnteredClass] = useState('');
  const [enteredDepartmant, setEnteredDepartmant] = useState('');
  const [enteredAbrevation, setEnteredAbrevation] = useState('');
  const [enteredCity, setEnteredCity] = useState('');
  const [inProgress, setInProgress] = useState(false)
  const [isError ,setIsError] = useState(null)
  const [enteredSubject, setEnteredSubject] = useState('');

  const inputSchoolRef = useRef();
  const inputClassRef = useRef();
  const inputDepartmantRef = useRef();
  const inputCityRef = useRef();
  const inputAbbRef = useRef();
  const inputSubjectRef = useRef();

  const subjectHandler = (e) => {
    setEnteredSubject(inputSubjectRef.current.value.toUpperCase());
  };

  const schoolHandler = (e) => {
    setEnteredSchool(inputSchoolRef.current.value.toUpperCase());
  };
  const classHandler = (e) => {
    setEnteredClass(inputClassRef.current.value);
  };
  const departmantHandler = (e) => {
    setEnteredDepartmant(inputDepartmantRef.current.value.toUpperCase());
  };
  const cityHandler = (e) => {
    setEnteredCity(inputCityRef.current.value.toUpperCase());
  };

  const changeAbbHandler = () => {
    setEnteredAbrevation(inputAbbRef.current.value.toUpperCase());
  };
  const registerClassHandler = () => ctx.RegisterClassNavHandler("regClass")

  const addClassHandler = (e) => {
    e.preventDefault();
    if(!enteredSchool || !enteredClass || !enteredCity || !enteredDepartmant ||!enteredSubject || !enteredAbrevation){
      return
    }
    setInProgress(true)
    const school = inputSchoolRef.current.value;
    const city = inputCityRef.current.value;
    const schoolClass = inputClassRef.current.value;
    const departmant = inputDepartmantRef.current.value;
    const abb = inputAbbRef.current.value;
    // fetch('http://localhost:4000/api/classes/createclass', {     
        fetch("https://eschool-pw0m.onrender.com/api/classes/createclass", {      
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        school: `${school.toUpperCase()}`,
        city: `${city.toUpperCase()}`,
        schoolClass: `${schoolClass.toUpperCase()}`,
        departmant: `${departmant}`,
        abbrevation: `${abb.toUpperCase()}`,
        subject : `${enteredSubject.toUpperCase()}`,

      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        if(data.statusCode > 299){
        return  setIsError({
            title: "Warning",
            message : data.message
          })
        }
        setIsError({
          title:"Class is added",
          message: `Class ${data.school}   ${data.schoolClass} - ${data.departmant} 
           is added. Class code : ${data.abbrevation} `
        })
        setEnteredSchool('');
        setEnteredCity('');
        setEnteredClass('');
        setEnteredDepartmant('');
        setEnteredAbrevation('');
        setEnteredSubject("")

      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });

      setInProgress(false)
  };
  const errorHandler = () =>{
    setIsError(null)
  }
  return (
    

<>
<span className="badge rounded-pill text-bg-primary aboutModal" onClick={()=> setIsError({title : "Add class information",
message : <div>1. On the left side, you can find a list of all registered classes.<br></br>
2. You can refresh the list at any moment by clicking the "Refresh" button.<br></br>
3. On the right side, you can add a new class.<br></br>
<ul>
<li>
 - School class should be represented by a single character number from 1 to 9.

</li>
<li>

 - Department should be represented by a single character.
</li>
<li>

 - It is recommended to use the following format for the abbreviation: 2 or 3 letters for school_2 letters for city_class-department. 
 exp. Saobracajna Skola Tuzla 4-1 would be : SS_TZ_4-1
</li>
</ul>
4. After adding a class, you must register it.
<br></br>
<ul>
<li>

 - You can either click on the "Register Class" button or go to the Admin Panel and select "Register Class".
</li>
</ul>
</div>})}>About <svg style={{marginRight: "5%"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
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
      <div className='container'>
        <div className='row'>

  
      <Form onSubmit={addClassHandler}  className='col'>
        <h1 className='headingAdminPanel'>Add new class</h1>
        <Form.Control
         data-toggle="tooltip" data-placement="top" title="Enter name of School"
          type="text"
          name="school"
          placeholder="School"
          size="lg"
          ref={inputSchoolRef}
          value={enteredSchool}
          onChange={schoolHandler}
          maxLength={25}></Form.Control>
        <Form.Control
         data-toggle="tooltip" data-placement="top" title="Enter name of city where is school located"
          type="text"
          size='lg'
          name="city"
          placeholder="City"
          ref={inputCityRef}
          value={enteredCity}
          onChange={cityHandler}
          maxLength={20}></Form.Control>
  
        <Form.Control
                 data-toggle="tooltip" data-placement="top" title="Enter class from 1 to 9"

          type="number"
          name="class"
          min={1}
          max={9}
          placeholder="Class"
          ref={inputClassRef}
          value={enteredClass}
          onChange={classHandler}
          size='lg'
          maxLength={1}></Form.Control>

        <Form.Control
                 data-toggle="tooltip" data-placement="top" title="Enter departmant, only one character"

          type="text"
          name="departmant"
          placeholder="Departmant"
          ref={inputDepartmantRef}
          size='lg'
          value={enteredDepartmant}
          onChange={departmantHandler}
          maxLength={1}></Form.Control>
        <Form.Control
                 data-toggle="tooltip" data-placement="top" title="Enter class code. See about for more information"

          type="text"
          name="abrevation"
          placeholder="Abrevation ex. ETS_2A"
          value={enteredAbrevation}
          onChange={changeAbbHandler}
          size='lg'
          ref={inputAbbRef}></Form.Control>
              <Form.Control
                       data-toggle="tooltip" data-placement="top" title="Enter subject that you teacher"

          type="text"
          name="subject"
          placeholder="Enter subject"
          value={enteredSubject}
          size='lg'
          ref={inputSubjectRef}
          onChange={subjectHandler}></Form.Control>
        <Button type="submit" style={{display:"flex", justifySelf : "center"}}>
          Add new class
        </Button>
      </Form>
        <p>After adding class you must register class, click on button to proceed ... </p> 
        <Button onClick={registerClassHandler}>Register class</Button>
      {inProgress && <Loader />}
      </div>
      </div>
  </>

  

  );
};

export default AddClass;
