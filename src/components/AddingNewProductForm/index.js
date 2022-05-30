import React from "react";
import styles from "./AddingNewProduct.module.scss";


function AddingNewProductForm({onAddNewProduct}) {
    const [title, setTitle] = React.useState("");
    const [imageUrl, setImageUrl] = React.useState("");
    const [materials, setMaterials] = React.useState("");
    const [price, setPrice] = React.useState();
    const [size, setSize] = React.useState("");
    const [description, setDescription] = React.useState("");
  
    const newProduct = {
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description,
        size: size,
        materials: materials,
      };

  return (
    <div >
      <form onSubmit={() => onAddNewProduct(newProduct)}>
        <div>
          <input
            required
            onChange={(obj) => setTitle(obj.target.value)}
            value={newProduct.title}
            placeholder="Подушка декоративная"
          />
          <p></p>
          <input
            required
            onChange={(obj) => setPrice(obj.target.value)}
            value={newProduct.price}
            placeholder="19.99"
          />
          <p></p>
          <input
            required
            onChange={(obj) => setImageUrl(obj.target.value)}
            value={newProduct.imageUrl}
            placeholder="/img/products/2.png"
          />
          <p></p>
          <input
            required
            onChange={(obj) => setDescription(obj.target.value)}
            value={newProduct.description}
            placeholder="Мягкая подушка, декоративная"
          />
          <p></p>
          <input
            required
            onChange={(obj) => setSize(obj.target.value)}
            value={newProduct.size}
            placeholder="10x20x10"
          />
          <p></p>
          <input
            required
            onChange={(obj) => setMaterials(obj.target.value)}
            value={newProduct.materials}
            placeholder="Лён, хлопок"
          />
          <p></p>
        </div>
        <input type="submit" value="Добавить новый продукт"/>
      </form>
      </div>
  );
}

export default AddingNewProductForm;
