import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { PaymentForm, CheckOutCard } from "../../components";
import { MainLayout } from "../../layouts";
import { Row, Col } from "antd";
import { useSelector } from "../../redux/hooks";
import styles from "./PlaceOrder.module.css";
import { placeOrder } from "../../redux/order/orderSlice";


export const PlaceOrderPage: React.FC = () => {
    const loading = useSelector(s => s.order.loading);
    const order = useSelector(s => s.order.currentOrder);
    const jwt = useSelector(s => s.user.token) as string;

    const dispatch = useDispatch();

    const checkout = () => {
        dispatch(placeOrder({ jwt, orderId: order.id }));
    }

    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <PaymentForm />
                </Col>
                <Col span={12}>
                    <CheckOutCard
                        loading={loading}
                        order={order}
                        onCheckout={checkout}
                    />
                </Col>
            </Row>
        </MainLayout>
    )
}