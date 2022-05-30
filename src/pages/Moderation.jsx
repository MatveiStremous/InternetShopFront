import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import AddingNewProductForm from "../components/AddingNewProductForm";
import Orders from "../components/Orders";

function Moderation({ onAddNewProduct }) {
  return (
    <div className="p-40">
      <AddingNewProductForm onAddNewProduct={onAddNewProduct}/>
      <p></p>
      <Orders />
      {/* <ul className="d-flex">
       <NavLink to="/orders">
          <li className="mr-40">Заказы</li>
        </NavLink>
        <NavLink to="/moderation/addingNewProduct">
          <li>Добавление товара</li>
        </NavLink>
      </ul> */}

      {/* <Routes>
        <Route
          path="/moderation/addingNewProduct"
          exact
          element={<AddingNewProductForm onAddNewProduct={onAddNewProduct} />}
        ></Route>
        <Route
          path="/orders"
          exact
          element={<Orders />}
        ></Route>
      </Routes> */}
    </div>
  );
}

export default Moderation;
