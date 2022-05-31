import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../../context";
import st from "./ProductInfo.module.scss";

function ProductInfo({ onDelete, onAddItemToCart }) {
  const params = useParams();
  const { user, isItemAdded } = React.useContext(AppContext);
  const isDeletePermited =
    user.role === "ADMIN_ROLE" || user.role === "MODERATOR_ROLE";
  const [quantity, setQuantity] = React.useState(1);

  const onPlus = () => {
    setQuantity(quantity + 1);
  };
  const onMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  React.useEffect(() => {
    async function fetchData() {
      try {
        await axios
          .get(`http://localhost:8088/getProductInfo/${params.id}`)
          .then(
            (res) => {
              setProduct(res.data);
              console.log(res.data);
            },
            () => {
              alert("Ошибка при запросе информации о товаре");
            }
          );
      } catch (error) {
        alert("Ошибка при запросе данных :(");
      }
    }

    fetchData();
  }, []);

  const [product, setProduct] = React.useState(() => {
    return {
      id: 0,
      title: "",
      price: 0,
      imageUrl: "",
      dateOfCreation: "",
      description: "",
      size: "",
      materials: "",
    };
  });

  const onClickPlus = () => {
    onAddItemToCart({
      productId: product.id,
      price: product.price,
      imageUrl: product.imageUrl,
      title: product.title,
      quantity: quantity,
    });
  };

  return (
    <div className={st.content}>
      <h2>{product.title}</h2>
      <div className={st.info}>
        <div className={st.image}>
          <img src={product.imageUrl} alt="Product" />
        </div>
        <div>
          <div className={st.price}>
            <h5>{product.price} BYN</h5>
          </div>
          <div className="d-flex">
            {!isItemAdded(params.id) && (
              <div className={st.counter}>
                <div onClick={onMinus} className={st.quantity1}>
                  <img src="/img/minus-number.png" alt="minus" />
                </div>
                <div className={st.number}>
                  <span>{quantity}</span>
                </div>

                <div onClick={onPlus} className={st.quantity2}>
                  <img onClick={onPlus} src="/img/plus-number.png" alt="plus" />
                </div>
              </div>
            )}

            <div className={st.button}>
              <button onClick={onClickPlus}>
                <p>{isItemAdded(params.id) ? "Удалить" : "В корзину"}</p>
              </button>
            </div>
            {isDeletePermited && (
              <div className={st.button}>
                <button onClick={() => onDelete(product.id)}>
                  <p>Удалить товар</p>
                </button>
              </div>
            )}
          </div>

          <div className={st.description}>
            <h4>Описание:</h4>
            <h5>{product.description}</h5>
          </div>
          <div className={st.description}>
            <h4>Материалы:</h4>
            <h5>{product.materials}</h5>
          </div>
          <div className={st.description}>
            <h4>Размеры:</h4>
            <h5>{product.size}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
