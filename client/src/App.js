import {Routes, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import UserRoutes from "./Routes/Userroutes"
import AdminRoutes from './Routes/AdminRoutes';
import OwnerRoutes from './Routes/OwnerRoutes';

import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';
import {adminActions, userActions} from './store';

const App = () => {

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

    return (
        <div>
            <ToastContainer/>

            <Routes>
                <Route path="/*" element={<UserRoutes />}/>
                <Route path='/admin/*' element={<AdminRoutes />}/>
                <Route path='/owner/*' element={<OwnerRoutes />}/>

            </Routes>

        </div>
    );
};

export default App;
