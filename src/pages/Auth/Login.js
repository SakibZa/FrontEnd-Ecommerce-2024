import React from 'react'
import { useState } from 'react'
import Layout from '../../components/Layout/Layout';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
    
    const [auth, setAuth] = useAuth();
    const history = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [Showpassword, setShowPassword] = useState(false);
    const handleSubmit = async(e)=>{
        e.preventDefault();

        const response = await fetch("http://localhost:8000/api/v1/auth/login",{
            

           method : "POST",
           headers:{
            "Content-Type" : "application/json"
           },
           body:JSON.stringify({
            email,
            password
           })
        })
        const result = await response.json();
        if(result.success){
            toast.success('User Login Succesfully');
            setAuth({
                ...auth,
                user: result.user,
                token : result.token
            })
         
         const stringToken = JSON.stringify(result)
         localStorage.setItem("token", stringToken);
         history(location.state || '/')
        
            
            
        }
        else{
            toast.error(result.message);
        }
    }

     const handleShowPassword = async () =>{
        
        setShowPassword(!Showpassword);
     }
  

  return (
    <Layout title={"Login Ecommerce-App"}>
    <div className="Register">
      <h1>Login</h1>
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
        <div className="form-group mb-2">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type={Showpassword ? "text" : "password"}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e)=>{setPassword(e.target.value)}}
            required
            value={password}
          />
        </div>
        <div className=" form-check">
      <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={handleShowPassword}/>
     <label className="form-check-label" htmlFor="exampleCheck1">Show Passowrd</label>
     </div>
        <button type="submit" className="btn btn-primary ">
          Submit
        </button>
        <br />
        <small className="AlreadyRegisterd"><Link to='/forgot-password'>forgot Password</Link></small>
      </form>
    </div>
  </Layout>
  )
}
