import React from "react";
import styles from "./HomePage.module.css";

import { SideMenu, Carousel, ProductCollection, Partners } from "../../components/index";
import { Row, Col, Typography, Spin } from "antd";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";

import sideImage1 from "../../assets/images/sider_2019_02-04-2.png";
import sideImage2 from "../../assets/images/sider_2019_02-04.png";
import sideImage3 from "../../assets/images/sider_2019_12-09.png";
import { RootState } from "../../redux/store";
import { fetchrecommendProductsActionCreator } from "../../redux/recommendProducts/recommendProductsActions";
import { MainLayout } from "../../layouts";

// 【1】映射State-Props 传入尾部connect函数的参数
const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProducts.loading,
        error: state.recommendProducts.error,
        productList: state.recommendProducts.productList,
    }
}

// 【2】映射Dispatch函数-Props 传入尾部connect函数的参数
const mapDispatchToProps = (dispatch) => {
    return {
        fetchRecommendProducts: () => {
            dispatch(fetchrecommendProductsActionCreator());
        }
    }
}

// 【3】类型定义
type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

class HomePageComponent extends React.Component<PropsType> {
    componentDidMount() {
        // 【4】dispatch函数调用
        this.props.fetchRecommendProducts();
    }

    render(): React.ReactNode {
        // 【5】props中获取state
        const { loading, error, productList, t } = this.props;

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

        return (<>
            <MainLayout>
                {/* side menu and carousel */}
                <Row style={{ marginTop: 20 }}>
                    <Col span={6} > <SideMenu /></Col>
                    <Col span={18} > <Carousel /></Col>
                </Row>

                {/* product collection */}
                <ProductCollection
                    title={<Typography.Title level={3} type='warning'>{t("home_page.hot_recommended")}</Typography.Title>}
                    sideImage={sideImage1}
                    products={productList[0].touristRoutes}
                />

                <ProductCollection
                    title={<Typography.Title level={3} type="danger">{t("home_page.new_arrival")}</Typography.Title>}
                    sideImage={sideImage2}
                    products={productList[1].touristRoutes}
                />

                <ProductCollection
                    title={<Typography.Title level={3} type="success">{t("home_page.domestic_travel")}</Typography.Title>}
                    sideImage={sideImage3}
                    products={productList[2].touristRoutes}
                />
                <Partners />
            </MainLayout>
        </>);
    }
}

// 【6】connect
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent));