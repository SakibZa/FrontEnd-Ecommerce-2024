import React from "react";
import Layout from "../components/Layout/Layout";
import Aboutus from "../assests/Aboutus.jpg";
export default function About() {
  return (
    <Layout title = {'About Us-Ecommerce APP'}>
      <div className="aboutus-container">
        <div className="image">
          <img src={Aboutus} alt="contact us" />
        </div>

        <div className="aboutus">
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
           . 
           There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
          </p>
        </div>
      </div>
    </Layout>
  );
}
