import { Form, Input, Button, Checkbox } from 'antd';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector } from "../../redux/hooks";
import { useNavigate } from 'react-router-dom';
import styles from "./SignInForm.module.css";
import { useDispatch } from 'react-redux';
import { signIn } from '../../redux/user/userSlice';

export const SignInForm = () => {

    const loading = useSelector(state => state.user.loading);
    const error = useSelector(state => state.user.error);
    const jwt = useSelector(state => state.user.token);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (jwt !== null) {
            navigate('/');
        }
    }, [jwt]);

    const onFinish = (values: any) => {
        console.log('Success:', values);
        dispatch(signIn({
            email: values.email,
            password: values.password
        }));
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            className={styles['signin-form']}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="E-mail"
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};