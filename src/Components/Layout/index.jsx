import style from "./Layout.module.scss";
import classNames from "classnames/bind";

import { useEffect, useState } from "react";

import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
import Content from "./Content/Content";

const cx = classNames.bind(style);

function Layout() {
  const [foodItems, setFoodItems] = useState({});
  function onSearch(search) {
    console.log(search);
    setFoodItems(search);
  }

  return (
    <div className={cx("wrapper")}>
      {console.log(foodItems)}
      <Header handleSearch={onSearch} />
      <div className={cx("container")}>
        <Sidebar foods={foodItems} />
        <Content />
      </div>
    </div>
  );
}

export default Layout;
