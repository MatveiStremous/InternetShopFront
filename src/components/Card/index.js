import React from 'react';
import styles from './Card.module.scss'

function Card({title, imageUrl, price, onPlus}){
  const [isAdded, setIsAdded] = React.useState();

  const onClickPlus = () =>{
    onPlus({title, imageUrl, price});
    setIsAdded(!isAdded);
  }

    return(
        <div className={styles.card}>
        <img width={133} height={112} src= {imageUrl} alt="Product"/>
        <h5>{title}</h5>
        <div className="d-flex justify-between align-center">
          <div className="d-flex flex-column">
            <span>Цена:</span>
            <b>{price} руб.</b>
          </div>
            <img className={styles.plus} onClick={onClickPlus} src ={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Add"/>
        </div>
      </div>
    )
}

export default Card;