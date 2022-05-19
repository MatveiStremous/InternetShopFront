import { Link } from 'react-router-dom';
import React from 'react';
import AppContext from '../context';

function Header(props){
  const {cartItems} = React.useContext(AppContext);
  const totalPrice = cartItems.reduce((sum, obj)=>obj.price+sum,0);

  return(
        <header className="d-flex justify-between align-center p-40">
        <Link to="/">
        <div className="d-flex align-center cu-p">
        <img width={60} height={60} src="/img/logo.png" alt="Logo"/>
        <div>
          <h3 className="text-uppercase">Irena's Chest</h3>
          <p className="opacity-5">Магазин рукодельных изделий</p> 
        </div>
        </div>
        </Link>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={27} height={27} src="/img/cart.png" alt="Cart"/>
          <span>{totalPrice} руб.</span>  
          </li>
          <li>
          <img width={27} height={27} src="/img/user.png" alt="User"/>
          </li>
        </ul>
      </header>
    )
}

export default Header;