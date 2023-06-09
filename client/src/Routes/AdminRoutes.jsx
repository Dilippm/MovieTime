import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLogin';
import Admin from '../pages/Admin/AdminHome';
import AdminProfile from '../pages/Profile/AdminProfile';
import UserDetails from '../pages/Admin/UserDetails';
import AdminPublicRoutes from './AdminPublicRoutes';
import AdminProtectedRoutes from './AdminProtectedRoutes';
const AdminRoutes = () => {
  return (
    <>
     <Routes>
          <Route path="/admin" element={<AdminPublicRoutes><AdminLogin /></AdminPublicRoutes>} />
          <Route path="/home" element={<AdminProtectedRoutes><Admin /></AdminProtectedRoutes>} />
          <Route path="/adminprofile" element={<AdminProtectedRoutes><AdminProfile /></AdminProtectedRoutes>} />
          <Route path ="/admin_users" element={<AdminProtectedRoutes><UserDetails/></AdminProtectedRoutes>}/>
        </Routes>
    </>
  )
}

export default AdminRoutes
