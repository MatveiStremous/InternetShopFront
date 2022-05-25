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
         const cartResponse = await axios.get(
          `http://localhost:8088/getCartItems/${16}`
         );

        const itemsResponse = await axios.get(
          "http://localhost:8088/getProducts"
        );

        // const help = cartResponse.data
        //   .map((item) => (
        //     {productId: item.productId, price: item.price, imageUrl: item.imageUrl, title: item.title}
        //   ))

        setCartItems(cartResponse.data);

        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных :(");
      }
    }

    fetchData();
  }, []);

  // const onAddToCart = async (obj) => {
  //   try {
  //     const findItem = cartItems.find(
  //       (item) => Number(item.parentId) === Number(obj.id)
  //     );

  //     if (findItem) {
  //       setCartItems((prev) =>
  //         prev.filter((item) => Number(item.parentId) !== Number(obj.id))
  //       );
  //       await axios.delete(
  //         `https://6278f4add00bded55ae1b719.mockapi.io/cart/${findItem.id}`
  //       );
  //     } else {
  //       setCartItems((prev) => [...prev, obj]);
  //       const { data } = await axios.post(
  //         "https://6278f4add00bded55ae1b719.mockapi.io/cart",
  //         obj
  //       );
  //       setCartItems((prev) =>
  //         prev.map((item) => {
  //           if (item.parentId === data.parentId) {
  //             return {
  //               ...item,
  //               id: data.id,
  //             };
  //           }
  //           return item;
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     alert("Не удалось добавить товар в корзину");
  //   }
  // };

  const onAddItemToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.productId) === Number(obj.productId)
      );
      
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.productId) !== Number(obj.productId))
        );
        await axios.post("http://localhost:8088/deleteCartItem", {userId: 16, productId: obj.productId, quantity: 1});
      } 
       else {
        setCartItems((prev) => [...prev, obj]);
        await axios.post( "http://localhost:8088/addCartItem", {userId: 16, productId: obj.productId, quantity: 1});     
     }
    } catch (error) {
     alert("Не удалось добавить товар в корзину");
   }
  };

  const onRemoveFromCart = async (id) => {
    try {
      await axios.post("http://localhost:8088/deleteCartItem", {userId: 16, productId: id, quantity: 1});
      setCartItems((prev) =>
        prev.filter((item) => Number(item.productId) !== Number(id)));
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
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
    console.log(id);
    return cartItems.some((obj) => Number(obj.productId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, setCartItems, cartItems, isItemAdded, user, setUser}}>
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
                //onAddToCart={onAddToCart}
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
