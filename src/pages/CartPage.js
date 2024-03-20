import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingGif from "../assests/Loading.gif";
import axios from "axios";
import { useState } from "react";
const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [productPhotos, setProductPhotos] = useState({});
  const [loading, setLoading] = useState({});
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
 
  const handleCardPayment = (e) => {
    e.preventDefault();
    try {
      setShowLoading(true);
      setTimeout(async () => {
        try {
          const response = await fetch('http://localhost:8000/api/v1/Order/place-order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': auth?.token
            },
            body: JSON.stringify({
              user: auth?.user?.id,
              products: cart.map((p) => p._id)
            })
          });
          const result = await response.json();
          if(result?.success){
            localStorage.removeItem('cart')
            setCart([]);
            setShowLoading(false);
            navigate('/dashboard/user/orders');
          }
          
        } catch (error) {
          console.log(error);
          setShowLoading(false); // Ensure loading state is set to false even in case of an error
        }
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  

  const getPhotos = async (products) => {
    const photos = {};
    setLoading({});
    const state = {};

    for (const product of products) {
      try {
        if (productPhotos[product._id]) {
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
        photos[product._id] = ""; // If error occurs, store empty string
      }
    }

    setProductPhotos(photos);
    setLoading((prevState) => ({ ...prevState, ...state }));
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => (total = total + item.price));
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPhotos(cart);
  }, [cart?.length]);
  
 if(showLoading){
  return(
    <div className="d-flex flex-column flex-wrap justify-content-center align-items-center">
    <img src={LoadingGif} alt="Loading..." />
    <p>Payment is processing...</p>
    <small>Dont refresh the page or close the tab</small>
  </div>
  );

 }

  return (
    <Layout>
        <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {auth?.token && auth?.user?.name} Cart
            </h1>
            <h4 className="text-center">
              {cart?.length > 1
                ? ` ${cart.length}Product in your cart`
                : "No products in your cart"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 flex-row card">
                <div className="col-md-4">
                  <img
                    src={loading[p._id] ? productPhotos[p._id] : LoadingGif}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description}</p>
                  <p>Rs. ${p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 ">
            <h4>Cart Summary</h4>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total {totalPrice()}:</h4>
            <hr />
            <h5>Current Add: {auth?.user?.address}</h5>
            {auth?.token ? (
              <button
                className="btn btn-warning"
                onClick={() => navigate("/dashboard/user/profile")}
              >
                Update Address
              </button>
            ) : (
              <button
                className="btn btn-warning"
                onClick={() => navigate("/login")}
              >
                Please Login
              </button>
            )}
            <hr />
            <br />
            <br />

            <div>
             
              {auth?.token ? 
                 
               <form onSubmit={handleCardPayment}>
                <h4>Payment Details</h4>
                <div className="form-group">
                  <input
                    type="number"
                    className="form-control mb-4"
                    id="exampleInputCard1"
                    aria-describedby="emailHelp"
                    placeholder="Card Number"
                    required
                  />
                  <div className="form-group ">
                    <input
                      type="text"
                      className="form-control mb-4"
                      id="exampleInputText"
                      aria-describedby="textHelp"
                      placeholder="Name"
                      required

                    />
                  </div>

                  <div className="d-flex flex-row mb-4 ">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Valid Thru"
                        required
                      />
                    </div>
                    <div className="col-md-6 ">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="CVV"
                        required
                      />
                    </div>
                  </div>
                  <button className="btn btn-secondary mb-2">Make a Payment</button>
                </div>
              </form>
              
              : ""}
              
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
