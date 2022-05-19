import React from "react";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";

import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(
          "https://6278f4add00bded55ae1b719.mockapi.io/cart"
        );
        const itemsResponse = await axios.get(
          "https://6278f4add00bded55ae1b719.mockapi.io/items"
        );
        setCartItems(cartResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert("Ошибка при запросе данных :(");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      );
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        );
        await axios.delete(
          `https://6278f4add00bded55ae1b719.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://6278f4add00bded55ae1b719.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Не удалось добавить товар в корзину");
    }
  };

  const onRemoveFromCart = async (id) => {
    try {
      axios.delete(`https://6278f4add00bded55ae1b719.mockapi.io/cart/${id}`);
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      );
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, cartItems, isItemAdded }}>
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
                onAddToCart={onAddToCart}
              />
            }
          ></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
