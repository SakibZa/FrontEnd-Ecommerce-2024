import React from "react";
import { useSearch } from "../context/SearchContext";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchInput = () => {
  const [value, setValue] = useSearch();
  const Navigate = useNavigate();
  const handleSearch = async (e) => {
   try {
      e.preventDefault();
      const { keyword } = value;
      const {data} = await axios.get(`https://e-commerce-2024-2.onrender.com/api/v1/products/search/${keyword}`)
      setValue({...value, result : data.products})
      const inptKeyword = document.getElementsByName("keyword");
      inptKeyword[0].value = "";
       Navigate('/search');
      console.log("value", value);
   } catch (error) {
    console.log(error);
   }
     
  };
  return (
    <>
      <input
        className="form-control mr-sm-2"
        type="search"
        name = "keyword"
        placeholder="Search"
        aria-label="Search"
        onChange={(e)=>setValue({...value, keyword: e.target.value})}
      />
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={handleSearch}
      >
        Search
      </button>
    </>
  );
};

export default SearchInput;
