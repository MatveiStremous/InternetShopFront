import AppContext from "../context";
import React from "react";
import CartItem from "../components/CartItem";

function Cart({ onClose, onRemove }) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce(
    (sum, obj) => obj.price * obj.quantity + sum,
    0
  );

  return (
    <div>
      <div>
        <h2 className="d-flex justify-between mb-30">
          Корзина{" "}
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />{" "}
        </h2>

        <div className="items">
          {cartItems.map((item) => (
            <CartItem
              key={item.productId}
              //  onPlus={(obj) => onPlus(obj)}
              //  onMinus={(obj) => onMinus(obj)}
              onRemove={onRemove}
              {...item}
            />
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

export default Cart;
