import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useRef, useState } from "react";
import OpenModal from "../../UI/Modal";
import Accordion from "react-bootstrap/Accordion";
import "./Curriculum.css"
import PdfFormPreview from "../../pdfViewer/PdfFormPreview";
// import pdfForm from "./Monthly_plan_form.pdf";
// import pdfFile from "..\..\..\src\assets\monthly_plan_10m.pdf"
import {
  findSchoolYear,
  countWeeksInMonths,
  secondDate,
  getClassesPerMonths,
} from "./functionForCalculatingMonthlyCurriculums";

const ListCurriculum = (props) => {
  const [curriculum, setCurriculum] = useState(
    JSON.parse(localStorage.getItem("curriculumList"))
  );
  const [monthlyPlan, setMonthlyPlan] = useState(false);
  const [enteredSept, setEnteredSept] = useState("");
  const [enteredOkt, setEnteredOkt] = useState("");
  const [enteredNov, setEnteredNov] = useState("");
  const [enteredDec, setEnteredDec] = useState("");
  const [enteredJan, setEnteredJan] = useState("");
  const [enteredFeb, setEnteredFeb] = useState("");
  const [enteredMart, setEnteredMart] = useState("");
  const [enteredApr, setEnteredApr] = useState("");
  const [enteredMay, setEnteredMay] = useState("");
  const [enteredJune, setEnteredJune] = useState("");
  const [numberOfClassesPerWeek, setNumberOfClassesPerWeek] = useState(null);
  const [classCode, setClassCode] = useState("");
  const [pdf, setPdf] = useState(false);
  const [choosenMonth, setChooseMonth] = useState("September");
  const [formData, setFormData] = useState({});

  const inputNumberOfClassesPerWeekRef = useRef();
  const inputClassCodeRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));
  const classes = JSON.parse(localStorage.getItem("MyClasses"));

  const numberOfClassesPerWeekHandler = (e) => setNumberOfClassesPerWeek(parseInt(e.target.value));
  const classCodeHandler = (e) => setClassCode(e.target.value);
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

  useEffect(() => {
    // fetch(`http://localhost:4000/api/curriculum/list`, {
      fetch("https://teacher-aid.onrender.com/api/curriculum/list", {

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
        console.log("fetchano");
        localStorage.setItem("curriculumList", JSON.stringify(data));
      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });
  }, []);

  const monthlyPlanHandler = () => {
    setMonthlyPlan(true);
    setPdf(false);
  };
  const monthlyPlanCloseHandler = () => setMonthlyPlan(false);

  const onSubmitMonthlyPlanHandler = async (e) => {
    e.preventDefault();
    monthlyPlanCloseHandler();
    setPdf(true);
    const year1 = findSchoolYear().year1;
    const year2 = findSchoolYear().year2;
    const schoolCalendar = countWeeksInMonths(year1, year2);
    console.log(choosenMonth);
    console.log(schoolCalendar);
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
    const currentCurriculum = curriculum.find(
      ({ classCode }) => classCode === classCode
    );
    const classesPerMonths = getClassesPerMonths(
      currentCurriculum.curriculum,
      schoolCalendar,
      numberOfClassesPerWeek,
      choosenMonth
    );
    console.log(classesPerMonths);
    const data = {
      month: choosenMonth,
      school: classes.find((x) => x.abbrevation === classCode).school,
      subjec: user.subject,
      teacher: `${user.firstName} ${user.lastName}`,
      schoolClass: `${
        classes.find((x) => x.abbrevation === classCode).schoolClass
      } ${classes.find((x) => x.abbrevation === classCode).departmant}`,
      year1: year1.toString(),
      year2: year2.toString(),
      date1,
      date2,
      date3,
      date4,
      date5,
      text1: classesPerMonths.slice(0, numberOfClassesPerWeek).join(" "),
      textarea_33cfnu: classesPerMonths
        .slice(numberOfClassesPerWeek, numberOfClassesPerWeek * 2)
        .join(" "),
      text3: classesPerMonths
        .slice(numberOfClassesPerWeek * 2, numberOfClassesPerWeek * 3)
        .join(" "),
      text4: classesPerMonths
        .slice(numberOfClassesPerWeek * 3, classesPerMonths * 4)
        .join(" "),
      text5: classesPerMonths
        .slice(numberOfClassesPerWeek * 4, classesPerMonths * 5)
        .join(" "),
    };
    setFormData(data);
    console.log(data);
  };

  const pdfHandler = () => {
    setPdf(false);
  };
  return (
    <div >
      {monthlyPlan && !pdf && (
        <OpenModal
        
          title="Monthly plan"
          onHide={monthlyPlanCloseHandler}
          show={monthlyPlan}
        body = {

      
          <Form onSubmit={onSubmitMonthlyPlanHandler} className="form " >
       

                <Form.Control
                  type="number"
                  min={1}
            size='lg'
                  ref={inputNumberOfClassesPerWeekRef}
                  value={numberOfClassesPerWeek}
                  required={true}
                  onChange={numberOfClassesPerWeekHandler}
                  placeholder="Number of classes/week"
                ></Form.Control>
                <Form.Control
            size='lg'
                  ref={inputClassCodeRef}
                  value={classCode}
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
            pdfUrl={"https://docdro.id/crXBebZ"}
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
                            return <li >{item}</li>;
                          })}
                        <Button onClick={monthlyPlanHandler}>
                          Get monthly plan
                        </Button>
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
