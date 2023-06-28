import { useContext, useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Accordion from "react-bootstrap/Accordion";
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";
import AuthContex from "../../../store/Auth-ctx";
import Tabs from "react-bootstrap/esm/Tabs";

const Student = (props) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [info, setInfo] = useState(JSON.parse(localStorage.getItem("profile")));
  const [key, setKey] = useState('profile');
  const [data ,setData] = useState([])
  const [myNews, setMyNews] = useState([])
  const classesId = info ? info.classes.map(x => x.id) : null

useEffect(()=>{

  data.forEach(x => {
    classesId.forEach(id =>{
      if(data.classId === id){
        setMyNews((news)=> myNews.push(news))
      }
    })
  }) 
})
  
  const [teachers, setTeachers] = useState(
    JSON.parse(localStorage.getItem("MyClasses"))
  );
  const ctx = useContext(AuthContex);

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
  if (info) {
    const codes = info.classes.map((code) => code.abbrevation);
   codes ? codes.map((x) => {
      teachers ? teachers.map((teacher) => {
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
      }) : null
      // setObj(infoData)
    }) : null
  }
  return (
    <>
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
            <h2>Profile</h2>
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
                            ? info.notes.map((note) => note.note).join(" \n")
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
