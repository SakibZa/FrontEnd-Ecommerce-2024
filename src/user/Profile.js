import React, { useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import UserMenu from '../components/Layout/UserMenu';
import { useState } from "react";
import toast  from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState("");
  const [token , setToken] = useState('');
  const [Showpassword, setShowPassword] = useState(false);
  const [auth , setAuth] = useAuth();

  const handleShowPassword = async (event) =>{
    
    setShowPassword(!Showpassword);
   }
  const initialTimeData = () =>{
   
      setName(auth?.user?.name);
      setEmail(auth?.user?.email);
      setPhone(auth?.user?.phone);
      setAddress(auth?.user?.address);
      setId(auth?.user?.id);
      setToken(auth?.token); 
  } 

 console.log("id is", id,"typeof", typeof(id));
 console.log("Name", name);
 console.log("password",password)


 const updateUserData = async (e) => {
  e.preventDefault();

  const response = await fetch(`http://localhost:8000/api/v1/auth/update-user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token
    },
    body: JSON.stringify({
      name,
      password,
      phone,
      address
    })
  });

  const result = await response.json();
  if (result.success) {
    toast.success(result.message);
    let userData = JSON.parse(localStorage.getItem("token")); // Parse the stored data
    if (userData) {
      if (result.name && result.phone && result.address) {
        
        userData.user.name = result.name;
        userData.user.phone = result.phone;
        userData.user.address = result.address;
       
        localStorage.setItem("token", JSON.stringify(userData));
    
        setAuth({
          ...auth,
          user: userData.user
        });
      } else {
        console.error("Incomplete user data received from the server.");
        
      }
    }
  } else {
    console.error("API request failed:", result.error);
   
  }
};


  useEffect(()=>{

    initialTimeData();
  },[])

  console.log("name" , name)
  console.log("email", email);

  return (
    <Layout title={'Profile-Ecommerce App'}>
            <div className="d-flex justify-content-center">
                <div className="col-md-3">
                   <UserMenu/>
                </div>
                <div className="col-md-9">
                  
                  <h1 className='text text-center'>Update Profile</h1>
                  
                  
                    <div className="Register">
        <form className="border border-secondar "  onSubmit={updateUserData}>
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
              disabled
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
      <input type="checkbox" className="form-check-input" id="exampleCheck1"  onClick={handleShowPassword} />
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

         
          <button type="submit" className="btn btn-primary">
            Update 
          </button>
          <br/>
        </form>
      </div>
                  
                  
                  
                  </div>
            </div>
    </Layout>
  )
}

export default Profile
