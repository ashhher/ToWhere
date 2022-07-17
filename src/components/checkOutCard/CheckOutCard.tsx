import React from "react";
import { Skeleton, Card, Button, Typography, Table } from "antd";
import { CheckCircleOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { Meta } = Card;
const { Title, Text } = Typography;

interface OrderItem {
    key: number;
    item: string;
    amount: string | number | JSX.Element;
}


interface PropsType {
    loading: boolean;
    order: any;
    onCheckout: () => void;
}

export const CheckOutCard: React.FC<PropsType> = ({
    loading,
    order,
    onCheckout,
}) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const columns: ColumnsType<OrderItem> = [
        {
            title: t("check_out.item"),
            dataIndex: "item",
            key: "item",
        },
        {
            title: t("check_out.price"),
            dataIndex: "amount",
            key: "amount",
        },
    ];

    const paymentData: OrderItem[] = order
        ? order.orderItems.map((i, index) => ({
            key: index,
            item: i.touristRoute.title,
            amount: (
                <>
                    <Text delete>¥ {i.originalPrice} </Text>{" "}
                    <Text type="danger" strong>
                        ¥ {i.originalPrice * i.discountPresent}
                    </Text>
                </>
            ),
        }))
        : [];

    return (
        <Card
            style={{ width: 600, marginTop: 50 }}
            actions={[
                order && order.state === "Completed" ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            navigate("/");
                        }}
                        loading={loading}
                    >
                        <HomeOutlined />
                        {t("check_out.back")}
                    </Button>
                ) : (
                    <Button type="primary" danger onClick={onCheckout} loading={loading}>
                        <CheckCircleOutlined />
                        {t("check_out.pay")}
                    </Button>
                ),
            ]}
        >
            <Skeleton loading={loading} active>
                <Meta
                    title={
                        <Title level={2}>
                            {order && order.state === "Completed" ? t("check_out.complete") : t("check_out.total")}
                        </Title>
                    }
                    description={
                        <Table<OrderItem>
                            columns={columns}
                            dataSource={paymentData}
                            showHeader={false}
                            size="small"
                            bordered={false}
                            pagination={false}
                        />
                    }
                />
            </Skeleton>
        </Card>
    );
};
