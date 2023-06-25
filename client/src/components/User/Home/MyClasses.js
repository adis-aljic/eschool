import { useState, useEffect } from 'react';
import Card from '../../UI/Card';
import Button from '../../UI/Button';

const MyClasses = (props) => {
  const [classes, setClasses] = useState([]);
  //   const [user, setUser] = useState({});
  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(classes);
  // console.log(user);
  const refreshMyClassesHandler = (e) => {
    e.preventDefault();
  };
  // setClasses(JSON.parse(localStorage.getItem('classList')));
  // setUser(JSON.parse(localStorage.getItem('user')));
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
        //   localStorage.setItem('classList', JSON.stringify(data));
        setClasses(data);
      });
  }, [user.id]);

  return (
    <>
      <Card className={props.className}>
        <h1>My classes:</h1>
        {classes
          ? classes.map((classItem) => (
              <>
                <li key={classItem.id}>
                  {classItem.school}
                  <br></br>
                  {classItem.schoolClass}-{classItem.departmant}
                  <br></br>
                  {classItem.abbrevation}
                </li>
                <br></br>
              </>
            ))
          : ''}
        <Button onClick={refreshMyClassesHandler}>Refresh</Button>
      </Card>
    </>
  );
};

export default MyClasses;
