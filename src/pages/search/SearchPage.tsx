import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { ProductList, FilterArea, Footer, Header } from "../../components";
import { MainLayout } from "../../layouts";
import { useSelector } from "../../redux/hooks";
import { searchProduct } from "../../redux/productSearch/productSearchSlice";
import styles from "./SearchPage.module.css";

type SearchPageParams = {
    keyword: string;
}

export const SearchPage: React.FC = () => {
    // 接收路由参数
    const { keyword } = useParams<SearchPageParams>();

    const loading = useSelector(state => state.productSearch.loading);
    const error = useSelector(state => state.productSearch.error);
    const productList = useSelector(state => state.productSearch.data);
    const pagination = useSelector(state => state.productSearch.pagination);

    const dispatch = useDispatch();
    const location = useLocation();

    // 网络请求
    useEffect(() => {
        console.log(keyword);
        dispatch(searchProduct({
            keyword,
            pageNumber: 1,
            pageSize: 5
        }));

    }, [location]);

    const onPageChange = (pageNumber, pageSize) => {
        dispatch(searchProduct({
            keyword,
            pageNumber: pageNumber,
            pageSize: pageSize
        }));
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
        return <h1>网站出错：{error}</h1>
    }

    return (
        <>
            <MainLayout>
                {/* 分类过滤器 */}
                <div className={styles["product-list-container"]}>
                    <FilterArea />
                </div>
                {/* 产品列表 */}
                <div className={styles["product-list-container"]}>
                    <ProductList
                        data={productList}
                        paging={pagination}
                        onPageChange={onPageChange} />
                </div>
            </MainLayout>
        </>
    )

}