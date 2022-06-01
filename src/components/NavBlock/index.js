import { NavLink } from "react-router-dom";
import React from "react";
import styles from "./NavBlock.module.scss"
import AppContext from "../../context";

function NavBlock() {
  const { user } = React.useContext(AppContext);
  const isModerationPermited =
    user.role === "ADMIN_ROLE" || user.role === "MODERATOR_ROLE";

  return (
    <div className={styles.NavBlock}> 
      <ul className="d-flex align-center ">
        <NavLink to="/" >
          <li>Каталог</li>
        </NavLink>
        <NavLink to="/info">
          <li>Доставка и Оплата</li>
        </NavLink>
        <NavLink to="/about">
          <li>О нас</li>
        </NavLink>
        
        <NavLink to="/myorders">
        {user.id!==0 && <li> Мои заказы </li>}
        </NavLink>
        <NavLink to="/moderation">{isModerationPermited && <li>Модерирование</li>}</NavLink>
        <NavLink to="/administration">{user.role === "ADMIN_ROLE" && <li>Администрирование</li>}</NavLink>
      </ul>
    </div>
  );
}

export default NavBlock;
