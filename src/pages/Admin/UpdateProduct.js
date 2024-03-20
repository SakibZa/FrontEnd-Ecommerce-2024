import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { toast } from "react-hot-toast";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import LoadingGif from '../../assests/Loading.gif'

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");
  const [productPhotos, setProductPhotos] = useState("");
  const [loading , setLoading] = useState(false);
  const data = localStorage.getItem("token");
  const parseData = JSON.parse(data);
  const token = parseData?.token;

    //get single product

    const getSingleProduct = async () =>{
        try{
            const { data } = await axios.get( `http://localhost:8000/api/v1/products/get-product/${params.slug}` )
            setId(data.product._id)
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            setCategory(data.product.category._id);


            
    }
    catch(err)
    {
        console.log(err);
        
    }
}

useEffect(()=>{
    
    getSingleProduct();
    //eslint-disable-next-line
},[])
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
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("category", category);
      photo && formData.append("photo", photo);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("quantity", quantity);
      formData.append("price", price);
      formData.append("shipping", shipping);
       
      const response = await fetch(`http://localhost:8000/api/v1/products/update-product/${id}`, {
        method: "PUT",
        headers:{
          "x-access-token": token
        },
        body: formData
      })
      const result = await response.json();
      if (result.success) {
        toast.success("Product Updated Successfully");
        navigate('/dashboard/admin/products');
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
 
   const handleDelete = async()=>{
    try{
            let answer = window.prompt('Are you sure you want to delete');
            if(!answer) return ;
            const result = await axios.delete(`http://localhost:8000/api/v1/products/product-delete/${id}`,{
            headers:{
                "x-access-token": token
            }
        })
       toast.success("Product Deleted Successfully")
        navigate('/dashboard/admin/products');

    }catch(err)
    {
        console.log(err);
        toast.error("something went wrong")
    }
   }

   
   const getPhotos = async () => {
    setLoading(true)
    let dataUrl = "";
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/products/product-photo/${id}`, {
          responseType: 'arraybuffer', // Specify response type as arraybuffer for binary data
        });
        const imageData = arrayBufferToBase64(response.data); // Convert array buffer to base64
         dataUrl = `data:image/png;base64,${imageData}`; // Construct data URL
      } catch (error) {
        console.log(error);
        dataUrl = ""; // If error occurs, store empty string
      }
    setProductPhotos(dataUrl);
    setLoading(false)
  };
   
  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };
  

  console.log("product Photos", productPhotos);

  useEffect(()=>{
     if(id){
    getPhotos();
     }

  },[id])

  useEffect(() => {
    getAllCategory();
  }, []);


  return (
    <Layout title={"Update Product-Ecommerce App"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-6">
            <form onSubmit={handleUpdate}>
            <div className="m-1">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setCategory(e.target.value);
                
                }}
                value = {category}
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
                    <div className="text-center">
                    <img
                      src={ loading ? LoadingGif : productPhotos}
                      alt="product_photo"
                      height="200px"
                      className="img img-responsive"
                    />
                  </div>
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

              <select className="form-select" aria-label="Default select example" onChange={(e) => setShipping(e.target.value)} value = {shipping}>
                <option value = "">Select Shipping</option>
                <option value= "true">Yes</option>
                <option value= "false">No</option>
                
              </select>
            </div>
           
              <div className="mb-3">
            
               <button className = "btn btn-primary" > Update Product</button>

              </div>
             
              </form>
              <div className="mb-3">
              <button className = "btn btn-danger" onClick={handleDelete} > Delete Product</button>
              </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct
