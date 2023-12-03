import React from 'react';
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './burger-price.module.css';
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {setContentModal} from "../../services/slices/modalSlice";

function BurgerPrice({price = 0}) {
    const dispatch = useDispatch();
    const handleOpenOrderDetails = () => {
        dispatch(setContentModal(<OrderDetails/>));
    }

    return (
        <div className={styles.container}>
            <p className="text text_type_digits-medium mr-2">{price}</p>
            <CurrencyIcon type="primary"/>
            <Button
                disabled={!price}
                type="primary" size="large"
                htmlType='submit'
                onMouseDown={handleOpenOrderDetails}
                extraClass={'ml-10 mr-4'}
            >
                Оформить заказ
            </Button>
        </div>
    );
}

BurgerPrice.propTypes = {
    price: PropTypes.number.isRequired,
}

export default BurgerPrice;
