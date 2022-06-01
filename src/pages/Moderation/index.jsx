import React from "react";
import AddingNewProductForm from "../../components/AddingNewProductForm";
import Orders from "../../components/Orders";
import st from "./Moderation.module.scss";
import AppContext from "../../context";

function Moderation({ onAddNewProduct }) {
  const { user } = React.useContext(AppContext);
  const [addedProduct, setAddedProduct] = React.useState(false);
  const isModerationPermited =
    user.role === "ADMIN_ROLE" || user.role === "MODERATOR_ROLE";

  return (
    <>
      {isModerationPermited && (
        <div>
          <div className={st.head}>
            <h2> {addedProduct ? "Добавление товара" : "Просмотр заказов"}</h2>
            <button
              onClick={() => setAddedProduct(!addedProduct)}
              className={st.greenButton}
            >
              {addedProduct ? "К просмотру заказов" : "К добавлению продукта"}
            </button>
          </div>
          <div className={st.content}>
            {addedProduct ? (
              <AddingNewProductForm onAddNewProduct={onAddNewProduct} />
            ) : (
              <Orders />
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Moderation;
