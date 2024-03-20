import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import UserMenu from "../components/Layout/UserMenu";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Orders = () => {
  const [auth] = useAuth();
  const [detail, setDetails] = useState([]);
  let inc = 0;
  let totalPrice = 0;
  const orderDetails = async () => {
    try {
      const details = await fetch(
        `https://e-commerce-2024-2.onrender.com/api/v1/Order/order-details/${auth?.user?.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": auth?.token,
          },
        }
      );

      const result = await details.json();
      if (result.success) {
        toast.success(result.message);
        setDetails(result);
        console.log(result);
        console.log(detail.orderDetails);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    orderDetails();
    //eslint-disable-next-line
  }, []);

return (
  <Layout title={'Orders-Ecommerce App'}>
    <div className="d-flex flex-row flex-wrap m-2 p-2">
      <div className="col-md-3 ml-5">
        <UserMenu/>
      </div>
      <div className="col-md-9">
        {detail.orderDetails && detail.orderDetails.length > 0 ? (
          <>
            <h1>{detail.orderDetails[0].user.name}'s Orders List</h1>
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th scope="col">Sr No </th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                { detail.orderDetails.map((order, index) => (
                

                  <React.Fragment key={order._id}>
                    {order.products.map((product, productIndex) => (
                      <tr key={product._id}>
                        <th scope="row">{++inc}</th>
                        <td>{product.name}</td>
                        <td>{product.price}</td>
                        {totalPrice += product.price}
                      </tr>
                    ))}
                    
                  </React.Fragment>
                ))}
                <br/>
                 <tr key={inc}>
                        <th scope="row">Total Price</th>
                        <td>==========</td>
                        <td>{totalPrice}</td>
                      </tr>

              </tbody>
            </table>
          </>
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  </Layout>
);

};
export default Orders;
