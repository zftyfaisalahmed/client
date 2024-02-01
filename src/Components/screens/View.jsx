import React, { useContext, useState, useCallback, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import axios from 'axios'
import { toast } from 'react-toastify';

const View = () => {
  const url = "https://rest-api1-vcpc.onrender.com";

  const [file, setFile] = useState(false)
  const { token } = useContext(AuthContext)
  const params = useParams()


  const readFile = useCallback(() => {
      const readData = async () => {
          await axios
          .get(`/api/file/single/${params.id}`, {
            headers: {
              Authorization: token
            }
          }).then(res => {
              setFile(res.data.file)
          })
          .catch(err => toast.error(err.response.data.msg))
      }
      readData()
  },[])

  useEffect(() => {
    readFile()
  },[])

  return (
    <div className='container'>
        <div className="row">
            <div className="col-md-12 text-center">
                 View Document
            </div>
        </div>

        <div className="row">
          <div className="col-md-12">
              <div className="card">
                <div className="card-body w-100">
                  {
                     file.extName === ".png" || file.extName === ".jpg" || file.extName === ".jpeg" ? <img src={`${url}/${file.newName}`} className='img-fluid' /> : null
                  }
                  {
                    file.extName === ".pdf"  ? <embed src={`${url}/${file.newName}`} className='img-fluid' style={{ width: '100vw',height: '70vh'}} /> : null
                  }
                  {
                    file.extName === ".docx"  ? <embed src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}/${file.newName}`} className='img-fluid' style={{ width: '100vw',height: '70vh'}} /> : null
                  }
                  {
                     file.extName === ".pptx" || file.extName === ".pdf" || file.extName === ".ppt" || file.extName === ".doc" || file.extName === ".xls" || file.extName === ".xlsx" ? <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${url}/${file.newName}`} className='img-fluid' style={{ width: '100vw',height: '80vh'}}></iframe> : null
                  }
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default View