import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import InnerContent from "../Components/InnerContent";
import Test from "../Components/Test";
import ShoesSite from "../Components/ShoesSite";
import Productpage from "../Components/Productpage";
import Cart from "../Components/Cart";
import Checkout from "../Components/Checkout";
import Placeorder from "../Components/Placeorder";


import DressSite from "../Components/DressSite";
import ProductDress from "../Components/ProductDress";
import CartDress from "../Components/CartDress";
import CheckOutDress from "../Components/CheckoutDress";
import PlaceOrderDress from "../Components/PlaceOrderDress";
import Homepage from "../Components/Homepage";


import GetPage from "../Components/GetPage";
import PostPage from "../Components/PostPage";
import EditPage from "../Components/EditPage";


export default function MainRoutes() {
    return(
        <Routes>
            <Route path="/" element={<InnerContent />} >
            <Route path="/" element={<Navigate replace to="test" />} />
            <Route path="test" element={<Test />} />
            <Route path="shoessite" element={<ShoesSite />} />
            <Route path="productpage/:id" element={<Productpage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout/>} />
            <Route path="placeorder" element={<Placeorder/>} />

            <Route path="dresssite" element={<DressSite/>} />
            <Route path="productdress/:id" element={<ProductDress/>} />
            <Route path="cartdress" element={<CartDress/>} />
            <Route path="checkoutdress" element={<CheckOutDress/>} />
            <Route path="placeorderdress" element={<PlaceOrderDress/>} />
            <Route path="homepage" element={<Homepage/>} />

            <Route path="getpage" element={<GetPage/>} />
            <Route path="postpage" element={<PostPage/>} />
            <Route path="editpage/:id" element={<EditPage/>} />


            </Route>
        </Routes>
    )
}