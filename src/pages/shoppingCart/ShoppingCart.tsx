import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { MainLayout } from "../../layouts";
import { Row, Col, Affix } from "antd";
import { PaymentCard, ProductList } from "../../components";
import { useSelector } from "../../redux/hooks";
import styles from "./ShoppingCart.module.css";

type ShoppingCartParams = {
}

export const ShoppingCartPage: React.FC = () => {

    return (
        <MainLayout>
            <Row>
                <Col span={16}>
                    <div className={styles["product-list-container"]}>
                        {/* <ProductList /> */}
                    </div>
                </Col>
                <Col span={8}>
                    <Affix>
                        <div className={styles["payment-card-container"]}>
                            {/* <PaymentCard /> */}
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}