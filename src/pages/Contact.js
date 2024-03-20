import React from 'react'
import Layout from '../components/Layout/Layout'
import contactus from '../assests/contactus.jpg'
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaHeadphonesSimple } from "react-icons/fa6";
export default function Contact() {
  return (
    <Layout  title = {'Contact Us-Ecommerce APP'}> 
    
    <div className='contact-container'>
    
      <div className="image">
         <img src = {contactus} alt ='contact us'/>
      </div>

       <div className="contactus">

        <h1>contact us</h1>
        <p>any query and info about product feel free to call anytime
          we 24x7 available for you
        </p>
        <p><MdOutlineEmail/>:www.help@ecommerceapp.com</p>
        <p><FaPhoneVolume/>: 012-3456789</p>
        <p><FaHeadphonesSimple/>1800-0000-0000 (toll free)</p>
       </div>

    </div>

    </Layout>
  )
}
