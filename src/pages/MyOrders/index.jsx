import React from "react";
import st from "./MyOrders.module.scss";
import axios from "axios";

function MyOrders() {
  const [myOrders, setMyOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const user_id = JSON.parse(localStorage.getItem("user")).id;
        const answer = await axios.get(
          `http://localhost:8088/getUserOrders/${user_id}`
        );
        answer.data.sort(function (a, b) {
          if (a.id > b.id) {
            return 1;
          } else {
            return -1;
          }
        });
        setMyOrders(answer.data);
      } catch (error) {}
    }
    fetchData();
  }, []);

  const onCompleteOrder = async (obj) => {
    try {
      await axios.post(`http://localhost:8088/completeOrder/${obj.id}`);
      window.location.reload();
    } catch (error) {
      alert("Не удалось изменить статус заказа");
    }
  };

  return (
    <div className={st.main}>
      <h4>Мои заказы</h4>
      {myOrders.map((obj) => (
        <div key={obj.id} className={st.row}>
          <div className={st.id}>
            <h2>Заказ №{obj.id}</h2>
            </div>
          <div className={st.content}>
            <h3>Товары</h3>
            <div>{obj.content}</div>
          </div>
          <div className={st.content}>
            <h3>Цена</h3>
            <p>{obj.totalPrice} BYN.</p>
          </div>
          <div className={st.content}>
            <h3>Дата заказа</h3>
            <p>{String(obj.dateOfCreation).substring(0, 10)}</p>
          </div>
          <div className={st.content}>
            <h3>Комментарий</h3>
            <p>{obj.comment}</p>
          </div>
          <div className={st.content}>
            <h3>Адрес</h3>
            <p>{obj.address}</p>
          </div>
          <div className={st.content}>
            <h3>Телефон</h3>
            <p>{obj.phoneNumber}</p>
          </div>
          <div className={st.content}>
            <h3>Статус заказа</h3>
            <p>{obj.orderStatus}</p>
          </div>{obj.orderStatus !== "COMPLETED" && (
            <button
              onClick={() => onCompleteOrder(obj)}
              className={st.greenButton}
            >
              Подтвердить
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
