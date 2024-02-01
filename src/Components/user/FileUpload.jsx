import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'

const FileUpload = () => {
    const [files, setFiles] = useState(false)
    const [loader, setLoader] = useState(false)

    const {token} = useContext(AuthContext)
    const navigate = useNavigate()

    const fileUpload = async (e) => {
        try {
            const fileData=e.target.files[0]
        if(!fileData){
            toast.warning('File input should not be empty')
        }else if(fileData.size>10*1024*1024){
            toast.warning('file size should not exceed 10mb')
        }else{
            setFiles(fileData)
        }
        }catch(err){
        toast.error(err.mesaage)
    }
    }
     
    // const submitHandler = async (e) => {
    //     e.preventDefault()
    //     try {
    //         let formData = new FormData()
    //         formData.append('product', files)
    //         setLoader(true)

    //         await axios
    //         .post(`/api/file/upload`, formData, {
    //             headers : {
    //                 'Content-Type' : 'multi[art/form-data',
    //                 Authorization : token
    //             }
    //         })
    //         .then(res => {
    //             setLoader(false)
    //             setFiles(false)
    //             toast.success(res.data.msg)
    //             navigate(`/user/dashboard`)
    //         })
    //         .catch(err => toast.error(err.response.data.msg))
    //     } catch (err) {
    //         toast.error(err.message)
    //     }
    // }
    const submitHandler=async(e)=>{
        e.preventDefault()
        try{
          let formData=new FormData();
          formData.append("product", files)
          setLoader(true)
      
          await axios.post(`/api/file/upload`,formData,{
            headers:{
              "Content-Type":"multiformat/form-data",Authorization:token
            }
          }).then(res=>{
            setLoader(false)
            setFiles(false)
            toast.success(res.data.msg)
            navigate('/user/dashboard')
          })
          .catch(err=> {
            setLoader(false)
            setFiles(false)
            toast.error(err.response.data.msg)
        })
        }catch(err){
            toast.error(err.message)
      }
    }
  return (
    <div className="container">
        <div className="row">
            <div className="col-md-12 text-center">
                <h3 className="display-3 text-success">
                    FileUpload
                </h3>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4 offset-md-4 col-lg-4 offset-lg-4 col-sm-12 offset-sm-4">
                <div className="card bg-dark text-light text-center">
                    <div className="card-body">
                        {
                            loader ? (
                                <div className="spinner-border" style={
                                    {
                                        width : '3rem',
                                        height : '3rem'
                                    }
                                } role='status'>
                                    <span className='visually-hidden'></span>
                                </div>
                            ) : (
                            <form action="" onSubmit={submitHandler}>
                                <div className="form-group my-2 mb-3">
                                    <input type="file" name="product" className='form-control' id="product" required hidden onChange={fileUpload}/>
                                    <label htmlFor="product" className='display-4'>
                                        {
                                            files ? files.name : "Upload File"
                                        }
                                        <i className="bi bi-cloud-upload ms-2 fs-2"></i>
                                    </label>
                                </div>
                                <div className="form-group mt-2">
                                    <input type="submit" value="upload" className='btn btn-success' />
                                </div>
                            </form>
                            )
                        }
                    </div>  
                </div>
            </div>
        </div>
    </div>
  )
}

export default FileUpload