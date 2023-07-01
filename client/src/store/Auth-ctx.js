import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
const AuthContex = React.createContext({
  isLogged: false,

  setIsLogged: () => {},
  onLogin: () => {},
  onRegistred: () => {},
  isError: null,
  setIsError: () => {},
  navAddClass: false,
  navAddStudent: false,
  navAddNews: false,
  navRegisterClass: false,
  navUnregisterClass: false,
  navigationAddClassHandler: () => {},
  navigationCuricculumHandler: () => {},
  navigationHomeHandler: () => {},
  addStudentNavHandler: () => {},
  addClassNavHandler: () => {},
  RegisterClassNavHandler: () => {},
  UnregisterClassNavHandler: () => {},
  AddNewsNavHandler: () => {},
  navigationStudentHandler : () =>{},
  navigationMessageHandler : () =>{},
  adminPanelNav: '',
  pageNotFoundHandler : ()=>{}
});

export const AuthContexProvider = (props) => {
  const [isError, setIsError] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isRegistred, setIsRegistred] = useState(null);
  const [navigation, setNavigation] = useState(null);

  const [adminPanelNav, setNav] = useState('');
const Navigate = useNavigate()
  let Auth = localStorage.getItem('Logged_in');
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    if (Auth) {
      setIsLogged(true);
    }
  }, [Auth]);

  const loginHandler = (props) => {
    if (!props.isAuth) {
      setIsError({
        title: 'Unauthorized access',
        message: `${props.message}`,
      });
      return;
    } else {
      setIsLogged(true);
      localStorage.setItem('Logged_in', props.token);
      localStorage.setItem('user', JSON.stringify(props));
      props.role === "student" ? setNavigation("student") : setNavigation("home")
    }
  };
  const registredHandler = (props) => {
    setIsRegistred(props);
  };
  const errorHandler = () => {
    setIsError(null);
  };

  const logoutHandler = (props) => {
    localStorage.removeItem('user');
    localStorage.removeItem('Logged_in');
    localStorage.removeItem('classList');
    localStorage.removeItem('profile');
    localStorage.removeItem('curriculumList');
    localStorage.removeItem('MyClasses');
    localStorage.removeItem('teacherData');
    setIsLogged(false);
    Navigate("/");
  };


  const navigationStudentHandler = () => {
    setNavigation('student');
  };
  const navigationMessageHandler = () => {
    setNavigation('message');
  };
  const navigationAddClassHandler = () => {
    setNavigation('add class');
  };
  const navigationHomeHandler = () => {
    setNavigation('home');
  };
  const navigationCuricculumHandler = () => {
    setNavigation('curicculum');
  };

  const addClassNavHandler = () => {
    setNav('addClass');
  };
  const addStudentNavHandler = () => {
    setNav('addStudent');
  };
  const RegisterClassNavHandler = () => {
    setNav('regClass');
  };
  const UnregisterClassNavHandler = () => {
    setNav('unRegClass');
  };
  const AddNewsNavHandler = () => {
    setNav('addNews');
  };
  const pageNotFoundHandler = () =>{

    if ( user && user.isAuth && user.role === "teacher") {
     return Navigate("/home");
    }
     if(user && user.isAuth && user.role === "student"){
     return Navigate("/student")
    }
    
    return  Navigate("/login")
    
  }

  return (
    <AuthContex.Provider
      value={{
        setIsLogged,
        pageNotFoundHandler,
        isLogged,
        onLogin: loginHandler,
        onRegistred: registredHandler,
        isError,
        errorHandler,
        user,
        onLogout: logoutHandler,
        navigationAddClassHandler,
        navigationCuricculumHandler,
        navigationHomeHandler,
        navigation,
        addClassNavHandler,
        addStudentNavHandler,
        AddNewsNavHandler,
        RegisterClassNavHandler,
        UnregisterClassNavHandler,
        navigationStudentHandler,
        // navAddClass,
        // navAddNews,
        // navAddStudent,
        // navRegisterClass,
        // navUnregisterClass,
        adminPanelNav,
        navigationMessageHandler
      }}>
      {props.children}
    </AuthContex.Provider>
  );
};

export default AuthContex;
