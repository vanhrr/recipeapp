import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import FoodItem from "../../FoodItem/FoodItem";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(style);
function Sidebar({ foods }) {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 10;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const numberOfPage = Math.ceil(foods.results / postPerPage);
  const currentItems =
    foods.foods && foods.foods.slice(firstPostIndex, lastPostIndex);
  return (
    <div className={cx("wrapper")}>
      {currentItems &&
        currentItems.map((item, index) => {
          return (
            <FoodItem
              key={index}
              image={item.image_url}
              title={item.title}
              publisher={item.publisher}
            />
          );
        })}
      <div className={cx("footer")}>
        {
          <div className={cx("pagination")}>
            {currentPage !== 1 && (
              <button
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                }}
                className={cx("decrease")}
              >
                <FontAwesomeIcon
                  className={cx("iconLeft")}
                  icon={faArrowLeft}
                />{" "}
                Page {currentPage - 1}
              </button>
            )}
            {currentPage < numberOfPage && (
              <button
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                }}
                className={cx("increase")}
              >
                Page {currentPage + 1}{" "}
                <FontAwesomeIcon
                  className={cx("iconRight")}
                  icon={faArrowRight}
                />
              </button>
            )}
          </div>
        }

        <p className={cx("copyRight")}>
          © Copyright by Vanhrr. Use for learning or your portfolio. Don't use
          to teach. Don't claim as your own.
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
