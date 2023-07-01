import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from "react";
import OpenModal from "../../UI/Modal";
import Accordion from "react-bootstrap/Accordion";
import "./Curriculum.css"
import PdfFormPreview from "../../pdfViewer/PdfFormPreview";
import pdfForm from "../../../assets/pdf_mp.pdf"

import {
  findSchoolYear,
  countWeeksInMonths,
  secondDate,
  getClassesPerMonths,
} from "./functionForCalculatingMonthlyCurriculums";
import { useNavigate } from "react-router-dom";

const ListCurriculum = (props) => {
  const Navigate = useNavigate();
  const [curriculum, setCurriculum] = useState(
    JSON.parse(localStorage.getItem("curriculumList"))
  );
  const [isError, setIsError] = useState(null)
  const [monthlyPlan, setMonthlyPlan] = useState(false);

  const [numberOfClassesPerWeek, setNumberOfClassesPerWeek] = useState(null);
  const [enteredClassCode, setClassCode] = useState("");
  const [pdf, setPdf] = useState(false);
  const [choosenMonth, setChooseMonth] = useState("September");
  const [formData, setFormData] = useState({});
  const [curriculumClassCode,  setCurriculumClassCode] = useState(null)

  const inputNumberOfClassesPerWeekRef = useRef();
  const inputClassCodeRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));
  const classes = JSON.parse(localStorage.getItem("MyClasses"));
// console.log(classes);
  const numberOfClassesPerWeekHandler = (e) => setNumberOfClassesPerWeek(parseInt(e.target.value));
  const classCodeHandler = (e) => setClassCode(e.target.value.toUpperCase());
  const septembarRadioHandler = () => setChooseMonth("September");
  const oktobarRadioHandler = () => setChooseMonth("October");
  const novembarRadioHandler = () => setChooseMonth("November");
  const decembarRadioHandler = () => setChooseMonth("December");
  const januarRadioHandler = () => setChooseMonth("January");
  const februarRadioHandler = () => setChooseMonth("February");
  const martRadioHandler = () => setChooseMonth("Mart");
  const aprilRadioHandler = () => setChooseMonth("April");
  const mayRadioHandler = () => setChooseMonth("May");
  const juneRadioHandler = () => setChooseMonth("June");
    // if(props.showCurriculum){
      
    useEffect(()=>{
      // fetch('http://localhost:4000/api/classes/myclasses', {
        fetch("https://eschool-pw0m.onrender.com/api/classes/myclasses", {

      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${user.id}`,
      }),     
      headers: {
        'Content-Type': 'application/json',
      },
    })  
    .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem('MyClasses', JSON.stringify(data));
        setClasses(data)
      });
      // fetch(`http://localhost:4000/api/curriculum/list`, {
        fetch("https://eschool-pw0m.onrender.com/api/curriculum/list", {
      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        id: `${user.id}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setCurriculum(data);
        localStorage.setItem("curriculumList", JSON.stringify(data));
      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });
    },[]
    
  ) 

  const monthlyPlanHandler = (e) => {
    setMonthlyPlan(true);
    setPdf(false);
    setCurriculumClassCode(e.target.value)
    setClassCode(e.target.value.toUpperCase())
  };
  const monthlyPlanCloseHandler = () => setMonthlyPlan(false);
  const deleteCurriculumHandler = (e) => {

    e.preventDefault()
    // const id = 
    // console.log(JSON.parse(e.target.value));
    // fetch(`http://localhost:4000/api/curriculum/deleteCurriculum`, {
      fetch("https://eschool-pw0m.onrender.com/api/curriculum/deleteCurriculum", {
        mode: "cors",
        method: "POST",
        body: JSON.stringify({
          id: e.target.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(resolve => resolve.json())
      .then(data =>{
        // console.log(data);

        return setIsError({
          title : "Susscess",
          message : `Curriculum is deleted`
        })
      })
  }
  const onSubmitMonthlyPlanHandler = async (e) => {
    e.preventDefault();
    console.log(curriculum);
    console.log( classes)
    monthlyPlanCloseHandler();
    setPdf(true);
    const year1 = findSchoolYear().year1;
    const year2 = findSchoolYear().year2;
    const schoolCalendar = countWeeksInMonths(year1, year2);
    
    const week1 = countWeeksInMonths(year1, year2).find(
      ({ month }) => month === choosenMonth
    ).startDates[0];
    const week2 = countWeeksInMonths(year1, year2).find(
      ({ month }) => month === choosenMonth
    ).startDates[1];
    const week3 = countWeeksInMonths(year1, year2).find(
      ({ month }) => month === choosenMonth
      ).startDates[2];
      const week4 = countWeeksInMonths(year1, year2).find(
        ({ month }) => month === choosenMonth
        ).startDates[3];
        const week5 = countWeeksInMonths(year1, year2).find(
          ({ month }) => month === choosenMonth
          ).startDates[4];
          const date1 = secondDate(week1)
          ? `${week1} - ${secondDate(week1)}`
      : undefined;
    const date2 = secondDate(week2)
      ? `${week2} - ${secondDate(week2)}`
      : undefined;
    const date3 = secondDate(week3)
      ? `${week3} - ${secondDate(week3)}`
      : undefined;
      const date4 = secondDate(week4)
      ? `${week4} - ${secondDate(week4)}`
      : undefined;
    const date5 = secondDate(week5)
    ? `${week5} - ${secondDate(week5)}`
    : undefined;
    console.log(curriculum);
    
    const currentCurriculum = curriculum.filter(({classCode})=> classCode === enteredClassCode);
    const currentClass = classes.filter((x) => x.abbrevation === enteredClassCode)
    const classesPerMonths = getClassesPerMonths(
      currentCurriculum[0].curriculum,
      schoolCalendar,
      numberOfClassesPerWeek,
      choosenMonth
      );
      const data = {
        month: choosenMonth,
        school: currentClass[0].school,
        subjec: currentClass[0].subject
        ,
        teacher: `${user.firstName} ${user.lastName}`,
      schoolClass: `${
        currentClass[0].schoolClass
      } ${currentClass[0].departmant}`,
      year1: year1.toString(),
      year2: year2.toString(),
      date1,
      date2,
      date3,
      date4,
      date5,
      // text1: classesPerMonths.slice(0, numberOfClassesPerWeek),
      text1Line1 : classesPerMonths.slice(0, numberOfClassesPerWeek)[0],
      text1Line2 : classesPerMonths.slice(0, numberOfClassesPerWeek)[1],
      text1Line3 : classesPerMonths.slice(0, numberOfClassesPerWeek)[2],
      text1Line4 : classesPerMonths.slice(0, numberOfClassesPerWeek)[3],
      // text2: classesPerMonths
        // .slice(numberOfClassesPerWeek, numberOfClassesPerWeek * 2),
        text2Line1 : classesPerMonths
        .slice(numberOfClassesPerWeek, numberOfClassesPerWeek * 2)[0],
        text2Line2 : classesPerMonths
        .slice(numberOfClassesPerWeek, numberOfClassesPerWeek * 2)[1],
        text2Line3 : classesPerMonths
        .slice(numberOfClassesPerWeek, numberOfClassesPerWeek * 2)[2],
        text2Line4 : classesPerMonths
        .slice(numberOfClassesPerWeek, numberOfClassesPerWeek * 2)[3],
        // text3: classesPerMonths
        // .slice(numberOfClassesPerWeek * 2, numberOfClassesPerWeek * 3),
        text3Line1 : classesPerMonths
        .slice(numberOfClassesPerWeek * 2, numberOfClassesPerWeek * 3)[0],
        text3Line2 : classesPerMonths
        .slice(numberOfClassesPerWeek * 2, numberOfClassesPerWeek * 3)[1],
        text3Line3 : classesPerMonths
        .slice(numberOfClassesPerWeek * 2, numberOfClassesPerWeek * 3)[2],
        text3Line4 : classesPerMonths
        .slice(numberOfClassesPerWeek * 2, numberOfClassesPerWeek * 3)[3],
        // text4: classesPerMonths
        // .slice(numberOfClassesPerWeek * 3, numberOfClassesPerWeek * 4),
        text4Line1 : classesPerMonths
        .slice(numberOfClassesPerWeek * 3, numberOfClassesPerWeek * 4)[0],
        text4Line2 : classesPerMonths
        .slice(numberOfClassesPerWeek * 3, numberOfClassesPerWeek * 4)[1],
        text4Line3 : classesPerMonths
        .slice(numberOfClassesPerWeek * 3, numberOfClassesPerWeek * 4)[2],
        text4Line4 : classesPerMonths
        .slice(numberOfClassesPerWeek * 3, numberOfClassesPerWeek * 4)[3],
        // text5: classesPerMonths
        // .slice(numberOfClassesPerWeek * 4, numberOfClassesPerWeek * 5),
        text5Line1 : classesPerMonths
        .slice(numberOfClassesPerWeek * 4, numberOfClassesPerWeek * 5)[0],
        text5Line2 : classesPerMonths
        .slice(numberOfClassesPerWeek * 4, numberOfClassesPerWeek * 5)[1],
        text5Line3 : classesPerMonths
        .slice(numberOfClassesPerWeek * 4, numberOfClassesPerWeek * 5)[2],
        text5Line4 : classesPerMonths
        .slice(numberOfClassesPerWeek * 4, numberOfClassesPerWeek * 5)[3],
    };
    setFormData(data);
    setCurriculumClassCode(null)
    console.log(data);
  };

  const pdfHandler = () => {
    setPdf(false);
  };
  const closeModalHandler = () => {setIsError(null)}
  return (
    <div >
      
      {isError && <OpenModal
      title = {isError.title}
      body = {isError.message}
      show = {isError}
      onHide ={closeModalHandler}
      ></OpenModal>}
      {monthlyPlan && !pdf && (
        <OpenModal
        
          title="Monthly plan"
          onHide={monthlyPlanCloseHandler}
          // message = {isError.message}
          show={monthlyPlan}
        body = {      
          <Form onSubmit={onSubmitMonthlyPlanHandler} className="form " >
       

                <Form.Control
                  type="number"
                  min={1}
                  max={4}
            size='lg'
                  ref={inputNumberOfClassesPerWeekRef}
                  value={numberOfClassesPerWeek}
                  required={true}
                  onChange={numberOfClassesPerWeekHandler}
                  placeholder="Number of classes/week"
                  data-toggle="tooltip" data-placement="top" title="Number of classes you have per week"

                ></Form.Control>
                <Form.Control
                            data-toggle="tooltip" data-placement="top" title="Class code for current curriculum"

            size='lg'
                  ref={inputClassCodeRef}
                  value={curriculumClassCode}
                  required={true}
                  onChange={classCodeHandler}
                  placeholder="Class code"
                ></Form.Control>
           
                
          <div className="mb-3 container monthlyPlan">
            <div className='row'>
              <div className='col-md-6'>

          <Form.Check 
            type="radio"
            label="Septembar"
            checked={true}
            onChange={septembarRadioHandler}
            name='chooseMonth'
            size="sm"
            />
      
          <Form.Check 
            type="radio"
            label="October"
            onChange={oktobarRadioHandler}
            name='chooseMonth'
            size="sm"
            />

          <Form.Check 
            type="radio"
            label="November"
            onChange={novembarRadioHandler}
            name='chooseMonth'
            size="sm"
            />
          <Form.Check 
            type="radio"
            label="December"
            onChange={decembarRadioHandler}
            name='chooseMonth'
            size="sm"
          />
          <Form.Check 
            type="radio"
            label="January"
            onChange={januarRadioHandler}
            name='chooseMonth'
            size="sm"
          />
            </div>
            <div className='col-md-6'>

          <Form.Check 
            type="radio"
            label="February"
            onChange={februarRadioHandler}
            name='chooseMonth'
            size="sm"
            />
          <Form.Check 
            type="radio"
            label="Mart"
            onChange={martRadioHandler}
            name='chooseMonth'
            size="sm"
            />
          <Form.Check 
            type="radio"
            label="April"
            onChange={aprilRadioHandler}
            name='chooseMonth'
            size="sm"
            />
          <Form.Check 
            type="radio"
            label="May"
            onChange={mayRadioHandler}
            name='chooseMonth'
            size="sm"
          />
          <Form.Check 
            type="radio"
            label="June"
            onChange={juneRadioHandler}
            name='chooseMonth'
            size="sm"
          />

            </div>
</div>

        </div>
  
              
              
                  
      
              <Button type="submit">Preview</Button>
          </Form>
            }>
        </OpenModal>
      )}
      
      <div>
        {pdf ? (
          <PdfFormPreview
            onClick={pdfHandler}
            pdfUrl={pdfForm}
            formData={formData}
          ></PdfFormPreview>
        ) : (
          <Accordion
       
          >
            {curriculum &&
              curriculum.map((curriculumItem) => {
                return (
                  <Accordion.Item  eventKey={curriculumItem.id} style={{maxHeight: "50vh", overflowY : "scroll"}}>
                    <Accordion.Header>
                      <h3>{curriculumItem.classCode}</h3>
                    </Accordion.Header>
                    <Accordion.Body >
                      {classes &&
                        classes.map((SchoolClass) => {
                          return (
                            <div >
                              {SchoolClass.abbrevation ===
                              curriculumItem.classCode ? (
                                <li
                                  key={SchoolClass.id}
                                >
                                  <h4>School Class Information</h4>
                                  <br></br>
                                  School : {SchoolClass.school}
                                  <br></br>
                                  City : {SchoolClass.city}
                                  <br></br>
                                  Class Code : {SchoolClass.abbrevation}
                                  <br></br>
                                  School Class : {
                                    SchoolClass.schoolClass
                                  } - {SchoolClass.departmant}
                                </li>
                              ) : null}
                            </div>
                          );
                        })}
                      <div className="CurriculumList">
                        <br></br>
                        <h4>Curriculum</h4>
                        <br></br>

                        {curriculumItem.curriculum
                          .replaceAll("\t", " ")
                          .split("\n")
                          .map((item) => {
                            return <li key={item.id}>{item}</li>;
                          })}
                          <div className='curriculumButtons'>

                        <Button onClick={monthlyPlanHandler} value={curriculumItem.classCode}>
                          Get monthly plan
                        </Button>
                        <Button value={curriculumItem.id} onClick={deleteCurriculumHandler}>Delete curriculum</Button>
                          </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })}
          </Accordion>
        )}
      </div>
      
    </div>
  );
};
export default ListCurriculum;
