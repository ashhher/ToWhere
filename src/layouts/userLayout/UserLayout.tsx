import React from "react";
import styles from "./UserLayout.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
import { useTranslation } from "react-i18next";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
import { changeLanguageActionCreator } from "../../redux/language/languageActions";

const { Header, Footer, Content } = Layout;

export const UserLayout: React.FC = (props) => {
    const { t } = useTranslation();

    // react-redux 自动subscribe
    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language.languageList);
    const dispatch = useDispatch();

    const menuClickHandler = (e) => {
        dispatch(changeLanguageActionCreator(e.key));
    };

    return (
        <Layout className={styles["user-layout-container"]}>
            <Header className={styles["header"]}>
                <div className={styles["lang"]}>
                    <Dropdown overlay={
                        <Menu onClick={menuClickHandler}>
                            {languageList.map(lang => {
                                return <Menu.Item key={lang.code}>{lang.name}</Menu.Item>
                            })}
                        </Menu>
                    }>
                        <Button>
                            {languageList.map(lang => {
                                if (lang.code === language)
                                    return lang.name;
                            })}<CaretDownOutlined />
                        </Button>
                    </Dropdown>
                </div>
            </Header>
            <Content className={styles["content"]}>
                <div className={styles["top"]}>
                    <div className={styles["content-header"]}>
                        <Link to="/">
                            <img alt="logo" className={styles["logo"]} src={logo} />
                            <span className={styles["title"]}>React 旅游网</span>
                        </Link>
                    </div>
                    {/* <div className={styles["desc"]}>
                        慕课网 是我朝最具影响力的 线上课程学习网站
                    </div> */}
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>{t("footer.detail")}</Footer>
        </Layout>
    );
};