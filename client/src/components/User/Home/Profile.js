import { useEffect, useRef, useState } from "react";
import React from "react";
import "./Profile.css";
import "../AdminPanel/AboutModal.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import OpenModal from "../../UI/Modal";
import classes from "../Student/Student.module.css";
import * as filestack from "filestack-js";
import { API_KEY } from "../../../firestack";
import avatar from "../../../assets/avatar.jpg";
import validatePassword from "../../Login/passwordValidation";
const client = filestack.init(API_KEY);
const Profile = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const [profile, setProfile] = useState(
    JSON.parse(localStorage.getItem("profile"))
  );
  const [students, setStudents] = useState([]);
  const [studentName, setStudentName] = useState(null);
  const [enteredGrade, setEnteredGrade] = useState(null);
  const [enteredDeleteGrade, setEnteredDeleteGrade] = useState(null);
  const [enteredNote, setEnteredNote] = useState("");
  const [message, setMessage] = useState("");
  const [enteredNoteNbr, setEnteredNoteNbr] = useState(null);
  const [key, setKey] = useState("profile");
  const [addGrade, setAddGrade] = useState(false);
  const [deleteGrade, setDeleteGrade] = useState(false);
  const [addNote, setAddNote] = useState(false);
  const [deleteNote, setDeleteNote] = useState(false);
  const [url, setUrl] = useState(localStorage.getItem("profile_picture"));
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [enterPasswordChangePassword, setEnterPasswordChangePassword] = useState("");
const [isError, setIsError] = useState(null)
  const enteredGradeRef = useRef();
  const enteredPasswordChangePasswordRef = useRef();
  const enteredDeleteGradeRef = useRef();
  const enteredNoteRef = useRef();
  const enteredNoteNbrRef = useRef();
  if (!url) {
    setUrl(avatar);
  }
  const uploadFileHandler = (event) => {
    event.preventDefault();
    const options = {
      maxFiles: 1,
      fromSources: ["local_file_system"],
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
        const url = res.filesUploaded[0].url;
        setUrl(url);
        localStorage.setItem("profile_picture", url);
      },
    };
    client.picker(options).open();
  };

  const eneterPasswordChangePasswordOnChange = (e) => {
    setEnterPasswordChangePassword(e.target.value);
    console.log(enterPasswordChangePassword);
  };

  const clickedAddGradeHandler = (e) => {
    console.log(e.target.value);

    setAddGrade(true);
    setStudentName(e.target.value);
  };
  const clickedDeleteGradeHandler = (e) => {
    setDeleteGrade(true);
    setStudentName(e.target.value);
  };
  const clickedAddNoteHandler = (e) => {
    setStudentName(e.target.value);
    setAddNote(true);
  };
  const clickedDeleteNoteHandler = () => setDeleteNote(true);

  const enteredGradeHandler = () =>
    setEnteredGrade(enteredGradeRef.current.value);
  const enteredDeleteGradeHandler = () =>
    setEnteredDeleteGrade(enteredDeleteGradeRef.current.value);
  const enteredNoteHandler = () => setEnteredNote(enteredNoteRef.current.value);
  const enteredNoteNbrHandler = () =>
    setEnteredNoteNbr(enteredNoteNbrRef.current.value);

  useEffect(() => {
    // fetch("http://localhost:4000/api/user/getstudents", {
      fetch("https://eschool-pw0m.onrender.com/api/user/getstudents", {

      mode: "cors",
      method: "GET",
    })
      .then((resolve) => resolve.json())
      .then((results) => setStudents(results));

    // fetch("http://localhost:4000/api/user", {
      fetch("https://eschool-pw0m.onrender.com/api/user", {

      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        id: `${user.id}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        // console.log(data[0]);
        setProfile(data[0]);
        localStorage.setItem("profile", JSON.stringify(data[0]));
      });
  }, [user.id]);
  // console.log(profile);

  const addGradeHandler = (e) => {
    e.preventDefault();

    // fetch("http://localhost:4000/api/grade/add", {
    fetch("https://eschool-pw0m.onrender.com/api/grade/add", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        studentId: studentName,
        grade: `${enteredGrade}`,
        teacherId: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        setMessage(data.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
        // fetch("http://localhost:4000/api/user/getstudents", {
        fetch("https://eschool-pw0m.onrender.com/api/user/getstudents", {
          mode: "cors",
          method: "GET",
        })
          .then((resolve) => resolve.json())
          .then((results) => setStudents(results));
      });
    setEnteredGrade("");
  };
  const deleteGradeHandler = (e) => {
    e.preventDefault();
    // fetch("http://localhost:4000/api/grade/delete", {
    fetch("https://eschool-pw0m.onrender.com//api/grade/delete", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        studentId: studentName,
        grade: enteredDeleteGrade,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setMessage(data.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
        // fetch("http://localhost:4000/api/user/getstudents", {
        fetch("https://eschool-pw0m.onrender.com/api/user/getstudents", {
          mode: "cors",
          method: "GET",
        })
          .then((resolve) => resolve.json())
          .then((results) => setStudents(results));
      });

    setEnteredDeleteGrade("");
  };
  const addNoteHandler = (e) => {
    e.preventDefault();
    // fetch("http://localhost:4000/api/note/add", {
    fetch("https://eschool-pw0m.onrender.com/api/note/add", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        studentId: studentName,
        note: `${enteredNote}`,
        teacherId: user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        console.log(data);
        setMessage("Note is added");
        setTimeout(() => {
          setMessage("");
        }, 1000);
      });
    setEnteredNote("");
    // fetch("http://localhost:4000/api/user/getstudents", {
    fetch("https://eschool-pw0m.onrender.com/api/user/getstudents", {
      mode: "cors",
      method: "GET",
    })
      .then((resolve) => resolve.json())
      .then((results) => setStudents(results));
  };
  const deleteNoteHandler = (e) => {
    e.preventDefault();
    // fetch("http://localhost:4000/api/note/delete", {
    fetch("https://eschool-pw0m.onrender.com/api/note/delete", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        noteId: `${enteredNoteNbr}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setMessage(data.message);
        setTimeout(() => {
          setMessage("");
        }, 1000);
        // fetch("http://localhost:4000/api/user/getstudents", {
          fetch("https://eschool-pw0m.onrender.com/api/user/getstudents", {

          mode: "cors",
          method: "GET",
        })
          .then((resolve) => resolve.json())
          .then((results) => setStudents(results));
      });
    setEnteredNoteNbr("");
  };

  const openChangePasswordModalHandler = (e) => {
    e.preventDefault()
    console.log("aaaaaaaaaaa");
    setOpenChangePassword(true);
  };

const onSubmitChangePasswordHandler = e =>{
  e.preventDefault()
  console.log(enterPasswordChangePassword);
  if (!validatePassword(enterPasswordChangePassword)) {
    setIsError({
      title: "Invalid password format",
      message:
        "Password must contain one capital letter, one special character, one number and at least 8 characters",
    });
    return;
  }
  // fetch("http://localhost:4000/api/user/updatePassword", {
      fetch("https://eschool-pw0m.onrender.com/api/user/updatePassword", {

      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        email: user.email,
        password : enterPasswordChangePassword
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        // console.log(data[0]);
        setMessage(data.message)
        // setTimeout(() => {
        //   setMessage("")
        // }, 2000);
      });
  setEnterPasswordChangePassword("")
  // setTimeout(() => {
    
  //   setOpenChangePassword(false)
  // }, 3000);
}
  return (
    <>
    {isError && (<OpenModal
    title={isError.title}
    body={isError.message}
    show={isError}
    onHide={()=>setIsError(null)}
    ></OpenModal>)}
      {openChangePassword && (
        <OpenModal
          title="Change password"
          show={openChangePassword}
          body={
            <form onSubmit={onSubmitChangePasswordHandler}>
              <input
                type="text"
                value={enterPasswordChangePassword}
                onChange={eneterPasswordChangePasswordOnChange}
                ref={enteredPasswordChangePasswordRef}
                placeholder="Enter new password"
              ></input>
              <Button type="submit">Submit</Button>
            </form>
          }
          message={message}
          onHide={() => setOpenChangePassword(false)}
        ></OpenModal>
      )}
      {addGrade && (
        <OpenModal
          title="Add new Grade"
          body={
            <>
              <form className="addNewGrade" onSubmit={addGradeHandler}>
                <input
                  type="number"
                  value={enteredGrade}
                  onChange={enteredGradeHandler}
                  ref={enteredGradeRef}
                  min={1}
                  max={5}
                  placeholder="Enter grade"
                ></input>
                <Button type="submit">Add grade</Button>
              </form>
            </>
          }
          show={addGrade}
          message={message}
          onHide={() => setAddGrade(false)}
        />
      )}

      {deleteGrade && (
        <OpenModal
          title="Delete Grade"
          body={
            <>
              <form onSubmit={deleteGradeHandler}>
                <input
                  type="number"
                  placeholder="Grade"
                  onChange={enteredDeleteGradeHandler}
                  ref={enteredDeleteGradeRef}
                  value={enteredDeleteGrade}
                ></input>
                <Button type="submit">Delete grade</Button>
              </form>
            </>
          }
          message={message}
          show={deleteGrade}
          onHide={() => setDeleteGrade(false)}
        />
      )}
      {addNote && (
        <OpenModal
          message={message}
          title="Add new Note"
          body={
            <>
              <form onSubmit={addNoteHandler}>
                <div class="form-floating">
                  <textarea
                    class="form-control"
                    placeholder="Enter note ..."
                    id="floatingTextarea2"
                    maxLength={50}
                    value={enteredNote}
                    onChange={enteredNoteHandler}
                    ref={enteredNoteRef}
                  ></textarea>
                  <p for="floatingTextarea2">{enteredNote.length}/50</p>
                </div>

                <Button type="submit">Add note</Button>
              </form>
            </>
          }
          show={addNote}
          onHide={() => setAddNote(false)}
        />
      )}
      {deleteNote && (
        <OpenModal
          message={message}
          title="Delete Note"
          body={
            <>
              <form onSubmit={deleteNoteHandler}>
                <input
                  type="number"
                  placeholder="Enter note number"
                  value={enteredNoteNbr}
                  onChange={enteredNoteNbrHandler}
                  ref={enteredNoteNbrRef}
                ></input>
                <Button type="submit">Delete note</Button>
              </form>
            </>
          }
          show={deleteNote}
          onHide={() => setDeleteNote(false)}
        />
      )}

      <div className="container">
        <div className="row">
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="bg-primary-subtle
      mb3 border
     "
            fill={true}
            justify={true}
          >
            <Tab eventKey="profile" title="Profile">
              <br></br>
              <ul>
                <h2>Profile</h2>
                <li key={profile ? profile.id : 1}>
                  <br></br>
                  <img
                    src={url}
                    className={classes.profile_img}
                    alt="profile picure"
                  ></img>
                  <br></br>
                  Name :{" "}
                  {profile ? `${profile.firstName}  ${profile.lastName}` : ""}
                  <br></br>
                  Email : {profile ? profile.email : ""}
                  <br></br>
                  role : {profile ? profile.role : ""}
                  <br></br>
                </li>
              </ul>{" "}
              <div className={classes.btns}>
                <Button onClick={uploadFileHandler}>Upload picture</Button>
                <Button onClick={openChangePasswordModalHandler}>
                  Change password
                </Button>
              </div>
            </Tab>
            <Tab eventKey="classes" title="Classes">
              <br></br>
              <h1 className="headingAdminPanel">Classes</h1>
              <br></br>
              <Accordion>
                {profile
                  ? profile.classes.map((classItem) => (
                      <Accordion.Item eventKey={classItem.id}>
                        <Accordion.Header>
                          <h3>Class {classItem.abbrevation}</h3>
                        </Accordion.Header>
                        <hr></hr>
                        <Accordion.Body>
                          <h2 className="headingAdminPanel">Students</h2>
                          <br></br>
                          {students
                            ? students.map((student) => {
                                return student.classes.map((schoolClass) => {
                                  return schoolClass.abbrevation ===
                                    classItem.abbrevation ? (
                                    <Accordion>
                                      <Accordion.Item eventKey={student.id}>
                                        <Accordion.Header>
                                          <h4>
                                            {student.firstName}{" "}
                                            {student.lastName}
                                          </h4>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                          {student ? (
                                            <li key={student.id}>
                                              <div>
                                                <div>
                                                  <p className="text-start">
                                                    {student.email}
                                                  </p>
                                                  <p className="text-start">
                                                    {student.subject}
                                                  </p>
                                                  <p className="text-start">
                                                    {schoolClass.school}
                                                  </p>
                                                  <p className="text-start">
                                                    Class :{" "}
                                                    {schoolClass.schoolClass} -
                                                    {schoolClass.departmant}
                                                  </p>
                                                  <p className="text-start">
                                                    Grade :
                                                    {student.grades.length > 0
                                                      ? student.grades
                                                          .map(
                                                            (grade) =>
                                                              grade.grade
                                                          )
                                                          .join(", ")
                                                      : " No grade "}
                                                  </p>
                                                  <Button
                                                    onClick={
                                                      clickedAddGradeHandler
                                                    }
                                                    value={student.id}
                                                    style={{
                                                      marginRight: 0.5 + "em",
                                                    }}
                                                    bg="secondary"
                                                  >
                                                    Add Grade
                                                  </Button>
                                                  <Button
                                                    onClick={
                                                      clickedDeleteGradeHandler
                                                    }
                                                    value={student.id}
                                                    style={{
                                                      marginRight: 0.5 + "em",
                                                    }}
                                                    bg="secondary"
                                                  >
                                                    Delete Grade
                                                  </Button>

                                                  {/* <Button
                                              type="submit"
                                              value={JSON.stringify(student)}
                                              onClick={addButtonHandler}
                                            >
                                              Add
                                            </Button> */}
                                                </div>
                                                <div>
                                                  <div>
                                                    <h2>Notes</h2>
                                                  </div>

                                                  <ul>
                                                    {student.notes &&
                                                    student.notes.length > 0 ? (
                                                      student.notes.map(
                                                        (note) => {
                                                          return (
                                                            <li
                                                              key={note.id}
                                                              style={{
                                                                listStyleType:
                                                                  "none",
                                                              }}
                                                            >
                                                              {note.id}.{" "}
                                                              {note.note}{" "}
                                                              <span
                                                                style={{
                                                                  color: "red",
                                                                  fontSize:
                                                                    "smaller",
                                                                  float:
                                                                    "right",
                                                                }}
                                                              >
                                                                {" "}
                                                                Created:{" "}
                                                                {new Date(
                                                                  note.createdAt
                                                                ).toLocaleDateString(
                                                                  "en-us",
                                                                  {
                                                                    year: "numeric",
                                                                    month:
                                                                      "short",
                                                                    day: "numeric",
                                                                  }
                                                                )}
                                                              </span>
                                                            </li>
                                                          );
                                                        }
                                                      )
                                                    ) : (
                                                      <li>No notes ... </li>
                                                    )}
                                                    <Button
                                                      onClick={
                                                        clickedAddNoteHandler
                                                      }
                                                      value={student.id}
                                                      style={{
                                                        marginRight: 0.5 + "em",
                                                      }}
                                                      bg="secondary"
                                                    >
                                                      Add Note
                                                    </Button>
                                                    <Button
                                                      onClick={
                                                        clickedDeleteNoteHandler
                                                      }
                                                      style={{
                                                        marginRight: 0.5 + "em",
                                                      }}
                                                      bg="secondary"
                                                    >
                                                      Delete Note
                                                    </Button>
                                                  </ul>
                                                </div>
                                              </div>
                                            </li>
                                          ) : (
                                            <p>No students "</p>
                                          )}
                                        </Accordion.Body>
                                      </Accordion.Item>
                                    </Accordion>
                                  ) : null;
                                });
                              })
                            : null}
                        </Accordion.Body>
                      </Accordion.Item>
                    ))
                  : null}
              </Accordion>
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Profile;
