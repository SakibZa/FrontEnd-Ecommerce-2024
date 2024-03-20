import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const CraeteProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

  const data = localStorage.getItem("token");
  const parseData = JSON.parse(data);
  const token = parseData?.token;


  //get all category
  const getAllCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/category/get-categories",
        {
          method: "GET",
          headers: {
            "x-access-token": token
          },
        }
      );
      const result = await response.json();

      if (result?.success) {
        setCategories(result?.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", category);
      formData.append("photo", photo);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("shipping", shipping);
       
      const response = await fetch("http://localhost:8000/api/v1/products/create-product", {
        method: "POST",
        headers:{
          "x-access-token": token
        },
        body: formData
      })
      const result = await response.json();
      if (result.success) {
        toast.success("Product Created Successfully");
        navigate('/dashboard/admin/products');
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Create Product-Ecommerce App"}>
        <div className="d-flex m-2 p-3 flex-row gap-4 flex-wrap">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-6">
            <form onSubmit={handleCreateProduct}>
            <div className="m-1">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}> {c.name}</option>
                ))}
              </Form.Select>
              <div className="mb-5">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "upload photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo ? (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height="200px"
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <textarea
                  value={description}
                  placeholder="Write a description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="Number"
                  value={price}
                  placeholder="Write a Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <input
                  type="Number"
                  value={quantity}
                  placeholder="Write a Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>

              <select className="form-select" aria-label="Default select example" onChange={(e) => setShipping(e.target.value)}>
                <option value = "">Select Shipping</option>
                <option value= "true">Yes</option>
                <option value= "false">No</option>
                
              </select>
            </div>
           
              <div className="mb-3">
            
               <button className = "btn btn-primary" > Create Product</button>

              </div>
              </form>
          </div>
        </div>

    </Layout>
  );
};

export default CraeteProduct;
