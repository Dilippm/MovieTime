import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Movies from './pages/Movies/Movies';
import AdminLogin from './pages/Admin/AdminLogin';
import Admin from './pages/Admin/AdminHome';
import User from './pages/User/User';
import UserProfile from './pages/Profile/userProfile';
import UserRegistration from './pages/User/UserRegister';
import OwnerLogin from './pages/Owner/OwnerLogin';
import OwnerRegister from './pages/Owner/OwnerRegister';
import OwnerHome from './pages/Owner/OwnerHome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { adminActions, userActions } from './store';
import AdminProfile from './pages/Profile/AdminProfile';
import OwnerProfile from './pages/Profile/Ownerprofile';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isOwnerLoggedIn = useSelector((state) => state.owner.isLoggedIn);
  console.log("isAdminLoggedin", isAdminLoggedIn);
  console.log("isUserLoggedin", isUserLoggedIn);
  console.log("isOwnerLoggedin", isOwnerLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isUserLoggedIn && window.location.pathname === "/profile") {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);
useEffect(()=>{
  if(isUserLoggedIn && (window.location.pathname === "/login" || window.location.pathname === "/register" )){
    navigate("/");
  }
})
  return (
    <div>
      <ToastContainer />

      <section>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/login" element={<User />} />
          <Route exact path="/register" element={<UserRegistration />} />

            <Route path="/profile" element={<UserProfile />} />
         
        </Routes>
      </section>

      <section>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin_home" element={<Admin />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
        </Routes>
      </section>

      <section>
        <Routes>
          <Route path="/owner" element={<OwnerLogin />} />
          <Route path="/owner_register" element={<OwnerRegister />} />
          <Route path="/owner_home" element={<OwnerHome />} />
          <Route path="/ownerprofile" element={<OwnerProfile/>} />
        </Routes>
      </section>
    </div>
  );
};

export default App;
