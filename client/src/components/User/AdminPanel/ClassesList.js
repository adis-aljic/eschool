import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import styles from './AdminPanel.module.css';
import Loader from '../../UI/Loader';
import { useNavigate } from "react-router-dom";
import OpenModal from '../../UI/Modal';
import "./AboutModal.css"

const ClassesList = (props) => {
  const Navigate = useNavigate();
  const [classes, setClasses] = useState([]);
 const [inProgress, setInProgress] = useState(false)
 const [isError, setIsError] = useState(null)

  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
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
    }, []
    );
    const refreshListHandler = (e) => {
    e.preventDefault()
      setInProgress(true)
      
      // fetch('http://localhost:4000/api/classes/myclasses', {
          fetch("https://eschool-pw0m.onrender.com/api/classes/myclasses", {


        method: 'POST',
      mode: 'cors',
      body: JSON.stringify({
        id: `${user.id}`,
      }),     headers: {
        'Content-Type': 'application/json',
      },
    }) 
    .then((resolve) => resolve.json())
    .then((data) => {
        localStorage.setItem('MyClasses', JSON.stringify(data));
        setClasses(data);
      }).catch(error =>{
        setIsError({
          title: "Something went wrong",
          message: error.message
        });
        Navigate("/error")
      });
      setInProgress(false)
  };

  return (
    <>
    {isError && <OpenModal 
    title={isError.title}
    body = {isError.message}
    show ={isError}
    onHide = {()=>setIsError(null)}
    ></OpenModal>}
      <div className="container">
        <div className='row'>
          <div className='col'>
          <Button  className={styles.btn}                          
          data-toggle="tooltip" data-placement="top" title="Reload and update classes"
 onClick={refreshListHandler}>Reload schools</Button>
          <br></br>

          <h1 className='headingAdminPanel'>Classes</h1>
          <br></br>
          <ul className={styles.list}>
          {classes.length>0
            ? classes.map((classItem) => (
              <>
                  <li key={classItem.id} >
                    {classItem.school}
                    <br></br>
                    {classItem.schoolClass}-{classItem.departmant}
                    <br></br>
                    {classItem.abbrevation}
                  </li>
              </>
                  ))
                  : ''}
                  </ul>
                  </div>
        </div>
      </div>
      {inProgress && <Loader />}

    </>
  );
};
export default ClassesList;
