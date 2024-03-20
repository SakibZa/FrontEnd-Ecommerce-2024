import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/SearchContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingGif from '../assests/Loading.gif';

const SearchPage = () => {
  const [ value ] = useSearch();
  const [loading , setLoading] = useState({});
  const products = value.result;
  const [productPhotos, setProductPhotos] = useState({});
  const navigate = useNavigate();
  const getPhotos = async (products) => {
    const photos = {};
    setLoading({}); // Reset loading state
    const state = {};
    for (const product of products) {

      if(productPhotos[product._id]){
        photos[product._id] = productPhotos[product._id];
        state[product._id] = true;
        continue;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/products/product-photo/${product._id}`,
          {
            responseType: "arraybuffer", // Specify response type as arraybuffer for binary data
          }
        );
        const imageData = arrayBufferToBase64(response.data); // Convert array buffer to base64
        const dataUrl = `data:image/png;base64,${imageData}`; // Construct data URL
        photos[product._id] = dataUrl; // Store data URL
        state[product._id] = true;
      } catch (error) {
        console.log(error);
        photos[product._id] = ""; // If error occurs, store empty string
      }
    }
    setProductPhotos(photos);
    setLoading((prevState) =>( {...prevState, ...state}));
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  console.log("productPhotos", productPhotos);

  useEffect(() => {
    getPhotos(products);
    //eslint-disable-next-line
  }, [products[0]]);

  return (
    <Layout>
      <h1 className="text-center">All Search Products</h1>
      <div className="d-flex flex-row flex-wrap justify-content-center align-items-center">
      {products?.map((result) => (
        <div className="card m-3" style={{ width: "18rem" }} key={result?._id}>
          <img
            className="card-img-top"
            src = {loading[result._id] ? productPhotos[result._id] : LoadingGif }
            alt={result?.name}
          />
          <div className="card-body">
            <h5 className="card-title">{result?.name}</h5>
            <p className="card-text">{result?.description}</p>
            <p className="card-text">
              <b>Price</b> : ${result?.price}
            </p>
            <button className="btn btn-primary ms-1" onClick = {()=>navigate(`/product-details/${result.slug}/${result._id}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1">
                    Add to cart
                  </button>
          </div>
        </div>
      ))}
      </div>
    </Layout>
  );
};

export default SearchPage;
