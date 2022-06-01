import React from "react";
import st from "./About.module.scss";

function About() {
  return (
    <div className={st.content}>
        <div className={st.mainInfo}>
        <h3>IRENA'S CHEST</h3>
        <h5>Это интернет-магазин рукодельных изделий</h5>
        </div>
        <div className={st.mainInfo}>
        <h3>Лущик Ирина Анатольевна</h3>
        <h5>Мастер, ремесленник</h5>
        </div>
      <h4>Почему именно мы?</h4>
      <ul type="disc">
        <li>- Ручная работа</li>
        <li>- Гарантия качества</li>
        <li>- Быстрый заказ</li>
        <li>- Широкий ассортимент</li>
        <li>- Работа на заказ</li>
        <li>- Отзывчивость</li>
      </ul>

    </div>
  );
}

export default About;
