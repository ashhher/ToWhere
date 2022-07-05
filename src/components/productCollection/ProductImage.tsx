import { Typography } from "antd";
import React from "react";
import styles from "./ProductCollection.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface PropsType {
    id: string | number;
    size: "large" | "small";
    title: string;
    imageSrc: string;
    price: string | number;
}

export const ProductImage: React.FC<PropsType> = ({ id, size, title, imageSrc, price }) => {
    const { t } = useTranslation();
    return (
        <Link to={`detail/${id}`}>
            {size === "large" ? (
                <img src={imageSrc} alt="product" className={styles["large-image"]} />
            ) : (
                <img src={imageSrc} alt="product" className={styles["small-image"]} />
            )}
            <div>
                <Typography.Text type="secondary">{title.slice(0, 25)}</Typography.Text>
                <Typography.Text type="danger" strong>￥ {price} {t("home_page.start_from")}</Typography.Text>
            </div>
        </Link>
    )
}