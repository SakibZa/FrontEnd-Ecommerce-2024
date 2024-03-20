import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from'react-router-dom'
export default function Pagenotfound() {
  return (
    <Layout title={'Page Not Found - Ecommerce App'}>
      <div className="continerPageNotFound">
    <div className="pageNotFound">
      
      <h1>404!</h1>
        <h3>Page Not found </h3>
        <Link to ='/' className='btnPageNF'>Home</Link>
    </div>
    </div>
    </Layout>
  )
}
