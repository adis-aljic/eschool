import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import styles from './AdminPanel.module.css';
import Loader from '../../UI/Loader';
const ClassesList = (props) => {
  const [classes, setClasses] = useState([]);
 const [inProgress, setInProgress] = useState(false)

  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    fetch('http://localhost:4000/api/classes/myclasses', {
      // fetch("https://teacher-aid.onrender.com/api/classes/myclasses", {

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
      });
    }, [user.id]
    );
    const refreshListHandler = (e) => {
    e.preventDefault()
      setInProgress(true)
      
      fetch('http://localhost:4000/api/classes/myclasses', {
        // fetch("https://teacher-aid.onrender.com/api/classes/myclasses", {

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
      <div className="container">
        <div className='row'>
          <div className='col'>
          <Button  className={styles.btn} onClick={refreshListHandler}>Reload schools</Button>

          <h1>Classes:</h1>
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
