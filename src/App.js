import React from "react";


import Card from "./components/Card";
import Header from "./components/Header";
import Drawer from "./components/Drawer";

function App() {
  const [items, setItems]=React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

React.useEffect(()=>{
  fetch('https://6278f4add00bded55ae1b719.mockapi.io/items')
  .then((res)=>{
    return res.json();
  })
  .then((json)=>{
    setItems(json);
  })
})

const onAddToCart= (obj) =>{
  setCartItems(prev => [...prev, obj]);
}
  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items ={cartItems} onClose={()=>setCartOpened(false)}/> }
      <Header onClickCart = {() => setCartOpened(true)}/>

      <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Все товары</h1>
          <div className="search-block">
            <img width={20} height={20} src="/img/search.png" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {
            items.map((item)=>(
            <Card
            onPlus = {(obj)=>onAddToCart(obj)}
            title = {item.title}
            imageUrl = {item.imageUrl}
            price = {item.price}/>
            ))
          }

        </div>
      </div>
    </div>
  );
}

export default App;
