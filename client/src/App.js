import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './pages/Home';
import Movies from './pages/Movies/Movies';
import AdminLogin from './pages/Admin/AdminLogin';
import Admin from './pages/Admin/AdminHome';
import User from './pages/User/User';
import UserRegistration from './pages/User/UserRegister';
import OwnerLogin from './pages/Owner/OwnerLogin';
import OwnerRegister from './pages/Owner/OwnerRegister';
import OwnerHome from './pages/Owner/OwnerHome';

const App = () => {

  return (
    <div>
      <ToastContainer />

      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/login" element={<User />} />
          <Route path="/register" element={<UserRegistration />} />
        </Routes>
      </section>
      <section>
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin_home" element={<Admin />} />
        </Routes>
      </section>
      <section>
        <Routes>
          <Route path="/owner" element={<OwnerLogin />} />
          <Route path="/owner_register" element={<OwnerRegister />} />
          <Route path="/owner_home" element={<OwnerHome />} />
        </Routes>
      </section>
    </div>
  );
};

export default App;
