import React from "react";
import styles from "./SideMenu.module.css";
import { Menu } from "antd";
import { sideMenuList } from "../../mock/mockup";
import { GlobalOutlined } from "@ant-design/icons";

export const SideMenu: React.FC = () => {
    return (
        <Menu mode="vertical" className={styles["side-menu"]}>
            {sideMenuList.map((m, index) => (
                <Menu.SubMenu
                    key={`side-menu-${index}`}
                    title={<span><GlobalOutlined style={{ marginRight: 5 }} />{m.title}</span>}>
                    {m.subMenu.map((sm, smindex) => (
                        <Menu.SubMenu
                            key={`sub-menu-${index}-${smindex}`}
                            title={<span><GlobalOutlined style={{ marginRight: 5 }} />{sm.title}</span>}>
                            {sm.subMenu.map((sms, smsindex) => (
                                <Menu.Item
                                    key={`sub-sub-menu-${index}-${smindex}-${smsindex}`}>
                                    <span><GlobalOutlined style={{ marginRight: 5 }} />{sms}</span>
                                </Menu.Item>
                            ))}
                        </Menu.SubMenu>
                    ))}
                </Menu.SubMenu>
            ))}
        </Menu>
    );
};