import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Helmet from "react-helmet";
import  { Toaster } from 'react-hot-toast';
export default function Layout({
  children,
  title,
  description,
  author,
  keywords,
}) {
  return (
    <div className="layout">
      <Helmet>
        <meta charSet="UTF-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />
      <main> {children}</main>
      <Footer />
      <Toaster/>
    </div>
  );
}
Layout.defaultProps = {

  title: "Ecommerce App - shop now",
  description: "Ecommerce description",
  keywords : "mern, react, node, mongodb",
  author: "Sakib Husain Zaidi"
}
