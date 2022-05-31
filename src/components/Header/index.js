import { Link } from "react-router-dom";
import React from "react";
import AppContext from "../../context";
import NavBlock from "../NavBlock";
import styles from "./Header.module.scss";

function Header(props) {
  const { cartItems } = React.useContext(AppContext);
  const totalPrice = cartItems.reduce(
    (sum, obj) => obj.price * obj.quantity + sum,
    0
  );

  return (
    <>
      <header className={styles.header}>
        <Link to="/">
          <div className="d-flex align-center cu-p">
            <img width={60} height={60} src="/img/logo.png" alt="Logo" />
            <div>
              <h3 className="text-uppercase">Irena's Chest</h3>
              <p className="opacity-5">Магазин рукодельных изделий</p>
            </div>
          </div>
        </Link>
        <div className={styles.rightBlock}>
         
            <div> <Link to={"/cart"}>
              <img width={27} height={27} src="/img/cart.png" alt="Cart" />
            </Link></div>
          
          <Link to={"/cart"}>
            <span>{totalPrice} руб.</span>
       </Link>
          <div onClick={props.onClickLogin}>   
            <img width={27} height={27} src="/img/user.png" alt="User" />
          </div>
        </div>
      </header>
      <NavBlock />
    </>
  );
}

export default Header;
