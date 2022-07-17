import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import { Col, Row, Spin, DatePicker, Divider, Typography, Anchor, Menu, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Footer, Header, ProductComments, ProductIntro } from "../../components";
import { useTranslation } from "react-i18next";
import { commentMockData } from "./mockup";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { getProductDetail } from "../../redux/productDetail/productDetailSlice";
import { MainLayout } from "../../layouts";
import { addShoppingCartItem } from "../../redux/shoppingCart/shoppingCartSlice";

const { RangePicker } = DatePicker;

type DetailPageParams = {
    tourId: string
}

export const DetailPage: React.FC = () => {
    // 接收路由参数
    const { tourId } = useParams<DetailPageParams>();

    // 填入参数进行初始化
    // const [loading, setLoading] = useState<boolean>(true);
    // const [product, setProduct] = useState<any>(null);
    // const [error, setError] = useState<string | null>(null);

    // i18next
    const { t } = useTranslation();

    // 使用redux进行初始化
    const loading = useSelector(s => s.productDetail.loading);
    const error = useSelector(s => s.productDetail.error);
    const product = useSelector(s => s.productDetail.data);
    const jwt = useSelector(s => s.user.token) as string;
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading);

    const dispatch = useDispatch();

    // 网络请求
    useEffect(() => {
        dispatch(getProductDetail(tourId ? tourId : ''));
    }, []);

    // 处理加入购物车按钮
    const addToCart = () => {
        dispatch(addShoppingCartItem({ jwt, tourId: product.id }));
    }

    // 处理loading及报错
    if (loading) {
        return (<Spin
            size="large"
            style={{
                marginTop: 200,
                marginBottom: 200,
                marginLeft: "auto",
                marginRight: "auto",
                width: "100%",
            }}
        />);
    }

    if (error) {
        return <h1>{t("detail.error")}{error}</h1>
    }

    return (
        <>
            <MainLayout>
                {/* 产品简介 与 日期选择 */}
                <div className={styles["product-intro-container"]}>
                    <Row>
                        <Col span={13}>
                            <ProductIntro
                                title={product.title}
                                shortDescription={product.description}
                                price={product.originalPrice}
                                coupons={product.coupons}
                                points={product.points}
                                discount={product.price}
                                rating={product.rating}
                                pictures={product.touristRoutePictures.map((p) => p.url)}
                            />
                        </Col>
                        <Col span={11}>
                            <Button
                                className={styles["add-to-cart"]}
                                type="primary"
                                danger
                                loading={shoppingCartLoading}
                                onClick={addToCart}
                            >
                                <ShoppingCartOutlined />
                                {t("detail.add_to_cart")}
                            </Button>
                            <RangePicker open style={{ marginTop: 20 }} />
                        </Col>
                    </Row>
                </div>
                {/* 锚点菜单 */}
                <Anchor className={styles["product-detail-anchor"]}>
                    <Menu mode="horizontal">
                        <Menu.Item key={1}>
                            <Anchor.Link href="#features" title={t("detail.features")}></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={2}>
                            <Anchor.Link href="#fees" title={t("detail.fees")}></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={3}>
                            <Anchor.Link href="#notes" title={t("detail.notes")}></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={4}>
                            <Anchor.Link href="#comments" title={t("detail.comments")}></Anchor.Link>
                        </Menu.Item>
                    </Menu>
                </Anchor>
                {/* 产品特色 */}
                <div id="features" className={styles["product-detail-container"]} style={{ marginTop: 0 }}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>{t("detail.features")}</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>
                </div>
                {/* 产品费用 */}
                <div id="fees" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>{t("detail.fees")}</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}></div>
                </div>
                {/* 预定须知 */}
                <div id="notes" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>{t("detail.notes")}</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
                </div>
                {/* 产品评价 */}
                <div id="comments" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>{t("detail.comments")}</Typography.Title>
                    </Divider>
                    <div style={{ margin: 50 }}><ProductComments data={commentMockData} /></div>
                </div>
            </MainLayout>
        </>
    )

}