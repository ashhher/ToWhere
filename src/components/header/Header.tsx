import React, { useEffect, useState } from "react";
import styles from "./Header.module.css";
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addLanguageActionCreator, changeLanguageActionCreator } from "../../redux/language/languageActions";
import { useSelector } from "../../redux/hooks"
import { useDispatch } from "react-redux";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { userSlice } from "../../redux/user/userSlice";

interface JwtPayload extends DefaultJwtPayload {
    username: string
}


export const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // i18next
    const { t } = useTranslation();

    // react-redux 自动subscribe
    const language = useSelector((state) => state.language.language);
    const languageList = useSelector((state) => state.language.languageList);
    const dispatch = useDispatch();

    const jwt = useSelector((state) => state.user.token);
    const [username, setUsername] = useState("");

    useEffect(() => {
        if (jwt) {
            const token = jwt_decode<JwtPayload>(jwt);
            setUsername(token.username);
        }
    }, [jwt]);

    const onSignOut = () => {
        dispatch(userSlice.actions.signOut());
        toPage('/');
    }

    // 跳转页面
    const toPage = (url: string) => {
        if (location.pathname === url)
            window.location.reload();
        else
            navigate(`${url}`);
    };

    // 语言目录点击事件
    const menuClickHandler = (e) => {
        if (e.key === 'new') {
            const code = languageList.length;
            // create action + dispatch
            dispatch(addLanguageActionCreator("New Language " + code, "nl-" + code));
        } else {
            dispatch(changeLanguageActionCreator(e.key));
        }
    };

    return (
        <div className={styles['app-header']}>
            {/* top-header */}
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>{t("header.slogan")}</Typography.Text>
                    <Dropdown.Button
                        style={{ marginLeft: 15 }}
                        overlay={
                            <Menu onClick={menuClickHandler}>
                                {languageList.map(l => {
                                    return <Menu.Item key={l.code}>{l.name}</Menu.Item>;
                                })}
                                <Menu.Item key={"new"}>{t("header.add_new_language")}</Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined />}>
                        {languageList.map(lang => {
                            if (lang.code === language)
                                return lang.name;
                        })}
                    </Dropdown.Button>
                    {jwt ? (
                        <Button.Group className={styles['button-group']}>
                            <span>
                                {t("header.welcome")}
                                <Typography.Text strong>{username}</Typography.Text>
                            </span>
                            <Button >{t("header.shoppingCart")}</Button>
                            <Button onClick={onSignOut}>{t("header.signOut")}</Button>
                        </Button.Group>
                    ) : (
                        <Button.Group className={styles['button-group']}>
                            <Button onClick={() => toPage('/register')}>{t("header.register")}</Button>
                            <Button onClick={() => toPage('/signIn')}>{t("header.signin")}</Button>
                        </Button.Group>
                    )}

                </div>

            </div>

            {/* main-header */}
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => toPage('/')}>
                    <img src={logo} alt="logo" className={styles['App-logo']} />
                    <Typography.Title level={3} className={styles.title}>{t("header.title")}</Typography.Title>
                </span>

                <Input.Search
                    placeholder={t("header.input")}
                    className={styles['search-input']}
                    onSearch={(keyword) => { toPage(`/search/${keyword}`) }} />
            </Layout.Header>

            {/* menu-header */}
            <Menu mode='horizontal' className={styles['main-menu']}>
                <Menu.Item key={1}>{t("header.home_page")}</Menu.Item>
                <Menu.Item key={2}>{t("header.weekend")}</Menu.Item>
                <Menu.Item key={3}>{t("header.group")}</Menu.Item>
                <Menu.Item key={4}>{t("header.backpack")}</Menu.Item>
                <Menu.Item key={5}>{t("header.private")}</Menu.Item>
                <Menu.Item key={6}>{t("header.cruise")}</Menu.Item>
                <Menu.Item key={7}>{t("header.hotel")}</Menu.Item>
                <Menu.Item key={8}>{t("header.local")}</Menu.Item>
                <Menu.Item key={9}>{t("header.theme")}</Menu.Item>
                <Menu.Item key={10}>{t("header.custom")}</Menu.Item>
                <Menu.Item key={11}>{t("header.study")}</Menu.Item>
                <Menu.Item key={12}>{t("header.visa")}</Menu.Item>
                <Menu.Item key={13}>{t("header.enterprise")}</Menu.Item>
                <Menu.Item key={14}>{t("header.high_end")}</Menu.Item>
                <Menu.Item key={15}>{t("header.outdoor")}</Menu.Item>
                <Menu.Item key={16}>{t("header.insurance")}</Menu.Item>
            </Menu>
        </div>
    )

}