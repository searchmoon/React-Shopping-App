import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import styles from "./CardItem.module.scss";

const CardItem = ({ item }) => {
    const { products } = useAppSelector((state) => state.cartSlice);
    const productMatching = products.some((product) => product.id === item.id);
    // some() 메소드는 주어진 판별함수를 적어도 하나라도 통과한다면, true 를 반환한다.
    const dispatch = useAppDispatch();

    const addItemToCart = () => {
        dispatch(addToCart(item));
    };

    return (
        <li className={styles.card_item}>
            <Link to={`/product/${item.id}`}>
                <img
                    src={item.image}
                    width={"80%"}
                    height={"200px"}
                    alt="product card"
                />
            </Link>

            <h5>{item.title.substring(0, 15)}...</h5>

            <div>
                <button
                    disabled={productMatching}
                    onClick={() => !productMatching && addItemToCart()}
                >
                    {productMatching
                        ? "장바구니에 담긴 제품"
                        : "장바구니에 담기"}
                </button>
                <p>$ {item.price}</p>
            </div>
        </li>
    );
};

export default CardItem;
