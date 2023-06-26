import { useRef, useState } from "react";
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Loader from "../../UI/Loader";
import OpenModal from "../../UI/Modal";
import { Navigate } from "react-router-dom";
const RegistrerClass = () => {
  const [searchSchool, setSearchSchool] = useState("");
  const [filteredSchool, setFilteredSchool] = useState([]);
  let classesList = JSON.parse(localStorage.getItem("MyClasses"));
  const [enteredClassCode, setEneteredClassCode] = useState("");
  const classCodeRef = useRef();
  const [text, setText] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [isError, setIsError] = useState(null);

  const classCodeHandler = () => {
    setEneteredClassCode(classCodeRef.current.value);
  };

  const unregisterClassHandler = (e) => {
    e.preventDefault();
    setInProgress(false);
    if (!enteredClassCode) {
      setInProgress(false);
      setIsError({
        title: "Class code is not entered",
        message: "Please enter class code",
      });
      return;
    }

    const result = classesList.find(
      (classItem) => classItem.abbrevation === enteredClassCode.toUpperCase()
    );
    if (!result) {
      setInProgress(false);
      setIsError({
        title: "School is not found.",
        message: "Please enter valid school code or check if school is added  ",
      });
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    // fetch("http://localhost:4000/api/classes/unregisterclass", {
      // fetch("https://teacher-aid.onrender.com/api/classes/unregisterclass", {
        fetch("https://eschool-pw0m.onrender.com/api/classes/unregisterclass", {


      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        userId: `${user.id}`,
        classId: `${result.id}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setIsError({
          title: "Class is registred",
          message: `Class ${data.abbrevation} is registred. ${data.map(
            (item) => {
              return (
                <>
                  <li>School {item.school}</li>
                  <li>
                    Class {item.schoolClass} - ${item.departmant}
                  </li>
                  <li>City {item.city}</li>
                  <li>Code {item.abbrevation}</li>
                </>
              );
            }
          )}`,
        });
      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });
    setInProgress(false);
  };

  const searchSchoolHandler = (e) => {
    e.preventDefault();
    setSearchSchool(e.target.value);
    if (searchSchool.length === 0) {
      setText("");
    }

    const found = classesList.filter((schoolClass) =>
      schoolClass.school.includes(searchSchool)
    );
    setFilteredSchool(found);

    if (found.length === 0) {
      setText("School not found. Try again !!!");
    }
    if (searchSchool.length < 2 && filteredSchool.length === 0) {
      setText("");
      setFilteredSchool([]);
    }
  };

  const errorHandler = () => setIsError(null);
  return (
    <>
      {isError && (
        <OpenModal
          title={isError.title}
          body={isError.message}
          onConfirm={errorHandler}
        />
      )}
      <div className="container">
        <div className="row">
          <div className="col">

          <h1>Unregistred class</h1>
          <Form.Control
          
            type="search"
            size="lg"
            className="bg-primary text-light"

            value={searchSchool}
            onChange={searchSchoolHandler}
            placeholder="Search ..."
          ></Form.Control>
          {filteredSchool.length > 0 ? (
            filteredSchool.map((x) => (
              <>
                <li key={x.id}>
                  {x.school}
                  {x.class}
                  {x.abbrevation}
                </li>
              </>
            ))
          ) : (
            <p>{text} </p>
          )}
        </div>
        <div>

        <Form onSubmit={unregisterClassHandler}>
          <Form.Control
            type="text"
            name="classCode"
            placeholder="Class Code"
            size="lg"
            ref={classCodeRef}
            value={enteredClassCode}
            onChange={classCodeHandler}
          ></Form.Control>
          <Button         style={{display:"flex", justifySelf : "center"}}
 type="submit">Unregister Class</Button>
        </Form>
        {inProgress && <Loader />}
        </div>
        </div>
      </div>
    </>
  );
};
export default RegistrerClass;
