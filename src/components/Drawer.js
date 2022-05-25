import AppContext from "../context";
import React from "react";

function Drawer({onClose, onRemove, items = []}) {
  const {cartItems} = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj)=>obj.price+sum,0);
  return (
    <div  className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина{" "}
          <img onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />{" "}
        </h2>

        <div className="items">
          {items.map((obj)=>(
           <div key={obj.productId} className="cartItem d-flex align-center mb-20">
           <img
             className="mr-20"
             width={70}
             height={70}
             src={obj.imageUrl}
             alt="Product"
           />
           <div className="mr-20">
             <p className="mb-5">{obj.title}</p>
             <b>{obj.price} руб.</b>
           </div>
           
           <img onClick = {()=> {onRemove(obj.productId)
            console.log(obj)
          }} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
         </div>
          
          ))}
          
          
        </div>

        <div className="cartTotalBlock">
          <ul>
            <li>
              <span>Итого:</span>
              <div></div>
              <b>{totalPrice} руб.</b>
            </li>
          </ul>
          <button className="greenButton">Оформить заказ</button>
        </div>
      </div>
    </div>
  );
}

export default Drawer;
