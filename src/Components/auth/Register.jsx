import React, {useRef} from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const Register = () => {
  const fname = useRef()
  const femail = useRef()
  const fmobile = useRef()
  const fpassword = useRef()

  // to navigate 
  const navigate = useNavigate()

  const submitHandler = async(e) => {
    e.preventDefault();
    try {
      let data = {
        name : fname.current.value,
        email : femail.current.value,
        mobile : fmobile.current.value,
        password : fpassword.current.value
      }
      console.log('register ',data)
      await 
      axios.post('/api/auth/register', data)
      .then((res) => {
        toast.success(res.data.msg)
        navigate('/login')
      });
    } catch (err) {
      console.log(err)
      toast.error(err)
    }
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center mt-2">
          <h3 className="display-3 text-secondary">Register</h3>
        </div>
      </div>
      <div className="row my-2">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form autoComplete="off" onSubmit={submitHandler}>
              <div className="form-group mt-2">
                  <label htmlFor="">Name</label>
                  <input type="text" name="name" id="name" className='form-control' required ref={fname} />
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="">Email</label>
                  <input type="email" name="email" id="email" className='form-control' required ref={femail}/>
                </div>
                 <div className="form-group mt-2">
                  <label htmlFor="">Mobile</label>
                  <input type="number" name="mobile" id="mobile" className='form-control' required ref={fmobile}/>
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" id="password" className='form-control' required ref={fpassword} />
                </div>
                <div className="form-group mt-2">
                  <input type="submit" value="Register" className='form-control btn btn-outline-info mt' />
                </div>
              </form>
            </div>
            <div className="card-footer">
              <p className="text-end"><b className='me-2'>Already Registered</b>
                <NavLink to={'/login'}>Login Here</NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
</div>
)
}


export default Register  
