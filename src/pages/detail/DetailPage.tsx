import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./DetailPage.module.css";
import { Col, Row, Spin, DatePicker, Divider, Typography, Anchor, Menu } from "antd";
import { Footer, Header, ProductComments, ProductIntro } from "../../components";
import { commentMockData } from "./mockup";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { getProductDetail } from "../../redux/productDetail/productDetailSlice";
import { MainLayout } from "../../layouts";

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

    // 使用redux进行初始化
    const loading = useSelector(state => state.productDetail.loading);
    const error = useSelector(state => state.productDetail.error);
    const product = useSelector(state => state.productDetail.data);

    const dispatch = useDispatch();

    // 网络请求
    useEffect(() => {
        dispatch(getProductDetail(tourId ? tourId : ''));
    }, []);

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
        return <h1>网站出错：{error}</h1>
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
                            <RangePicker open style={{ marginTop: 20 }} />
                        </Col>
                    </Row>
                </div>
                {/* 锚点菜单 */}
                <Anchor className={styles["product-detail-anchor"]}>
                    <Menu mode="horizontal">
                        <Menu.Item key={1}>
                            <Anchor.Link href="#features" title="产品特色"></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={2}>
                            <Anchor.Link href="#fees" title="产品费用"></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={3}>
                            <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
                        </Menu.Item>
                        <Menu.Item key={4}>
                            <Anchor.Link href="#comments" title="产品评价"></Anchor.Link>
                        </Menu.Item>
                    </Menu>
                </Anchor>
                {/* 产品特色 */}
                <div id="features" className={styles["product-detail-container"]} style={{ marginTop: 0 }}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>产品特色</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.features }} style={{ margin: 50 }}></div>
                </div>
                {/* 产品费用 */}
                <div id="fees" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>产品费用</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}></div>
                </div>
                {/* 预定须知 */}
                <div id="notes" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>预定须知</Typography.Title>
                    </Divider>
                    <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
                </div>
                {/* 产品评价 */}
                <div id="comments" className={styles["product-detail-container"]}>
                    <Divider orientation={'center'}>
                        <Typography.Title level={3}>产品评价</Typography.Title>
                    </Divider>
                    <div style={{ margin: 50 }}><ProductComments data={commentMockData} /></div>
                </div>
            </MainLayout>
        </>
    )

}