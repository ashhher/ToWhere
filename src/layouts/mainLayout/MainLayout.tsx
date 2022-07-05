import React from "react";
import { Footer, Header } from "../../components";
import styles from "./MainLayout.module.css";

export const MainLayout: React.FC = ({ children }) => {
    return (
        <>
            {/* header */}
            <Header />
            {/* page content */}
            <div className={styles['page-content']}>
                {children}
            </div>
            {/* footer */}
            <Footer />
        </>
    )

}