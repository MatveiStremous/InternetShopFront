import React from "react";
import styles from "./Card.module.scss";
import AppContext from "../../context";
import { Link } from 'react-router-dom';

function Card({ productId, title, imageUrl, price, onPlus}) {
 
  const { isItemAdded } = React.useContext(AppContext);

  const obj = { productId, title, imageUrl, price, quantity: 1 };
 
  const onClickPlus = () => { 
    onPlus(obj);
  };

  return (
    
    <div className={styles.card}>
      <Link to={`/products/${productId}`} >
      <img width={133} height={112} src={imageUrl} alt="Product" />
      <h5>{title}</h5>
      </Link>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className="cu-p"
          onClick={onClickPlus}
          src={isItemAdded(productId) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Add"
        />
      </div>
    </div>
  );
}

export default Card;
