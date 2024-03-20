import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/AuthContext'
const AdminDashboard = () => {
  const [ auth ] = useAuth();
  return (
    <Layout>

          
            <div className="d-flex flex-row justify-content-center align-items-center ">
              <div >
                 <AdminMenu/>
               <div >
                  <div >
                    <h3>
                    Admin Name : {auth?.user?.name}
                    </h3>
                    <h3>Admin Email:  {auth?.user?.email}</h3>
                    <h3>Admin Contact : {auth?.user?.contact}</h3>
                  </div>
               </div>

              </div>
            </div> 
      
    </Layout>
  )
}

export default AdminDashboard
