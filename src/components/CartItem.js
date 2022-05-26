import React from "react";
import AppContext from "../context";

function CartItem({ productId, title, imageUrl, price, quantity, onRemove}) {
  const [cartQuantity, setCartQuantity] = React.useState(quantity);
  const {onUpdateQuantityInCart} = React.useContext(AppContext);

  const onPlus = () => {
    setCartQuantity(cartQuantity+1);
    onUpdateQuantityInCart({productId: productId, quantity: cartQuantity+1})
  };
  const onMinus = () => {
   if(cartQuantity>1){
    setCartQuantity(cartQuantity-1);
    onUpdateQuantityInCart({productId: productId, quantity: cartQuantity-1})
   }
  };

  return (
    <div key={productId} className="cartItem d-flex align-center mb-20">
    <img
      className="mr-20"
      width={70}
      height={70}
      src={imageUrl}
      alt="Product"
    />
    <div className="mr-20">
      <p className="mb-5">{title}</p>
      <b>{price} руб.</b>
    </div>
    
    <img
 height={50}
 onClick={onMinus}
 src="/img/minus-circle.png"
 alt="minus"
 />
 <span>{cartQuantity}</span>
 <img
 height={50}
 onClick={onPlus}
 src="/img/plus-circle.png"
 alt="plus"
 />

    <img onClick = {()=> {onRemove(productId)
   }} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />
  </div>
  );
}

export default CartItem;
