import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingGif from '../../assests/Loading.gif'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productPhotos, setProductPhotos] = useState({});
  const [loading , setLoading] = useState({});
  const getAllProduct = async () => {
    try {
      const response = await fetch(
        "https://e-commerce-2024-2.onrender.com/api/v1/products/get-product",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      if (result.success) {
        setProducts(result.products);
        // Fetch photos after products are fetched
        getPhotos(result.products);
        toast.success("Products Fetched Successfully");
      } else {
        toast.error("Something went wrong in getting products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting products");
    }
  };

  
  const getPhotos = async (products) => {
    const photos = {};
    setLoading({}); // Reset loading state
    const state = {};
    for (const product of products) {
      try {
        const response = await axios.get(`https://e-commerce-2024-2.onrender.com/api/v1/products/product-photo/${product._id}`, {
          responseType: 'arraybuffer', // Specify response type as arraybuffer for binary data
        });
        const imageData = arrayBufferToBase64(response.data); // Convert array buffer to base64
        const dataUrl = `data:image/png;base64,${imageData}`; // Construct data URL
        photos[product._id] = dataUrl; // Store data URL
        state[product._id] = true; 
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        photos[product._id] = ""; // If error occurs, store empty string
      }
    }
    setProductPhotos(photos);
    setLoading((prevState) =>( {...prevState, ...state}));
  };
  
  // Function to convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  
  

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <Layout>
      <div className="d-flex m-2 p-3 flex-wrap">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">All Products list</h1>
          <div className="d-flex flex-row flex-wrap">
            {products.map((product) => (
              <Link
                to={`/dashboard/admin/product/${product.slug}`}
                className="product-link"
                key={product._id}
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                   src={loading[product._id] ? productPhotos[product._id] : LoadingGif }
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
