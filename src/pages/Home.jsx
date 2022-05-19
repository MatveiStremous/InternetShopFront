import React from "react";
import Card from "../components/Card";

function Home({
  items,
  setSearchValue,
  searchValue,
  onChangeSearchInput,
  onAddToCart,
}) {

  return (
    <div className="content p-40">
      <div className="d-flex align-center mb-40 justify-between">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все товары"}
        </h1>
        <div className="search-block">
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
          .map((item, index) => (
            <Card
              key={index} //поменять index на id из item...
              onPlus={(obj) => onAddToCart(obj)}
              {...item}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
