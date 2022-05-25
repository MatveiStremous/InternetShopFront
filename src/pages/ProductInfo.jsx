import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AppContext from "../context";


function ProductInfo({onDelete, onAddItemToCart, productId, price, imageUrl}) {
    const params = useParams();
    const {user, isItemAdded} = React.useContext(AppContext);
    const isDeletePermited = user.role === "ADMIN_ROLE" || user.role === "MODERATOR_ROLE";

    React.useEffect(() => {
      async function fetchData() {
        try {
         axios.get( `http://localhost:8088/getProductInfo/${params.id}`)
         .then((res)=>{
          setProduct(res.data)
         },
         ()=>{
           alert("Ошибка при запросе информации о товаре");
         })
        } catch (error) {
          alert("Ошибка при запросе данных :(");
        }
      }
  
      fetchData();
    }, []);
    
    const [product, setProduct] = React.useState(()=>{
      return{
        id: 0,
        title: "",
        price: 0,
        imageUrl: "",
        dateOfCreation: "",
        description: "",
        size: "",
        materials: "",
        quantity: 0
      }
    });

    const onClickPlus = () => { 
      onAddItemToCart({productId: product.id, price: product.price, imageUrl: product.imageUrl, title: product.title});
    };

    return (
      <div className="content p-40">
         <h2>{product.title}</h2>
         <img width={300} src={product.imageUrl} alt="Product" />
        <h4>Описание: {product.description}</h4>
        <h4>Цена: {product.price} руб.</h4>
        <h4>Размеры: {product.size}</h4>
        <h4>Материалы: {product.materials}</h4>
        <img
          //className={styles.plus}
          onClick={onClickPlus}
          src={isItemAdded(params.id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          //src="/img/btn-plus.svg"
          alt="Add"
        />
        {isDeletePermited && <img onClick = {()=>onDelete(product.id)} className="removeBtn" src="/img/btn-remove.svg" alt="Remove" />}
      </div>
    );
  }
  
  export default ProductInfo;