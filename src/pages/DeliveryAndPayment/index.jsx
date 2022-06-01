import React from "react";
import st from "./DeliveryAndPayment.module.scss";

function DeliveryAndPayment() {
  return (
    <div className={st.content}>
      <h2>Доставка</h2>
      <h4>Способы доставки</h4>
      <ul type="disc">
        <li>- Белпочта</li>
        <li>- Европочта</li>
        <li>- Самовывоз в г.Барановичи</li>
        <li>- Яндекс доставка в г.Барановичи</li>
      </ul>
      <h4>Стоимость доставки</h4>
      <ul type="disc">
        <li>- Включена в стоимость наложенного платежа (при доставке почтой)</li>
        <li>- Стоимость Яндекс доставки устанавливается сервисом доставки</li>
      </ul>

      <h2>Оплата</h2>
      <h4>Способы оплаты</h4>
      <ul type="disc">
        <li>- Наложенный платёж (только при отправке через Белпочту/Европочту)</li>
        <li>- Наличными (при самовывозе)</li>
        <li>- Перевод на карту (при необходимости, укажите в комментарии к заказу)</li>
      </ul>

    </div>
  );
}

export default DeliveryAndPayment;
