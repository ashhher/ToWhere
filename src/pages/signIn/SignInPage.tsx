import { Typography } from "antd";
import React from "react";
import { UserLayout } from "../../layouts";
import { SignInForm } from "./SignInForm";
import styles from "./SignInPage.module.css";

export const SignInPage: React.FC = () => {
    return (
        <UserLayout>
            <SignInForm />
        </UserLayout>
    )
}