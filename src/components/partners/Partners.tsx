import React from "react";
import styles from "./Partners.module.css";

import image1 from '../../assets/images/microsoft-80658_640.png';
import image2 from '../../assets/images/icon-720944_640.png';
import image3 from '../../assets/images/follow-826033_640.png';
import image4 from '../../assets/images/facebook-807588_640.png';
import { Divider, Typography, Row, Col } from "antd";
import { useTranslation } from "react-i18next";

const companies = [
    { src: image1, title: "Microsoft" },
    { src: image2, title: "Youtube" },
    { src: image3, title: "Instagram" },
    { src: image4, title: "Facebook" }
]

export const Partners: React.FC = (props) => {
    const { t } = useTranslation();

    return (
        <div className={styles.content}>
            <Divider orientation="left">
                <Typography.Title level={3} type="secondary">{t("home_page.joint_venture")}</Typography.Title>
            </Divider>
            <Row>
                {companies.map((c, index) => (
                    <Col span={6} key={'partner-' + index}>
                        <img
                            src={c.src}
                            alt="business parter"
                            className={styles["partner-image"]}
                        />
                    </Col>
                ))}
            </Row>
        </div>
    )

}