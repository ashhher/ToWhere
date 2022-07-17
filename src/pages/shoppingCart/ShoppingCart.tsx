import React from "react";
import { useDispatch } from "react-redux";
import { MainLayout } from "../../layouts";
import { Row, Col, Affix } from "antd";
import { PaymentCard, ProductList } from "../../components";
import { useSelector } from "../../redux/hooks";
import styles from "./ShoppingCart.module.css";
import { deleteShoppingCartItems, checkout } from "../../redux/shoppingCart/shoppingCartSlice";
import { useNavigate } from "react-router-dom";


export const ShoppingCartPage: React.FC = () => {
    const loading = useSelector(s => s.shoppingCart.loading);
    const items = useSelector(s => s.shoppingCart.items);
    const jwt = useSelector(s => s.user.token) as string;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clearShoppingCart = () => {
        dispatch(deleteShoppingCartItems({ jwt, itemIds: items.map(s => s.id) }))
    }

    const checkoutOrder = () => {
        if(items.length <= 0) {
            return
        }
        dispatch(checkout(jwt));
        navigate('/placeOrder')
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
                                onCheckout={checkoutOrder} />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}