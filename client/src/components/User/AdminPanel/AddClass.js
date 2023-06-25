import { useState, useRef } from 'react';
import Loader from '../../UI/Loader';
import OpenModal from '../../UI/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';

const AddClass = (props) => {
  const [enteredSchool, setEnteredSchool] = useState('');
  const [enteredClass, setEnteredClass] = useState('');
  const [enteredDepartmant, setEnteredDepartmant] = useState('');
  const [enteredAbrevation, setEnteredAbrevation] = useState('');
  const [enteredCity, setEnteredCity] = useState('');
  const [enteredAbbCity, setEnteredAbbCity] = useState('');
  const [inProgress, setInProgress] = useState(false)
  const [isError ,setIsError] = useState(null)
  const [enteredSubject, setEnteredSubject] = useState('');

  const inputSchoolRef = useRef();
  const inputClassRef = useRef();
  const inputDepartmantRef = useRef();
  const inputCityRef = useRef();
  const inputCityAbbRef = useRef();
  const inputAbbRef = useRef();
  const inputSubjectRef = useRef();

  const subjectHandler = (e) => {
    setEnteredSubject(inputSubjectRef.current.value);
  };

  const schoolHandler = (e) => {
    setEnteredSchool(inputSchoolRef.current.value);
  };
  const classHandler = (e) => {
    setEnteredClass(inputClassRef.current.value);
  };
  const departmantHandler = (e) => {
    setEnteredDepartmant(inputDepartmantRef.current.value);
  };
  const cityHandler = (e) => {
    setEnteredCity(inputCityRef.current.value);
  };
  const cityAbbHandler = (e) => {
    setEnteredAbbCity(inputCityAbbRef.current.value);
  };

  const changeAbbHandler = () => {
    setEnteredAbrevation(inputAbbRef.current.value);
  };

  const addClassHandler = (e) => {
    e.preventDefault();
    if(!enteredSchool || !enteredClass || !enteredAbbCity || !enteredCity || !enteredDepartmant ||!enteredSubject || !enteredAbrevation){
      return
    }
    setInProgress(true)
    const school = inputSchoolRef.current.value;
    const city = inputCityRef.current.value;
    const cityAbb = inputCityAbbRef.current.value;
    const schoolClass = inputClassRef.current.value;
    const departmant = inputDepartmantRef.current.value;
    const abb = inputAbbRef.current.value;
    fetch('http://localhost:4000/api/classes/createclass', {     
      //  fetch("https://teacher-aid.onrender.com/api/classes/createclass", {

      
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        school: `${school.toUpperCase()}`,
        city: `${city.toUpperCase()}`,
        cityAbb: `${cityAbb.toUpperCase()}`,
        schoolClass: `${schoolClass.toUpperCase()}`,
        departmant: `${departmant}`,
        abbrevation: `${abb}`,
        subject : `${enteredSubject.toUpperCase()}`,

      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        setIsError({
          title:"Class is added",
          message: `Class ${data.school}   ${data.schoolClass} - ${data.departmant} 
           is added. Class code : ${data.abbrevation} `
        })
        setEnteredSchool('');
        setEnteredCity('');
        setEnteredAbbCity('');
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
{isError && (
        <OpenModal
          title={isError.title}
          body={isError.message}
          onHide={errorHandler}
        />
      )}    
      <div className='container'>
        <div className='row'>

  
      <Form onSubmit={addClassHandler}  className='col'>
        <h1>Add new class</h1>
        <Form.Control
          type="text"
          name="school"
          placeholder="School"
          size="lg"
          ref={inputSchoolRef}
          value={enteredSchool}
          onChange={schoolHandler}
          maxLength={22}></Form.Control>
        <Form.Control
          type="text"
          size='lg'
          name="city"
          placeholder="City"
          ref={inputCityRef}
          value={enteredCity}
          onChange={cityHandler}
          maxLength={20}></Form.Control>
        <Form.Control
        size='lg'
          type="text"
          name="city_abb"
          placeholder="City(2 Letters)"
          ref={inputCityAbbRef}
          value={enteredAbbCity}
          onChange={cityAbbHandler}
          maxLength={2}></Form.Control>

        <Form.Control
          type="text"
          name="class"
          placeholder="Class"
          ref={inputClassRef}
          value={enteredClass}
          onChange={classHandler}
          size='lg'
          maxLength={1}></Form.Control>

        <Form.Control
          type="text"
          name="departmant"
          placeholder="Departmant"
          ref={inputDepartmantRef}
          size='lg'
          value={enteredDepartmant}
          onChange={departmantHandler}
          maxLength={1}></Form.Control>
        <Form.Control
          type="text"
          name="abrevation"
          placeholder="Abrevation ex. ETS_2A"
          value={enteredAbrevation}
          onChange={changeAbbHandler}
          size='lg'
          ref={inputAbbRef}></Form.Control>
              <Form.Control
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
      {inProgress && <Loader />}
      </div>
      </div>
  </>

  

  );
};

export default AddClass;
