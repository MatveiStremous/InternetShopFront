import React from "react";
import AppContext from "../../context";
import st from "./CartItem.module.scss";

function CartItem({ productId, title, imageUrl, price, quantity, onRemove }) {
  const [cartQuantity, setCartQuantity] = React.useState(quantity);
  const { onUpdateQuantityInCart } = React.useContext(AppContext);

  const onPlus = () => {
    setCartQuantity(cartQuantity + 1);
    onUpdateQuantityInCart({
      productId: productId,
      quantity: cartQuantity + 1,
    });
  };
  const onMinus = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1);
      onUpdateQuantityInCart({
        productId: productId,
        quantity: cartQuantity - 1,
      });
    }
  };

  return (
    <div key={productId} className={st.cartItem}>
      <div className={st.leftBlock}>
        <img src={imageUrl} alt="Product" />
        <div className={st.info}>
          <p>{title}</p>
          <b>{price} BYN</b>
        </div>
      </div>
      <div className={st.rightBlock}>
        <div className={st.counter}>
          <div onClick={onMinus} className={st.quantity1}>
            <img src="/img/minus-number.png" alt="minus" />
          </div>
          <div className={st.number}>
            <span>{cartQuantity}</span>
          </div>

          <div onClick={onPlus} className={st.quantity2}>
            <img onClick={onPlus} src="/img/plus-number.png" alt="plus" />
          </div>
        </div>

        <img
          onClick={() => {
            onRemove(productId);
          }}
          className={st.removeBtn}
          src="/img/btn-remove.svg"
          alt="Remove"
        />
      </div>
    </div>
  );
}

export default CartItem;
