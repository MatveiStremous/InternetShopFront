import { Link } from 'react-router-dom';
import React from 'react';

function NavBlock(){
  
    return(
          <div className="d-flex  align-center p-10 ml-6">
            <ul className="d-flex align-center ">
            <Link to="/">
              <li className="mr-30 cu-p">Каталог</li>
              </Link>
              <Link to="/info">
              <li className="mr-30 cu-p">Доставка и Оплата</li>
              </Link>
              <Link to="/about">
              <li className="mr-30 cu-p">О нас</li>
              </Link>
              
            </ul>
        </div>
      )
  }
  
  export default NavBlock;