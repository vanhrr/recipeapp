import style from "./Layout.module.scss";
import classNames from "classnames/bind";

import { useEffect, useState } from "react";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Content from "./Content/Content";
import Modal from "../Modal/Modal";

const cx = classNames.bind(style);

function Layout() {
  const [foodItems, setFoodItems] = useState({});
  const [activeFood, setActiveFood] = useState({});
  const [bookmarkUpdate, setBookmarkUpdate] = useState(false);
  function onSearch(search) {
    console.log(search);
    setFoodItems(search);
  }
  function getFood(food) {
    setActiveFood(food);
  }
  function handleBookmarkChange(value) {
    setBookmarkUpdate(value);
  }
  return (
    <div className={cx("wrapper")}>
      {console.log(foodItems)}
      <Header handleSearch={onSearch} getActiveFood={getFood} />
      <div className={cx("container")}>
        <Sidebar foods={foodItems} getActiveFood={getFood} />
        <Content
          activeFood={activeFood}
          handleBookmarkChange={handleBookmarkChange}
        />
      </div>
    </div>
  );
}

export default Layout;
