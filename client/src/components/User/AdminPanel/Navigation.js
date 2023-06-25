import { useContext } from 'react';
import AuthContex from '../../../store/Auth-ctx';
import classes from '../../User/AdminPanel/AdminPanel.module.css';
import "./Navigation.css"

const Navigation = (props) => {
  const ctx = useContext(AuthContex);

  return (
    <nav>
    <div className="navbar1">
      <div className="container1 nav-container1">
          <input className="checkbox" type="checkbox" name="" id="" />
          <div className="hamburger-lines1">
            <span className="line1 line11"></span>
            <span className="line1 line22"></span>
            <span className="line1 line33"></span>
          </div>  
      
        <div className="menu-items1">
    <ul className={classes.navigation}>
      <li onClick={ctx.addClassNavHandler}>Add Class</li>
      <li onClick={ctx.addStudentNavHandler}>Add student</li>
      <li onClick={ctx.RegisterClassNavHandler}>Register Class</li>
      <li onClick={ctx.UnregisterClassNavHandler}>Unregister Class</li>
      <li onClick={ctx.AddNewsNavHandler}>Add news</li>
    </ul>
    </div>
    </div>
    </div>
    </nav>
  );
};

export default Navigation;
