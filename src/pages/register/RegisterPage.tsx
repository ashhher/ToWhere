import React from "react";
import { UserLayout } from "../../layouts";
import { RegisterForm } from "./RegisterForm";
import styles from "./RegisterPage.module.css";

export const RegisterPage: React.FC = () => {
    return (
        <UserLayout>
            <RegisterForm />
        </UserLayout>
    )
}