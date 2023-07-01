import { useRef, useState } from "react";
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';
import Loader from "../../UI/Loader";
import OpenModal from "../../UI/Modal";
import { Navigate } from "react-router-dom";
import "./AboutModal.css"
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
    setEneteredClassCode(classCodeRef.current.value.toUpperCase());
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
        <span class="badge rounded-pill text-bg-primary aboutModal"  onClick={()=> setIsError({title : "Unregister Class information",
message : <div>1. On the left side, you can find a list of all registered classes.<br></br>
2. You can refresh the list at any moment by clicking the "Refresh" button.<br></br>
3. On the right side, you can add a unregister class.<br></br>
<ul>
<li>
 - To unregister a class, type the class code in the designated field and click on the button to unregister it.

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
      <div className="container">
        <div className="row">
          <div className="col">
<br></br>
          <h1 className="headingAdminPanel">Unregistred class</h1>
          <Form.Control
                      data-toggle="tooltip" data-placement="top" title="Search for all added class or schools"

            type="search"
            size="lg"
            className="bg-info text-light"

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
<br></br>
<br></br>
        <Form onSubmit={unregisterClassHandler}>
          <Form.Control
                    data-toggle="tooltip" data-placement="top" title="Enter class code for class which you want register "

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
