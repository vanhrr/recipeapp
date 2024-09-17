import style from "./Content.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faClock,
  faFaceSmile,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRight,
  faCheck,
  faBookmark as faBookmarked,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { getDetailFood } from "../../../utils/httpRequest";
import useLocalStorage from "../../../hooks/useLocalStorage";
const cx = classNames.bind(style);

let servings = 1;

function Content({ activeFood, handleBookmarkChange }) {
  const [currentFood, setCurrentFood] = useState({});
  const [currentFoodServings, setCurrentFoodServings] = useState(1);
  const [isBookmark, setIsBookmark] = useState(false);
  const bookmarkList = [];

  for (let i = 0; i < localStorage.length; i++) {
    bookmarkList.push(localStorage.key(i));
  }
  console.log(bookmarkList);
  const { setItem, getItem, removeItem } = useLocalStorage(
    currentFood.id || "value"
  );

  useEffect(() => {
    const handleAPI = async () => {
      const res = await getDetailFood(`/${activeFood.id}`);
      setCurrentFood(res.recipe);
      setCurrentFoodServings(res.recipe.servings);
    };
    handleAPI();
  }, [activeFood]);
  currentFood.id ? (servings = currentFood.servings) : 1;
  const handleBookMark = () => {
    if (bookmarkList.includes(activeFood.id)) {
      removeItem(activeFood);
      handleBookmarkChange(false);
    } else {
      setItem(activeFood);
      handleBookmarkChange(true);
    }
    setIsBookmark((prev) => {
      return !prev;
    });
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        {currentFood.id && (
          <div className={cx("recipeContent")}>
            <div className={cx("recipeImg")}>
              <img src={activeFood.image_url} alt="" />
              <h1 className={cx("recipeName")}>
                <span>{activeFood.title}</span>
              </h1>
            </div>
            <div className={cx("recipeAction")}>
              <div className={cx("recipeTime")}>
                <FontAwesomeIcon icon={faClock} />
                <p>{currentFood.cooking_time} MINUTES</p>
              </div>
              <div className={cx("recipeServing")}>
                <FontAwesomeIcon icon={faUser} />
                <p>{currentFoodServings} SERVINGS</p>
                <div
                  onClick={() => {
                    setCurrentFoodServings((prev) => prev + 1);
                  }}
                  className={cx("recipeServingDecrease")}
                >
                  +
                </div>
                <div
                  onClick={() => {
                    currentFoodServings !== 1 &&
                      setCurrentFoodServings((prev) => prev - 1);
                  }}
                  className={cx("recipeServingIncrease")}
                >
                  -
                </div>
              </div>
              <div onClick={handleBookMark} className={cx("recipeBookMark")}>
                <FontAwesomeIcon
                  icon={
                    bookmarkList.includes(activeFood.id)
                      ? faBookmarked
                      : faBookmark
                  }
                />
              </div>
            </div>
            <div className={cx("recipeIngre")}>
              <h3>RECIPE INGREDIENTS</h3>
              <ul className={cx("listIngre")}>
                {currentFood.id !== null &&
                  currentFood.ingredients.map((item) => {
                    return (
                      <li>
                        <FontAwesomeIcon
                          className={cx("icon")}
                          icon={faCheck}
                        />
                        {item.quantity &&
                          (currentFoodServings / servings) * item.quantity}{" "}
                        {item.unit} {item.description}
                      </li>
                    );
                  })}
              </ul>
            </div>
            <div className={cx("recipeDetail")}>
              <h3>HOW TO COOK IT</h3>
              <p>
                This recipe was carefully designed and tested by{" "}
                <span>{activeFood.publisher}</span>. Please check out directions
                at their websites.
              </p>
              <button>
                <a href={currentFood.source_url}>
                  DIRECTIONS <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </button>
            </div>
          </div>
        )}
        {currentFood.id ? (
          <></>
        ) : (
          <div className={cx("initContent")}>
            <FontAwesomeIcon icon={faFaceSmile} />
            <span>
              Start by searching for a recipe or an ingredient. Have fun!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Content;
