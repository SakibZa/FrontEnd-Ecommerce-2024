import React from "react";
import Layout from "../components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Price } from "../components/Price";
import { useNavigate  } from "react-router-dom";
import LoadingGif from '../assests/Loading.gif';
import { useCart } from "../context/CartContext";

export default function HomePage() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [productPhotos, setProductPhotos] = useState({});
  const [filterData, setFilter] = useState([]);
  const [priceFilterData, setPriceFilterData] = useState([]);
  const [total , setTotal] = useState(0);
  const [loading , setLoading] = useState({});
  const [page, setPage] = useState(1);
  const data = localStorage.getItem("token");
  const parseData = JSON.parse(data);
  const token = parseData?.token;
  const navigate = useNavigate();

  const [cart , setCart] = useCart();
    console.log("productPhotos" , productPhotos)
    //get total

    const getTotal = async() =>{
      try{
        const {data} = await axios.get(`http://localhost:8000/api/v1/products/product-count`);
        setTotal(data.total);
      }catch(error){
        console.log(error);
      }
    }

  //get Product

  const getAllProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/products/get-product-page/${page}`
      );
      setProducts(data.products);
      getPhotos(data.products);
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

        if(productPhotos[product._id]){
          photos[product._id] = productPhotos[product._id];
          state[product._id] = true;
          continue;
        }
        const response = await axios.get(
          `http://localhost:8000/api/v1/products/product-photo/${product._id}`,
          {
            responseType: "arraybuffer", // Specify response type as arraybuffer for binary data
          }
        );
        const imageData = arrayBufferToBase64(response.data); // Convert array buffer to base64
        const dataUrl = `data:image/png;base64,${imageData}`; // Construct data URL
        photos[product._id] = dataUrl; // Store data URL
        state[product._id] = true; // Set loading state for each product
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
        photos[product._id] = ""; // If error occurs, store empty string
      }
    }
  
    setProductPhotos(photos);
    setLoading((prevState) =>( {...prevState, ...state}));
  };
  console.log("Loadin state", loading);

  const handleFilterPrice = (e) => {
    const value = e.target.value;
    const priceArray = value.split(",").map(Number);
    setPriceFilterData(priceArray);
  };
  const getAllCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/category/get-categories",
        {
          method: "GET",
          headers: {
            "x-access-token": token,
          },
        }
      );
      const result = await response.json();

      if (result?.success) {
        setCategory(result?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  // Function to convert array buffer to base64
  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  useEffect(() => {
    getAllCategory();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!priceFilterData.length || !filterData.length) {
      getAllProduct();
      getTotal();
    }
    //eslint-disable-next-line
  }, []);

  console.log("total is ", total);
  const handlecheckBoxItem = (checked, id) => {
    //agr check button hoga then usko state me add kr dega
    //agr jo checked false aayega usko state me remove kr dega
    if (checked) {
      setFilter([...filterData, id]);
    } else {
      setFilter(filterData.filter((c) => c !== id));
    }
  };

  const getFIlterProduct = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/products/filter-product",
        {
          checked: filterData,
          radio: priceFilterData,
        }
      );

      const result = response.data;
      console.log(result);
      setProducts(result.products);
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    if (priceFilterData.length || filterData.length) {
      getFIlterProduct();
     
    }
     //eslint-disable-next-line
  }, [priceFilterData[0], filterData.length]);

  const handleClearFilter = async () => {
    setFilter([]);
    setPriceFilterData([]);
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/products/get-product`
      );
      setProducts(data.products);
      getPhotos(data.products);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong in getting products");
    }
    // Clear the selected radio button by resetting its value in the DOM
    const radioButtons = document.getElementsByName("btnradio");
    radioButtons.forEach((button) => {
      button.checked = false;
    });
    const checkboxButtons = document.getElementsByName("checkbox");
    checkboxButtons.forEach((button) => {
      button.checked = false;
    });
  };

  const handleLoadmoredata = async ()=>{
    try{
      console.log("page value" , page);
      const {data} = await axios.get(`http://localhost:8000/api/v1/products/get-product-page/${page}`)
      const result = data.products;
      setProducts([...products, ...data.products])
      getPhotos([...products , ...result])
    }catch(err){
      console.log(err)
    }
  }
  const handleLoadmore = (e)=>{
    e.preventDefault();
    setPage(page + 1);
  }
  useEffect(()=>{
    handleLoadmoredata();
     //eslint-disable-next-line
  },[page])
  return (
    <Layout title={"Best Offer"}>
      <div className=" d-flex m-2 flex-wrap">
        <div className="col-md-3 " >
          <h4 className="text-center">Filter By Category</h4>
          {category?.map((item, index) => (
            <div
              className="btn-group d-flex flex-column m-2 "
              role="group"
              key={index}
            >
              <input
                type="checkbox"
                className="btn-check"
                id={`checkbox-${index}`}
                name="checkbox"
                onChange={(e) => handlecheckBoxItem(e.target.checked, item._id)}
              />
              <label
                className="btn btn-outline-primary "
                htmlFor={`checkbox-${index}`}
              >
                {item?.name}
              </label>
            </div>
          ))}

          <h4 className="text-center">Filter By Price</h4>
          <div className="d-flex flex-column">
            {Price.map((p, index) => (
              <div
                className="btn-group m-2"
                role="group"
                aria-label="Basic radio toggle button group"
                key={index}
              >
                <input
                  type="radio"
                  className="btn-check"
                  name="btnradio"
                  id={`btnradio-${index}`}
                  value={p.array}
                  onChange={handleFilterPrice}
                />
                <label
                  className="btn btn-outline-primary"
                  htmlFor={`btnradio-${index}`}
                >
                  {p.name}
                </label>
              </div>
            ))}
            <div className="btn btn-danger m-2" onClick={handleClearFilter}>
              Clear Filter
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="d-flex flex-wrap">
            {products.map((product) => (
              <div
                className="card m-2"
                style={{ width: "18rem" }}
                key={product._id}
              >
                {console.log("Sakib Husain Zaidi", loading[product._id])}
                <img
                  src={loading[product._id] ? productPhotos[product._id] : LoadingGif }
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description.substring(0, 30)}...</p>
                  <p className="card-text">${product.price}</p>
                  <button className="btn btn-primary ms-1" onClick = {()=>navigate(`/product-details/${product.slug}/${product._id}`)}>More Details</button>
                  <button className="btn btn-secondary ms-1" onClick={() => {
                    setCart([...cart , product])
                    localStorage.setItem('cart' , JSON.stringify([...cart , product]) )
                    toast.success("Item Added to cart")
                    }}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {
  !(filterData.length > 0 || priceFilterData.length > 0) && (products && products.length < total) && (
    <div className="col-md-3 m-2">
      <button className="btn btn-warning" onClick={handleLoadmore}>
        Load More
      </button>
    </div>
  )
}
           
        </div>
      </div>
    </Layout>
  );
}
