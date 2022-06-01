import React from "react";
import st from "./Orders.module.scss";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const answer = await axios.get(`http://localhost:8088/getAllOrders`);
        answer.data.sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          } else {
            return -1;
          }
        });
        setOrders(answer.data);
      } catch (error) {}
    }
    fetchData();
  }, []);

  const onUpOrderStatus = async (obj) => {
    try {
      if (obj.orderStatus === "COMPLETED") {
        alert("Заказ уже потверждён, выше некуда.");
      } else {
        await axios.post(`http://localhost:8088/upOrderStatus/${obj.id}`);
        window.location.reload();
      }
    } catch (error) {
      alert("Не удалось изменить статус заказа");
    }
  };

  const onDownOrderStatus = async (obj) => {
    try {
      if (obj.orderStatus === "CANCELED") {
        alert("Заказ уже отменён, ниже некуда");
      } else {
        await axios.post(`http://localhost:8088/downOrderStatus/${obj.id}`);
        window.location.reload();
      }
    } catch (error) {
      alert("Не удалось изменить статус заказа");
    }
  };

  return (
    <div>
      <div className={st.head}>

      </div>
      {orders.map((obj) => (
        <div key={obj.id} className="d-flex align-center mb-20">
          <h5>
            {obj.id} | {obj.content} | {obj.totalPrice} BYN. |{" "}
            {obj.dateOfCreation} | {obj.comment} |{obj.address} |{" "}
            {obj.phoneNumber} | {obj.orderStatus}
          </h5>
          <img
            className="ml-20 cu-p"
            onClick={() => onUpOrderStatus(obj)}
            width={30}
            height={30}
            src="./img/up.png"
            alt="up"
          />

          <img
            className="ml-20 cu-p"
            onClick={() => onDownOrderStatus(obj)}
            width={30}
            height={30}
            src="./img/down.png"
            alt="down"
          />
        </div>
      ))}
    </div>
  );
}

export default Orders;
