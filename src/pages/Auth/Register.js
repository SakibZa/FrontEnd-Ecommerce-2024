import Layout from "../../components/Layout/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast  from 'react-hot-toast';

export default function Register() {
   
  
  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");
  const [Showpassword, setShowPassword] = useState(false);
  const location = useNavigate();

   const handleSubmit = async(e)=>{
    e.preventDefault();
      const response = await fetch("https://e-commerce-2024-2.onrender.com/api/v1/auth/register",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          address,
          question
        }),
      });

      const data = await response.json();
      if(data.success){
        toast.success('User Registered Successfully');
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");

        setTimeout(()=>{
          location('/login');
        },2000);
      }
     
   }

   const handleShowPassword = async (event) =>{
    
    setShowPassword(!Showpassword);
   }

  return (
    <Layout title={"Register Ecommerce-App"}>
      <div className="Register">
        <h1>Register Page</h1>
        <form className="border border-secondar " onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              placeholder="Enter Name"
              onChange={(e)=>{setName(e.target.value)}}
              required
              value={name}
            />
          </div>
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

          <div className="form-group">
            <label htmlFor="exampleInputPhone">Phone</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Phone Number"
              onChange={(e)=>{setPhone(e.target.value)}}
              required
              value={phone}
            />
          </div>
          <div className="form-group mb-1">
            <label htmlFor="exampleInputAddress">Address</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Address"
              onChange={(e)=>{setAddress(e.target.value)}}
              required
              value={address}
            />
          </div>

          <div className="form-group mb-1">
            <label htmlFor="exampleInputAddress">Secret key</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputAddress1"
              placeholder="Fill this secret key for reset password"
              onChange={(e)=>{setQuestion(e.target.value)}}
              required
              value={question}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <br/>
          <small className="AlreadyRegisterd">Already registerd ?<Link to = '/login'> Login</Link></small>
        </form>
      </div>
    </Layout>
  );
}
