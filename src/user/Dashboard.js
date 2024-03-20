import React from 'react'
import Layout from '../components/Layout/Layout'
import UserMenu from '../components/Layout/UserMenu'
import { useAuth } from '../context/AuthContext'
const Dashboard = () => {
  const [auth , setAuth] = useAuth();
  return (

    <Layout title={'DashBoard-Ecommerce App'}>
         <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-6">
                <div className="card">
                   <h3>{auth?.user?.name}</h3>
                   <h3>{auth?.user?.email}</h3>
                   <h3>{auth?.user?.address}</h3>
                </div>
            </div>
          </div>
         </div>
    </Layout>
  )
}

export default Dashboard
