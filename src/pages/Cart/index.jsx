import AppContext from "../../context";
import React from "react";
import CartItem from "../../components/CartItem";
import st from "./Cart.module.scss";
import { useNavigate } from "react-router-dom";

function Cart({ onRemove, onFormNewOrder }) {
  const { user, cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce(
    (sum, obj) => obj.price * obj.quantity + sum,
    0
  );
  const [isOrderingOpened, setIsOrderingOpened] = React.useState(false);

  const [comment, setComment] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const Navigate = useNavigate();

  const newOrder = {
    userId: user.id,
    comment: comment,
    address: address,
    phoneNumber: phoneNumber,
  };

  return (
    <div>
      <div className={st.cart}>
        <h2>Корзина</h2>

        {totalPrice > 0 ? (
          <div className={st.content}>
            <div className={st.items}>
              {cartItems.map((item) => (
                <CartItem key={item.productId} onRemove={onRemove} {...item} />
              ))}
            </div>

            <div className={st.cartTotalBlock}>
              <div className={st.total}>
                <h4>Итого:</h4>
                <div></div>
                <b>{totalPrice} BYN</b>
              </div>
              {isOrderingOpened ? (
                <form onSubmit={() => onFormNewOrder(newOrder)}>
                  <div className={st.inputFields}>
                    <h4>Оставьте комментарий</h4>
                    <input
                      onChange={(obj) => setComment(obj.target.value)}
                      value={newOrder.comment}
                      placeholder="Ваш комментарий к заказу"
                    />
                    <h4>Введите ваш адрес</h4>
                    <input
                      required
                      onChange={(obj) => setAddress(obj.target.value)}
                      value={newOrder.address}
                      placeholder="225320, г.Барановичи, ул.Советская, д.34, кв.93"
                    />
                    <h4>Введите номер телефона</h4>
                    <input
                      required
                      minLength={10}
                      type="tel"
                      onChange={(obj) => setPhoneNumber(obj.target.value)}
                      value={newOrder.phoneNumber}
                      placeholder="+375 33 630 82 40"
                    />
                  </div>
                  <button className={st.greenButton}>Оформить заказ</button>
                </form>
              ) : (
                <button
                  onClick={() => setIsOrderingOpened(true)}
                  className={st.greenButton}
                >
                  Оформить заказ
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className={st.emptyCart}>
            <img src="/img/empty-box.png" alt="Empty-cart" />
            <h4>Ваша корзина пуста</h4>
            <button
              onClick={() => {
                Navigate("/");
              }}
              className={st.greenButton}
            >
              Перейти к каталогу
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
