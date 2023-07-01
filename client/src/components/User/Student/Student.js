import { useContext, useEffect, useState, useRef } from "react";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import Card from 'react-bootstrap/Card';
import { Link, Navigate } from "react-router-dom";
import AuthContex from "../../../store/Auth-ctx";
import Tabs from "react-bootstrap/esm/Tabs";
import Button from "react-bootstrap/esm/Button";
import classes from "./Student.module.css"
import * as filestack from 'filestack-js';
import {API_KEY} from "../../../firestack"
import avatar from '../../../assets/avatar.jpg'
import validatePassword from "../../Login/passwordValidation";
import OpenModal from "../../UI/Modal";

const client = filestack.init(API_KEY); 
const Student = (props) => {
  
  const user = JSON.parse(localStorage.getItem("user"));
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("profile")));
  const [key, setKey] = useState('profile');
  const [data ,setData] = useState([])
  const [myNews, setMyNews] = useState([])
  const classesId = info ? info.classes.map(x => x.id) : null
  const [message, setMessage] = useState("")
  const [deactiveProfile, setDeactivateProfile] = useState(false)
  const [returnToLogin, setReturnToLogin] = useState(false)

  const [teachers, setTeachers] = useState(
    JSON.parse(localStorage.getItem("MyClasses"))
  );
  const [url, setUrl] = useState(localStorage.getItem("profile_picture"))
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [enterPasswordChangePassword, setEnterPasswordChangePassword] = useState("");
const [isError, setIsError] = useState(null)
const enteredPasswordChangePasswordRef = useRef();
const deactivateProfilOpenModalHandler = () => setDeactivateProfile(true)
const deactivateProfilOpenModalCloseHandler = () => setDeactivateProfile(false)
  const ctx = useContext(AuthContex);
  console.log(url);
if(!url){
  setUrl(avatar)
}
  useEffect(()=>{
    
  data.forEach(x => {
    classesId.forEach(id =>{
      if(data.classId === id){
        setMyNews((news)=> myNews.push(news))
      }
    })
  }) 
},[myNews])
  

const eneterPasswordChangePasswordOnChange = (e) => {
  setEnterPasswordChangePassword(e.target.value);
  console.log(enterPasswordChangePassword);
};

  useEffect(() => {

    // fetch("http://localhost:4000/api/news/studentNews",{
        fetch("https://eschool-pw0m.onrender.com/api/news/studentNews", {


    method: 'GET',
    mode: 'cors',

    headers: {
      'Content-Type': 'application/json',
    },
})
.then(resolve => resolve.json())
.then(data =>
    {

        setData(data)
        console.log(data)
    } 
        )


    // fetch("http://localhost:4000/api/user", {
      fetch("https://eschool-pw0m.onrender.com/api/user", {

      mode: "cors",
      method: "POST",
      body: JSON.stringify({
        id: user.id,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setInfo(data[0]);
        localStorage.setItem("profile", JSON.stringify(data[0]));
      });
    // fetch("http://localhost:4000/api/user/teachers", {
        fetch("https://eschool-pw0m.onrender.com/api/user/teachers", {
// 

      mode: "cors",
      method: "GET",
    })
      .then((resolve) => resolve.json())
      .then((data) => {
        setTeachers(data);
        localStorage.setItem("MyClasses", JSON.stringify(data));
      });
  }, []);

  const infoData = [];
  console.log(info);
  console.log(teachers);
       if(info){

         const codes = info.classes.map((code) => code.abbrevation);
         console.log(codes);
         codes.map((x) => {
           teachers.map((teacher) => {
         teacher.classes.map((sClass) => {
          if (x === sClass.abbrevation) {
            const obj = {
              code: x,
              fullName: `${teacher.firstName} ${teacher.lastName}`,
              email: teacher.email,
              school: sClass.school,
              schoolClass: `${sClass.schoolClass} - ${sClass.departmant}`,
              subject: sClass.subject,
            };
            infoData.push(obj);
          }
        });
        localStorage.setItem("teacherData", JSON.stringify(infoData));
      }) 
      // setObj(infoData)
    }) 
  }   
  
  const onSubmitDeactivateProfilHandler = e =>{
    e.preventDefault()
    console.log(user);
      // fetch("http://localhost:4000/api/user/deactivate", {
        fetch("https://eschool-pw0m.onrender.com/api/user/deactivate", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({
            id: `${user.id}`,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((resolve) => resolve.json())
          .then((data) =>{
            console.log(data);
            setMessage("Your account is deactivated.")
            setTimeout(() => {
              setMessage("")
              setReturnToLogin(true)
              ctx.setIsLogged(false)
              console.log(ctx.isLogged);
              console.log(returnToLogin);
            }, 5000);
          })

  }
  const uploadFileHandler = (event) => {
    event.preventDefault();
    const options = {
        maxFiles: 1,
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
            localStorage.setItem("profile_picture", url)
        },
    };
    client.picker(options).open()
    
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
        setTimeout(() => {
          setMessage("")
        }, 2000);
      });
  setEnterPasswordChangePassword("")
  setTimeout(() => {
    
    setOpenChangePassword(false)
  }, 3000);
}


    return (
    <>
    {returnToLogin && <Navigate to={"/Login"}></Navigate>}
    {deactiveProfile && <OpenModal
    title = "Deactivate profile"
    body = {
      <>
      <p>

      Are you sure? You will be able to retrive account only if teacher reactivated it.
      </p>
      <Button onClick={onSubmitDeactivateProfilHandler}>Yes I am sure</Button> <Button onClick={deactivateProfilOpenModalCloseHandler}>No</Button>
      </>
    }
    message = {message}
    onHide = {deactivateProfilOpenModalCloseHandler}
    show= {deactiveProfile}
    ></OpenModal>}
   
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
          <Tab eventKey="profile" title="Profile" >
        <ul >
          <li key={info ? info.id : 1}>
            <br></br>
            <h2>Profile</h2>
            <br></br>
            <img src={url} className={classes.profile_img} alt="profile picure"></img>
            <br></br>
            Name :{" "}
            {info ? `${info.firstName}  ${info.lastName}` : ""}
            <br></br>
            Email : {info ? info.email : ""}
            <br></br>
            role : {info ? info.role : ""}
            <br></br>
          </li>
        </ul>{" "}
        <div className={classes.btns}>

        <Button onClick={uploadFileHandler}>Upload picture</Button>
        <Button onClick={openChangePasswordModalHandler}>Change password</Button>
        <Button onClick={deactivateProfilOpenModalHandler}>Deactivate Profile</Button>

        
        </div>
      </Tab>
      <Tab eventKey="classes" title="Classes" >
      <Accordion>
          {info
            ? info.classes.map((schoolClass,index) => {
                return (
                  <Accordion.Item >
                    <Accordion.Header>
                      <h3>{schoolClass.subject}</h3>
                  </Accordion.Header>
                    <Accordion.Body >
                      <li key={index}>
                          <h3>Grade</h3>
                        <p >
                          {info.grades
                            ? info.grades.map((grade) => grade.grade).join(", ")
                            : " No grade"}
                        </p>

                        <br></br>
                        <p >
                          <h3>Notes</h3>
                          {info.notes
                            ? info.notes.map((note) => `${note.note}   Created: ${
                              new Date(
                              note.createdAt
                            ).toLocaleDateString(
                              "en-us",
                              {
                                year: "numeric",
                                month:
                                  "short",
                                day: "numeric",
                              }
                            )}` ).join(" \n")
                            : " No notes"}
                        </p>
                        <br></br>
                        {infoData.map((obj) => {
                          return obj.code === schoolClass.abbrevation ? (
                            <>
                              Teacher : {obj.fullName}
                              <br></br>
                              Email :{" "}
                              <Link to="/message" onClick={ctx.navigationMessageHandler}>
                                  {obj.email}
                              </Link>
                            </>
                          ) : null;
                        })}
                      </li>
                    </Accordion.Body>
                  </Accordion.Item>
                );
              })
            : null}
        </Accordion>
    </Tab>
    <Tab  eventKey="news" title="News" >

       
    <ul>
            {data.length>0
          ? data.map((news) => (
                <li key={news.id} >
                <Card>
      <Card.Body>
        <Card.Title >{news.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
        <div>

<p>Author :{news.user[0].firstName} {news.user[0].lastName}</p>
<p>School : { news.school}</p>
<p>Class : { news.schoolClass} - { news.departmant}</p>
</div>  

        </Card.Subtitle>
        <Card.Text >
        {news.text}
        <br></br>
        
        </Card.Text>
      {  news.url ? <Card.Link download={true} target="_blank" href={news.url}>Download</Card.Link> : null}
      </Card.Body>
      <Card.Footer>   <span style={{color : "red", fontSize:"smaller", float:"right"}}>  Created:{" "}
                                                              {new Date(
                                                                news.createdAt
                                                              ).toLocaleDateString(
                                                                "en-us",
                                                                {
                                                                  year: "numeric",
                                                                  month:
                                                                    "short",
                                                                  day: "numeric",
                                                                }
                                                              )}
                                                              </span></Card.Footer>
    </Card>
       

                </li>
                  
                
                  ))
                  : <h1>No news ...</h1> }            
                  </ul>
    </Tab>
    </Tabs>
    </div>
    </div>
    

    </>
  );
};

export default Student;
