import AppContext from "../context";
import React from "react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

function Cart({onRemove }) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce(
    (sum, obj) => obj.price * obj.quantity + sum,
    0
  );

  return (
    <div>
      <div>
        <h2 className="d-flex justify-center mb-30">Корзина</h2>

        {totalPrice > 0 ? (
          <>
            <div className="items">
              {cartItems.map((item) => (
                <CartItem key={item.productId} onRemove={onRemove} {...item} />
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

              <Link to="/ordering">
                <button className="greenButton">Оформить заказ</button>
              </Link>
            </div>
          </>
        ) : (
          <h2 className="d-flex justify-center p-20">Ваша корзина пуста</h2>
        )}
      </div>
    </div>
  );
}

export default Cart;
