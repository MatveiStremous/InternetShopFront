import React from "react";
import styles from "./Card.module.scss";
import AppContext from "../../context";
import { Link } from 'react-router-dom';

function Card({ id, title, imageUrl, price, onPlus}) {
 
  const { isItemAdded } = React.useContext(AppContext);
  const obj = { id, parentId:id, title, imageUrl, price };
 
  const onClickPlus = () => { 
    onPlus(obj);
  };

  return (
    <Link to={`/products/${id}`} >
    <div className={styles.card}>
      <img width={133} height={112} src={imageUrl} alt="Product" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Add"
        />
      </div>
    </div>
    </Link>
  );
}

export default Card;
