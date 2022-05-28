import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import Moderation from "./pages/Moderation";
import Administration from "./pages/Administration";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const Navigate = useNavigate();

  const [user, setUser] = React.useState(() => {
    return {
      id: 0,
      email: "",
      name: "",
      role: "USER_ROLE",
      active: true,
    };
  });

  React.useEffect(() => {
    try {
      const userID = JSON.parse(localStorage.getItem("user")).id;
    } catch {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, []);

  React.useEffect(() => {
    try {
      const temp = JSON.parse(localStorage.getItem("cartItems"))[1];
    } catch {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      try {
        setUser(JSON.parse(localStorage.getItem("user")));

        const userId = JSON.parse(localStorage.getItem("user")).id;
        if (userId) {
          try {
            const freshUserInfo = await axios.get(
              `http://localhost:8088/getFreshInfoAboutUser/${userId}`
            );
            localStorage.setItem("user", JSON.stringify(freshUserInfo.data));
          } catch {
            alert("Не удалось проверить ваш аккаунт");
          }
        }

        try {
          if (userId) {
            const cartResponse = await axios.get(
              `http://localhost:8088/getCartItems/${userId}`
            );
            setCartItems(cartResponse.data);
          } else {
            const cartResponse = JSON.parse(localStorage.getItem("cartItems"));
            setCartItems(cartResponse);
          }

          const itemsResponse = await axios.get(
            "http://localhost:8088/getProducts"
          );
          setItems(itemsResponse.data);
          //setUser(JSON.parse(localStorage.getItem("user")));
        } catch (error) {
          alert("Ошибка при запросе данных :(");
        }
      } catch (error) {}
    }
    fetchData();
  }, []);

  const onAddItemToCart = async (obj) => {
    console.log("From function onAddItemToCart", user);
    try {
      const findItem = cartItems.find(
        (item) => Number(item.productId) === Number(obj.productId)
      );

      if (findItem) {
        setCartItems((prev) =>
          prev.filter(
            (item) => Number(item.productId) !== Number(obj.productId)
          )
        );
        if (user.id) {
          await axios.post("http://localhost:8088/deleteCartItem", {
            userId: user.id,
            productId: obj.productId,
            quantity: obj.quantity,
          });
        } else {
          localStorage.setItem(
            "cartItems",
            JSON.stringify(
              cartItems.filter(
                (item) => Number(item.productId) !== Number(obj.productId)
              )
            )
          );
        }
      } else {
        setCartItems((prev) => [...prev, obj]);

        if (user.id) {
          await axios.post("http://localhost:8088/addCartItem", {
            userId: user.id,
            productId: obj.productId,
            quantity: obj.quantity,
          });
        } else {
          localStorage.setItem(
            "cartItems",
            JSON.stringify([...cartItems, obj])
          );
        }
      }
    } catch (error) {
      alert("Не удалось добавить товар в корзину");
    }
  };

  const onRemoveFromCart = async (id) => {
    console.log("From function onRemoveFromCart", user);
    try {
      setCartItems((prev) =>
        prev.filter((item) => Number(item.productId) !== Number(id))
      );
      if (user.id) {
        await axios.post("http://localhost:8088/deleteCartItem", {
          userId: user.id,
          productId: id,
          quantity: 1,
        });
      } else {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            cartItems.filter((item) => Number(item.productId) !== Number(id))
          )
        );
      }
    } catch (error) {
      alert("Не удалось удалить товар из корзины");
    }
  };

  const onUpdateQuantityInCart = async (obj) => {
    console.log("From function onUpdateQuantityInCart", user);
    try {
      setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId === obj.productId) {
          return {
            ...item,
            quantity: obj.quantity,
          };
        }
        return item;
      })
    );

      if (user.id) {
        await axios.post("http://localhost:8088/updateQuantity", {
          userId: user.id,
          productId: obj.productId,
          quantity: obj.quantity,
        });
      } else {
        localStorage.setItem(
          "cartItems",
          JSON.stringify(
            cartItems.map((item) => {
              if (item.productId === obj.productId) {
                return {
                  ...item,
                  quantity: obj.quantity,
                };
              }
              return item;
            })
          )
        );
      }
    } catch (error) {
      alert("Не удалось изменить количество товара в корзине");
    }
  };

  const onDeleteProduct = async (id) => {
    try {
      setItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
      await axios.post(`http://localhost:8088/deleteProduct/${id}`);
      Navigate("/");
    } catch (error) {
      alert("Не удалось удалить товар");
    }
  };

  const onAddProduct = async (obj) => {
    try {
      console.log(obj);
      await axios.post(`http://localhost:8088/addNewProduct`, obj);
    } catch (error) {
      alert("Не удалось добавить товар");
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.productId) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        setCartItems,
        cartItems,
        isItemAdded,
        user,
        setUser,
        onUpdateQuantityInCart,
      }}
    >
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

          <Route path="/login" exact element={<Login />}></Route>

          <Route path="/registration" exact element={<Registration />}></Route>

          <Route path="/info" exact element={<DeliveryAndPayment />}></Route>

          <Route
            path={`/products/:id`}
            exact
            element={
              <ProductInfo
                onDelete={onDeleteProduct}
                cartItems={cartItems}
                onAddItemToCart={onAddItemToCart}
              />
            }
          ></Route>

          <Route
            path="/moderation"
            exact
            element={<Moderation onAddNewProduct={onAddProduct} />}
          ></Route>

          <Route path="/administration" exact element={<Administration />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
