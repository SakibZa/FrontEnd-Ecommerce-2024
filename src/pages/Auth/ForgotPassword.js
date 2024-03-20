import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [question, setQuestion] = useState("");
    const history = useNavigate();
    const [Showpassword, setShowPassword] = useState(false);
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/v1/auth/forgot-password",{
            

           method : "POST",
           headers:{
            "Content-Type" : "application/json"
           },
           body:JSON.stringify({
            email,
            newPassword,
            question
           })
        })
        const result = await response.json();
        if(result.success){
            toast.success('Password Changed Successfully');
         history('/login')
        }
        else{
            toast.error(result.message);
        }
    }

    const handleShowPassword = async (event) =>{
        setShowPassword(!Showpassword);
    }
    return (
    <Layout title={'ForgotPassword-Ecommerce App'}>
        
    <div className="Register">
      <h1>Forgot-Password</h1>
      <form className="border border-secondar " onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e)=>{setEmail(e.target.value)}}
            required
            value={email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Secret Key</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputSecretKey"
            aria-describedby="emailHelp"
            placeholder="Enter Your Secret Key"
            onChange={(e)=>{setQuestion(e.target.value)}}
            required
            value={question}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="exampleInputPassword1">New Password</label>
          <input
            type= {Showpassword ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e)=>{setNewPassword(e.target.value)}}
            required
            value={newPassword}
          />
        </div>
        <div className=" form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={handleShowPassword}/>
     <label className="form-check-label" htmlFor="exampleCheck1">Show Passowrd</label>
     </div>
        <button type="submit" className="btn btn-primary ">
          Submit
        </button>
      </form>
    </div>
        
        </Layout>
  )
}
