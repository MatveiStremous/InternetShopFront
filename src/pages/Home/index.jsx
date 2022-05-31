import React from "react";
import Card from "../../components/Card";
import st from "./Home.module.scss"

function Home({
  items,
  setSearchValue,
  searchValue,
  onChangeSearchInput,
  onAddToCart
}) {

  return (
    <div className={st.content}>
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все товары"}
        </h1>
        <div className={st.searchBlock}>
          <img width={20} height={20} src="/img/search.png" alt="Search" />
          {searchValue && (
            <img
              onClick={() => {
                setSearchValue("");
              }}
              className="clear cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            onChange={onChangeSearchInput}
            value={searchValue}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="d-flex flex-wrap">
        {items
          .filter((item) =>
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item) => (
            <Card
              key={item.productId} 
              onPlus={(obj) => onAddToCart(obj)}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
