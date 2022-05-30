import AppContext from "../context";
import React from "react";

function Ordering({ onFormNewOrder }) {
  const { user } = React.useContext(AppContext);
  const [comment, setComment] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const newOrder = {
    userId: user.id,
    comment: comment,
    address: address,
    phoneNumber: phoneNumber,
  };

  return (
    <div className="p-40">
      <form onSubmit={() => onFormNewOrder(newOrder)}>
        <div>
          <input
      
            onChange={(obj) => setComment(obj.target.value)}
            value={newOrder.comment}
            placeholder="Ваш комментарий к заказу"
          />
          <p></p>
          <input
            required
            onChange={(obj) => setAddress(obj.target.value)}
            value={newOrder.address}
            placeholder="225320, г.Барановичи, ул.Советская, д.34, кв.93"
          />
          <p></p>
          <input
            required
            type="tel"
            onChange={(obj) => setPhoneNumber(obj.target.value)}
            value={newOrder.phoneNumber}
            placeholder="+375 33 630 82 40"
          />
          <p></p>
        </div>
        <input type="submit" value="Оформить заказ"/>
      </form>
    </div>
  );
}

export default Ordering;
