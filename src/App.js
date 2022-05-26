import React from "react";
import { Route, Routes, useNavigate} from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductInfo from "./pages/ProductInfo";

import AppContext from "./context";
import Registration from "./pages/Registration";
import Cart from "./pages/Cart";
import DeliveryAndPayment from "./pages/DeliveryAndPayment";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const Navigate = useNavigate();


  const [user, setUser] = React.useState(()=>{
    return{
      id: "",
      email: "",
      name: "",
      role: "USER_ROLE",
      active: false
    }
  });

  React.useEffect(() => {
    async function fetchData() {
      try {
       if(user.id){
        const cartResponse = await axios.get(
          `http://localhost:8088/getCartItems/${16}`
        );
        setCartItems(cartResponse.data);
        }
        else{
          const cartResponse = JSON.parse(localStorage.getItem('cartItems'));
          setCartItems(cartResponse);
        }

         const itemsResponse = await axios.get(
           "http://localhost:8088/getProducts"
         );
        setItems(itemsResponse.data);
        setUser(JSON.parse(localStorage.getItem('user')));
      } catch (error) {
        alert("Ошибка при запросе данных :(");
      }
    }

    fetchData();
  }, []);

  const onAddItemToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.productId) === Number(obj.productId)
      );
      
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.productId) !== Number(obj.productId))
        );
     if(user.id){
          await axios.post("http://localhost:8088/deleteCartItem", {userId: 16, productId: obj.productId, quantity: obj.quantity});
        }
        else{
          localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((item) => Number(item.productId) !== Number(obj.productId))))
        }
      } 
       else {
        setCartItems((prev) => [...prev, obj]);
        
        if(user.id){
        await axios.post( "http://localhost:8088/addCartItem", {userId: 16, productId: obj.productId, quantity: obj.quantity});
        }
        else{
          localStorage.setItem('cartItems', JSON.stringify([...cartItems, obj]))
        }     
     }
    } catch (error) {
     alert("Не удалось добавить товар в корзину");
   }
  };

  const onRemoveFromCart = async (id) => {
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.productId) !== Number(id)));
     if (user.id){
      await axios.post("http://localhost:8088/deleteCartItem", {userId: 16, productId: id, quantity: 1});
      }
      else{
        localStorage.setItem('cartItems', JSON.stringify(cartItems.filter((item) => Number(item.productId) !== Number(id))))
      }
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
    }
  };

  const onUpdateQuantityInCart = async (obj) => {
    try {
      await axios.post("http://localhost:8088/updateQuantity", {userId: 16, productId: obj.productId, quantity: obj.quantity});
    } catch (error) {
     alert("Не удалось изменить количество товара в корзине");
   }
  };

  const onDeleteProduct = async (id) => {
    try {
      setItems((prev)=> prev.filter((item) => Number(item.id) !== Number(id)));
      await axios.post(`http://localhost:8088/deleteProduct/${id}`);
      Navigate("/");
    } catch (error) {
      alert("Не удалось удалить товар");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.productId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, setCartItems, cartItems, isItemAdded, user, setUser, onUpdateQuantityInCart}}>
      <div className="wrapper clear">
        {cartOpened && (
          <Drawer
            items={cartItems}
            onClose={() => setCartOpened(false)}
            onRemove={onRemoveFromCart}
          />
        )}

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path="/"
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddItemToCart}
              />
            }
          ></Route>
          
          <Route
            path="/cart"
            exact
            element={
              <Cart
              items={cartItems}
              onClose={() => setCartOpened(false)}
              onRemove={onRemoveFromCart}
              />
            }
          ></Route>



          <Route
            path="/login"
            exact
            element={
              <Login
              
              />
            }
          ></Route>

            <Route
            path="/registration"
            exact
            element={
              <Registration
              
              />
            }
          ></Route>
          
          <Route
            path="/info"
            exact
            element={
              <DeliveryAndPayment
              
              />
            }
          ></Route>

          <Route
            path={`/products/:id`}
            exact
            element={
              <ProductInfo
                onDelete = {onDeleteProduct}
                cartItems={cartItems}
                onAddItemToCart = {onAddItemToCart}
              />
            }
          ></Route>

          
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
