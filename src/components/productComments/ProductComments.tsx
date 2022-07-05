import { Comment, List } from "antd";
import React from "react";
import styles from "./ProductComments.module.css";

interface PropsType {
    data: {
        author: string;
        avatar: string;
        content: string;
        createDate: string;
    }[];
}
export const ProductComments: React.FC<PropsType> = ({ data }) => {
    return (
        <List
            dataSource={data}
            itemLayout="horizontal"
            renderItem={(c) => {
                return (
                    <li>
                        <Comment
                            author={c.author}
                            avatar={c.avatar}
                            content={c.content}
                            datetime={c.createDate}
                        />
                    </li>
                )
            }}>
        </List>
    )

}