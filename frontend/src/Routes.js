import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import PrivateRoute from './auth/helper/PrivateRoutes';
import AdminRoute from './auth/helper/AdminRoutes';
import AdminDashBoard from './user/AdminDashBoard';
import UserDashBoard from './user/UserDashBoard';
import AddCategory from './admin/AddCategory';
import ManageCategories from './admin/ManageCategories';
import AddProduct from './admin/AddProduct';
import Certi from './admin/Certi';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';

const RoutesA = () => {
    return (

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                
                <Route path='/admin/dashboard'element={<AdminDashBoard />} />
                <Route path='/admin/create/category'element={<AddCategory />} />
                <Route path='/admin/categories'element={<ManageCategories />} />
                <Route path='/admin/create/product'element={<AddProduct />} />
                <Route path='/admin/products'element={<ManageProducts />} />
                <Route path='/admin/product/update/:productId'element={<UpdateProduct />} />
                <Route path='/admin/create/product/certificate' element={<Certi />} />
                


            </Routes>
        </BrowserRouter>

    )
}

export default RoutesA;