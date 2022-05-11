function Header(props){
    return(
        <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
        <img width={60} height={60} src="/img/logo.png" alt="Logo"/>
        <div>
          <h3 className="text-uppercase">Irena's Chest</h3>
          <p className="opacity-5">Магазин рукодельных изделий</p> 
        </div>
        </div>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={27} height={27} src="/img/cart.png" alt="Cart"/>
          <span>119 руб.</span>  
          </li>
          <li>
          <img width={27} height={27} src="/img/user.png" alt="User"/>
          </li>
        </ul>
      </header>
    )
}

export default Header;