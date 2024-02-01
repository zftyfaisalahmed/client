import React, { useState, useRef, useContext} from 'react'
import { toast } from 'react-toastify'
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';

const Login = () => {
  const context = useContext(AuthContext)
  const setIsLogin = context.setIsLogin
  const setToken = context.setToken

  const [view, setView] = useState('email');

  const femail = useRef()
  const fmobile = useRef()
  const fpassword = useRef()

  //navigate instance
  const navigate = useNavigate()

  const viewHandler = (val) => {
    setView(val)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
        if(view === 'email'){
            let data = {
                email : femail.current.value,
                password : fpassword.current.value
            }
            console.log(`email login =`, data)
            authenticateUser(data)
          
        } else {
            let data = {
                mobile : fmobile.current.value,
                password : fpassword.current.value
            }
            console.log(`mobile login =`, data)
            authenticateUser(data)
        }
    } catch (err) {
        toast.error(err)
    }
  }

  const authenticateUser = async (user) => {
    await 
    axios
    .post(`/api/auth/login`, user)
    .then(res => {
      toast.success(res.data.msg)
      setIsLogin(res.data.success)
      setToken(res.data.token)
      // console.log(" = ", res.data.success)
      localStorage.setItem('CC_TOKEN', res.data.authToken)
      localStorage.setItem('CC_STATUS', res.data.success)

      window.location.href = '/'
      
      navigate('/')
    })
  .catch(err => toast.error(err.response.data.msg))
  }
  return (
    <div className='container'>
      <div className="row">
        <div className="col-md-12 text-center mt-3">
          <h3 className="display-3 text-secondary">Login</h3>
        </div>
      </div>
        {/* <div className="row login d-flex align-items-center">
          <div className="offset-lg-4 offset-xl-4 col-lg-4 col-xl-4 col-xxl-4 offset-xxl-4">
            <form action="" className='border p-3 rounded' style={{backgroundColor:'#EAE7D6'}}>
              <h2 className='text-center text-secondary fw-bold'>Login</h2>
              <div className="form-group ">
                <label htmlFor="" className='fw-bold'>Email</label>
                <input type="email" name="" className='form-control'placeholder='Enter Email' id="" />
              </div>
              <div className="form-group">
                <label htmlFor="" className='fw-bold mt-2'>Password</label>
                <input type="password" name="" className='form-control' placeholder='Enter Password' id="" />
              </div>
              <div className="form-group">
                <input type="submit" value="Submit" className='form-control btn btn-secondary mt-2' />
              </div>
            </form>
          </div>
      </div> */}
      <div className="row mt-3">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-header">
              <div className="btn-group d-flex justify-content-center">
                <button className="btn btn-info" onClick={() => viewHandler('email')}>Email</button>
                <button className="btn btn-danger" onClick={() => viewHandler('mobile')}>Mobile</button>
              </div>
            </div>
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler}>

                {view === 'email'?
                (<div className="form-group mt-2">
                  <label htmlFor="">Email</label>
                  <input type="email" name="email" id="email" ref={femail} className='form-control' required />
                </div>) 
                 :(<div className="form-group mt-2">
                  <label htmlFor="">Mobile</label>
                  <input type="number" name="mobile" id="mobile" ref={fmobile} className='form-control' required />
                </div>)}
                <div className="form-group mt-2">
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" id="password" ref={fpassword} className='form-control' required />
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Login" className='form-control btn btn-outline-info mt' />
                </div>
              </form>
            </div> 
            <div className="card-footer d-flex justify-content-between">
              <div className='text-start'>
                <NavLink to={'/generate/password'} className='btn btn-link'>Forget Password?</NavLink>
              </div>
                <p className="text-center text-danger">
                    <strong>Are you a new user</strong>
                    <NavLink to={`/register`} className='btn btn-link'>Register Here</NavLink>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
