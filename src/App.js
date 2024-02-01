import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/auth/Login';
import Register from './Components/auth/Register';
import Header from './Components/default/Header';
import Home from './Components/default/Home'
import AdminDashboard from './Components/admin/AdminDashboard';
import UserDashboard from './Components/user/UserDashboard';
import Pnf from './Components/default/Pnf';
import Footer from './Components/default/Footer';
import PrivateRoute from './Auth/PrivateRoute';
import {ToastContainer} from 'react-toastify'
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';
import View from './Components/screens/View';
import FileUpload from './Components/user/FileUpload';
import GeneratePassword from './Components/auth/GeneratePassword';
import ResetPassword from './Components/auth/ResetPassword';

function App() {
  const context = useContext(AuthContext)
  const isLogin = context.isLogin

  return (
    <BrowserRouter>
      <Header></Header>
      <ToastContainer autoClose={4000} position={'top-right'}/>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home></Home>}></Route>
          <Route path='/admin/dashboard' element={<AdminDashboard></AdminDashboard>}></Route>
          <Route path='/user/dashboard' element={<UserDashboard></UserDashboard>}></Route>
          <Route path='/view/file/:id' element={<View />}/>
          <Route path='/upload/new' element={<FileUpload />} />
        </Route>
        
        <Route exact path={`/password/reset`} element={isLogin? <Navigate to={`/`}/>: <ResetPassword/>} />
        <Route path='/login' element={isLogin ? <Navigate to={`/`}/> : <Login></Login>}></Route>
        <Route path='/generate/password' element={isLogin ? <Navigate to={`/`}/> : <GeneratePassword></GeneratePassword>}></Route>
        <Route path='/register' element={isLogin ? <Navigate to={`/`}/> : <Register></Register>}></Route>
        <Route path='/*' element={<Pnf></Pnf>}></Route>
      </Routes>

      <Footer />
      
    </BrowserRouter>
  );
}

export default App;
