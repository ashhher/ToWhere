// import React from "react";
// import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs";
// import images from "react-payment-inputs/images";
// import { Input, Card } from "antd";
// import styles from "./PaymentForm.module.css";

// export const PaymentForm = () => {
//     const {
//         wrapperProps,
//         getCardImageProps,
//         getCardNumberProps,
//         getExpiryDateProps,
//         getCVCProps,
//     } = usePaymentInputs();

//     return (
//         <Card
//             title="信用卡"
//             bordered={false}
//             className={styles["payment-credit-card"]}
//         >
//             {/* <PaymentInputsWrapper {...wrapperProps}>
//                 <svg {...getCardImageProps({ images })} />
//                 <input {...getCardNumberProps()} />
//                 <input {...getExpiryDateProps()} />
//                 <input {...getCVCProps()} />
//             </PaymentInputsWrapper> */}
//         </Card>
//     );
// };

import React from 'react';
import Cards from 'react-credit-cards';
import styles from "./PaymentForm.module.css";
import { Input } from "antd";
import 'react-credit-cards/es/styles-compiled.css';


export class PaymentForm extends React.Component {
    state = {
        cvc: '',
        expiry: '',
        focus: '',
        name: '',
        number: '',
    };

    handleInputFocus = (e) => {
        this.setState({ focus: e.target.name });
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div id="PaymentForm"
                style={{ marginTop: 50 , textAlign: 'center'}}>
                <Cards
                    cvc={this.state.cvc}
                    expiry={this.state.expiry}
                    focused={this.state.focus}
                    name={this.state.name}
                    number={this.state.number}
                />
                <form className={styles['payment-form']}>
                    <Input
                        className={styles['payment-credit-card']}
                        type="tel"
                        name="number"
                        placeholder="Card Number"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                    <Input
                        className={styles['payment-credit-card']}
                        type="text"
                        name="name"
                        placeholder="Name"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                    <Input
                        className={styles['payment-credit-card']}
                        type="tel"
                        name="expiry"
                        placeholder="MM/YY"
                        pattern="\d\d/\d\d"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                    <Input
                        className={styles['payment-credit-card']}
                        type="cvc"
                        name="expiry"
                        placeholder="CVC"
                        pattern="\d\{3,4}"
                        onChange={this.handleInputChange}
                        onFocus={this.handleInputFocus}
                    />
                </form>
            </div>
        );
    }
}