import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { MainLayout } from "../../layouts";
import { Row, Col, Affix } from "antd";
import { PaymentCard, ProductList } from "../../components";
import { useSelector } from "../../redux/hooks";
import styles from "./ShoppingCart.module.css";
import { deleteShoppingCartItems } from "../../redux/shoppingCart/shoppingCartSlice";

type ShoppingCartParams = {
}

export const ShoppingCartPage: React.FC = () => {
    const loading = useSelector(s => s.shoppingCart.loading);
    const items = useSelector(s => s.shoppingCart.items);
    const jwt = useSelector(s => s.user.token) as string;

    const dispatch = useDispatch();

    const clearShoppingCart = () => {
        dispatch(deleteShoppingCartItems({ jwt, itemIds: items.map(s => s.id) }))
    }

    const checkOut = () => {

    }

    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={styles["product-list-container"]}>
                        <ProductList data={items.map(s => s.touristRoute)} />
                    </div>
                </Col>
                <Col span={8}>
                    <Affix>
                        <div className={styles["payment-card-container"]}>
                            <PaymentCard
                                loading={loading}
                                originalPrice={items.map(s => s.originalPrice).reduce((a, b) => a + b, 0)}
                                price={items.map(s => s.originalPrice * (s.discountPresent ? s.discountPresent : 1)).reduce((a, b) => a + b, 0)}
                                onShoppingCartClear={clearShoppingCart}
                                onCheckout={function (): void {
                                    throw new Error("Function not implemented.");
                                }} />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}