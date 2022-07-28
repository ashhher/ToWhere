import { Typography, Carousel, Image, Rate, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./ProductIntro.module.css";

interface PropsType {
    title: string;
    shortDescription: string;
    price: string | number;
    coupons: string;
    points: string;
    discount: string;
    rating: string | number;
    pictures: string[];
}

// 【1】 ColumnsType所需行数据类型定义
interface RowType {
    title: string;
    description: string | number | JSX.Element;
    key: number;
}

// 【2】 表内样式 Table组件所需参数
const columns: ColumnsType<RowType> = [
    // 第一列 表头
    {
        title: "title",
        dataIndex: "title",
        key: "title",
        align: "left",
        width: 120,
    },
    // 第二列 内容
    {
        title: "description",
        dataIndex: "description",
        key: "description",
        align: "center",
    },
];

export const ProductIntro: React.FC<PropsType> = ({
    title,
    shortDescription,
    price,
    coupons,
    discount,
    rating,
    pictures,
}) => {

    const { t } = useTranslation();

    // 【3】 表内数据 Table组件所需参数
    const tableDataSource: RowType[] = [
        {
            key: 0,
            title: t("detail.name"),
            description: title,
        },
        {
            key: 1,
            title: t("detail.price"),
            description: (
                <>
                    ¥{" "}
                    <Typography.Text type="danger" strong>
                        {price}
                    </Typography.Text>
                </>
            ),
        },
        {
            key: 2,
            title: t("detail.sale"),
            description: discount ? (
                <>
                    ¥ <Typography.Text delete>{price}</Typography.Text>{" "}
                    <Typography.Text type="danger" strong>
                        ¥ {discount}
                    </Typography.Text>
                </>
            ) : (
                t("detail.no_discount") as string
            ),
        },
        {
            key: 3,
            title: t("detail.discount"),
            description: coupons ? discount : t("detail.no_coupon") as string,
        },
        {
            key: 4,
            title: t("detail.comments"),
            description: (
                <>
                    <Rate disabled allowHalf defaultValue={+rating} />
                    <Typography.Text style={{ marginLeft: 10 }}>
                        {rating} {t("detail.star")}
                    </Typography.Text>
                </>
            ),
        },
    ];


    return (
        <div className={styles["intro-container"]}>
            <Typography.Title level={4}>{title}</Typography.Title>
            <Typography.Text>{shortDescription}</Typography.Text>
            <div className={styles["intro-detail-content"]}>
                <Typography.Text style={{ marginLeft: 20 }}>
                    ¥ <span className={styles["intro-detail-strong-text"]}>{price}</span>{" "}
                    /{t("detail.every")}
                </Typography.Text>
                <Typography.Text style={{ marginLeft: 50 }}>
                    <span className={styles["intro-detail-strong-text"]}>{rating}</span>{" "}
                    {t("detail.star")}
                </Typography.Text>
            </div>
            <Carousel autoplay slidesToShow={3}>
                {pictures.map((p, index) => (
                    <Image key={index} height={150} src={p} />
                ))}
            </Carousel>
            {/* 【4】 使用表 */}
            <Table<RowType>
                columns={columns}
                dataSource={tableDataSource}
                size="small"
                bordered={false}
                pagination={false}
                showHeader={false}
            />
        </div>
    );

}