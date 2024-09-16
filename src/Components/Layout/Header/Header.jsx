import style from "./Header.module.scss";
import classNames from "classnames/bind";
import { get } from "../../../utils/httpRequest";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";
import useLocalStorage from "../../../hooks/useLocalStorage";
import Modal from "../../Modal/Modal";
import FoodItem from "../../FoodItem/FoodItem";
const cx = classNames.bind(style);

function Header({ handleSearch }) {
  const [foodList, setFoodList] = useState({
    results: "",
    foods: [],
  });
  const [foodChange, setFoodChange] = useState(false);
  const searchInputRef = useRef("");
  const [formAdd, setFormAdd] = useState(false);
  const [searchResult, setSearchResult] = useState("");
  const { getItem } = useLocalStorage("value");
  const listItems = getItem();
  console.log(listItems);
  useEffect(() => {
    console.log("Call useEffect");
    const handleAPI = async () => {
      const res = await get("", {
        params: {
          search: searchResult,
        },
      });
      setFoodList({
        results: res.results,
        foods: res.data.recipes,
      });
    };
    handleAPI();
    setFoodChange((prev) => !prev);
  }, [searchResult]);
  function handleOnChange(event) {
    searchInputRef.current = event.target.value;
    //setSearchInput(event.target.value);
    console.log(event.target.value);
  }
  function handleOnClick() {
    setSearchResult(searchInputRef.current);
    //setSearchResult(searchInput);
    console.log("click!");
  }
  function handleOnEnter(e) {
    if (e.key === "Enter") {
      setSearchResult(searchInputRef.current);
      //setSearchResult(searchInput);
    }
  }
  function handleOffForm() {
    setFormAdd(false);
  }
  return (
    <div className={cx("wrapper")} onKeyDown={handleOnEnter}>
      {searchResult && handleSearch(foodList)}
      <div className={cx("logo")}>
        <img src="../../../../public/logo.png" alt="Logo" />
      </div>
      <div className={cx("searchBar")}>
        <input
          spellCheck="false"
          className={cx("searchInput")}
          placeholder="Search over 1,000,000 recipes"
          onChange={handleOnChange}
        ></input>
        <button className={cx("searchBtn")} onClick={handleOnClick}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          <span>Search</span>
        </button>
      </div>
      <div className={cx("headerAction")}>
        <div
          onClick={() => {
            setFormAdd(true);
          }}
          className={cx("addBtn")}
        >
          <FontAwesomeIcon className={cx("icon")} icon={faPenToSquare} />
          <span>ADD RECIPE</span>
        </div>
        <div className={cx("bookMartBtn")}>
          <FontAwesomeIcon className={cx("icon")} icon={faBookmark} />
          <span>BOOKMARKS</span>
          <div className={cx("bookMarkContainer")}>
            <FoodItem
              //onClick={() => getActiveFood(item)}
              //key={index}
              image="http://forkify-api.herokuapp.com/images/pumpkin_rice_soup09d2.jpg"
              title="Mon ngon moi ngay"
              publisher="Nguyen Viet Anh"
            />
            <FoodItem
              //onClick={() => getActiveFood(item)}
              //key={index}
              image="http://forkify-api.herokuapp.com/images/pumpkin_rice_soup09d2.jpg"
              title="Mon ngon moi ngay"
              publisher="Nguyen Viet Anh"
            />
          </div>
        </div>
      </div>
      {console.log("foodlist:" + foodList)}
      {formAdd && <Modal display={handleOffForm} />}
    </div>
  );
}

export default Header;
