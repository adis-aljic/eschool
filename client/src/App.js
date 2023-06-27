import './index.css';

import Login from './components/Login/Login';
import { useContext } from 'react';
import AuthContex from './store/Auth-ctx';
import HeaderInformation from './components/User/HeaderInformation';
import AddClass from './components/User/AdminPanel/AddClass';
import AddStudent from './components/User/AdminPanel/AddStudents';
import ClassesList from './components/User/AdminPanel/ClassesList';
import RegistrerClass from './components/User/AdminPanel/RegistrerClass';
import { Routes, Route } from 'react-router-dom';
import UnregisterClass from "./components/User/AdminPanel/UnregisterClass"
import AddNews from './components/User/AdminPanel/AddNews';
import ListNews from './components/User/Home/ListNews';
import Profile from './components/User/Home/Profile';
import Curriculum from './components/User/Curriculum/Curriculum';
import Student from './components/User/Student/Student';
import Message from './components/User/Student/Message';
import SomethingWentWrong from "./components/Error/SomethingWentWrong"
import PageNotFound from "./components/Error/404"
import { Navigate } from 'react-router-dom';
import OpenModal from './components/UI/Modal';

function App() { 
  const ctx = useContext(AuthContex);
  console.log(ctx);
  return (
    <>
    <HeaderInformation user={ctx.user}></HeaderInformation>
      {ctx.isError && (
        <OpenModal
          title={ctx.isError.title}
          body={ctx.isError.message}
          onHide={ctx.errorHandler}
        />
      )}
      <main>
        <Routes> 
        
          <Route path="/login" element={!ctx.isLogged && <Login />}></Route>
          <Route path="/" element={!ctx.isLogged && <Login />}></Route>
          <Route
            path="/admin"
            element={
              ctx.isLogged && ctx.user.role === "teacher" &&
               (
                <div className='container'>
                  <div className='row'>
                    <div className='col-md-6'>
                      <ClassesList></ClassesList>
                    </div>
                    <div className='col-md-6'>
                      {ctx.adminPanelNav === 'addClass' && (
                        <AddClass></AddClass>
                      )}
                      {ctx.adminPanelNav === 'regClass' && (
                        <RegistrerClass></RegistrerClass>
                      )}{' '}
                      {ctx.adminPanelNav === "unRegClass" &&  <UnregisterClass></UnregisterClass>}
                      {ctx.adminPanelNav === 'addStudent' && (
                        <AddStudent></AddStudent>
                      )}
                      {ctx.adminPanelNav === "addNews" && <AddNews></AddNews>}
                    </div>
                  </div>
                </div>
              )
            }></Route>
          <Route
            path="home"
            element={
              ctx.isLogged  &&
              ctx.navigation === 'home' &&  ctx.user.role === "teacher"  && (
                <div className='container'>

                <div class="row">
                    <div className="col-md-6 ">
                    <ListNews ></ListNews>

                    </div>
                    <div className="col-md-6 ">

                    <Profile ></Profile>
                    </div>
                </div>
                </div >
              )
            }></Route>
            <Route path='curriculum'
            element={

              ctx.isLogged &&  ctx.user.role === "teacher" && ctx.navigation === 'curicculum' && (
                <div className='container'>
                  <div className='row'>

                  <div className='col'>

                  <Curriculum></Curriculum>
                  </div>
                  </div>
                </div>
                )
              }>
                </Route>
            <Route path='student'
            element={

              ctx.isLogged &&  ctx.user.role === "student" && ctx.navigation === 'student' && 
              <div className='container'>
              <div className='row'>

              <div className='col'>

              <Student></Student>
              </div>
              </div>
            </div>
                
              }>
                </Route>
            <Route path='message'
            element={

              ctx.isLogged &&  ctx.user.role === "student" && ctx.navigation === 'message' && 
              <div className='container'>
              <div className='row'>

              <div className='col'>

              <Message></Message>
              </div>
              </div>
            </div>              
              }>
                </Route>
                <Route path='/error' element={<SomethingWentWrong></SomethingWentWrong>}></Route>
                <Route path="/404" element={<PageNotFound />} />
                <Route path="*" element={<SomethingWentWrong  />} />


        </Routes>
      </main>
      <footer className="py-4 bg-dark text-white-50">

    <div className="container text-center">
        {/* <div className='row'> */}
      <small>Copyright &copy; <a href='https://adis-a-portfolio.netlify.app/'>Profa</a></small>
        {/* </div> */}
    </div>
  </footer>    </>
  );
}

export default App;
