import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [valueofName, setValueofName] = useState("");
  const [idOfCategory, setIdofCategory] = useState(0);
  const [inputData , setInputdata] = useState(valueofName)
  //handleForm
  const data = localStorage.getItem("token");
  const parseData = JSON.parse(data);
  const token = parseData?.token;

  console.log("inputData", inputData)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/category/create-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ name }),
        }
      );
      const data = await response.json();

      if (data?.success) {
        setCategories([...categories, data?.category]);
        toast.success(`${name} is created`);
        setName("");
        setModalVisible(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating category");
    }
  };

  // Function to toggle modal visibility
  const toggleModal = (data) => {
    setValueofName(data.name);
    setIdofCategory(data._id);
    setModalVisible(!modalVisible);
  };
  const onHide = () => {
    setModalVisible(false);
  }

  //get all Category
  const getAllCategory = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/category/get-categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();

      if (result.success) {
        setCategories(result.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/category/update-category/${idOfCategory}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify({ name: inputData }),
        }
      );
  
      const result = await response.json();
      if (result.success) {
        const updatedCategories = categories.map((category) => {
          if (category._id === idOfCategory) {
            return { ...category, name: inputData };
          }
          return category;
        });
        setCategories(updatedCategories);
  
        toast.success("Category updated successfully");
        onHide(); 
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in updating category");
    }
  };

  const handleDeleteCategory = async (id) => {
   
    const response = await fetch(`http://localhost:8000/api/v1/category/delete-category/${id}`, {
       method : "DELETE",
       headers : {
           "Content-Type" : "application/json",
           "x-access-token" : token
       }
    })
     const result = await response.json();
     if(result.success){
        const updatedCategories = categories.filter((category)=> category._id !== id)
        setCategories(updatedCategories);
     }
  }
  
  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Create Category-Ecommerce App"}>
      {modalVisible && (<Modal show={true} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form  onSubmit={handleUpdateData}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Update Data</label>
            <input value={inputData} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setInputdata(e.target.value)}/>
            <button className='btn btn-primary' >Save changes</button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Close</Button>
        
      </Modal.Footer>
    </Modal>)}

  
        <div className="d-flex m-2 p-3 flex-row gap-4 flex-wrap">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-6">
            <h4>Manage Category</h4>
            <div className="p3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {categories &&
                      categories.map((c) => (
                        <tr key={c._id}>
                          <td>{c.name}</td>
                          <td>
                            <button
                              className="btn btn-primary"
                              onClick={() => toggleModal(c)}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button className="btn btn-danger" onClick = {() => handleDeleteCategory(c._id)} >Delete</button>
                          </td>
                        </tr>
                      ))}
                  </>
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
    </Layout>
  );
};

export default CreateCategory;
