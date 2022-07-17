import React, { useEffect } from 'react';
import styles from './App.module.css';
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCartPage, PlaceOrderPage } from "./pages/index";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "./redux/hooks";
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/shoppingCartSlice';

const PrivateRoute = ({ children }) => {
  const jwt = useSelector(s => s.user.token);
  return jwt ? children : <Navigate to={"/signIn"} />
}

function App() {
  const jwt = useSelector(s => s.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:tourId" element={<DetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/search/:keyword" element={<SearchPage />} />
          <Route path="/shoppingCart" element={
            <PrivateRoute>
              <ShoppingCartPage />
            </PrivateRoute>} />
          <Route path="/placeOrder" element={
            <PrivateRoute>
              <PlaceOrderPage />
            </PrivateRoute>} />
          <Route path="*" element={<h1>404 Not Found! </h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
