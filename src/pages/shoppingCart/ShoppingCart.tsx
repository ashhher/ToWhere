import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { MainLayout } from "../../layouts";
import { useSelector } from "../../redux/hooks";
import styles from "./ShoppingCart.module.css";

type ShoppingCartParams = {
}

export const ShoppingCartPage: React.FC = () => {

    return (
        <div>
            <h1>ShoppingCart</h1>
        </div>
    )
}