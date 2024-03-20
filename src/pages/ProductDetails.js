import React from "react";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loadinggif from '../assests/Loading.gif';
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [productPhotos, setProductPhotos] = useState({});
  const [isLoading , setLoading] = useState(false);
  const { slug , id } = useParams();
  const [cart , setCart] = useCart();
  const productDetails = async () => {
    const { data } = await axios.get(
      `https://e-commerce-2024-2.onrender.com/api/v1/products/get-product/${slug}`
    );
    setProduct(data.product);
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  const getPhotos = async () => {
    setLoading(true)
    const photos = {};
      try {
        const response = await axios.get(
          `https://e-commerce-2024-2.onrender.com/api/v1/products/product-photo/${id}`,
          {
            responseType: "arraybuffer", 
          }
        );
        const imageData = arrayBufferToBase64(response.data);
        const dataUrl = `data:image/png;base64,${imageData}`;
        photos[id] = dataUrl; 
        setLoading(false)
      } catch (error) {
        console.log(error);
        photos[id] = ""; 
      }
    
    setProductPhotos(photos);
  };
 
  useEffect(() => {
    getPhotos();
    productDetails();
  }, [slug]);
  return (
    <Layout>
      <div className="row m-2">
      <div className="col-sm-4"><h1>Product Details</h1></div>
  <div className="col-sm-8">
  
  <div className="card" style={{width: '18rem'}}>
  <img className="card-img-top" src= {isLoading ? Loadinggif :  productPhotos[id] }  alt={product?.name} />
  <div className="card-body">
    <h5 className="card-title"><b>Category:</b>{product?.category?.name}</h5>
    <p className="card-text"><b>Name:</b>{product?.name}</p>
    <p className="card-text"><b>description:</b>{product?.description}</p>
    <p className="card-text"><b>Price :</b>${product?.price}</p>
    <button href="#" className="btn btn-secondary" 
    
    onClick={() => {
      setCart([...cart , product])
      localStorage.setItem('cart' , JSON.stringify([...cart , product]) )
      toast.success("Item Added to cart")
      }}
    >Add to Cart</button>
  </div>
</div>


  </div>
  
</div>
        
       
    </Layout>
  );
};

export default ProductDetails;


