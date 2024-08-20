import style from "./Content.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faClock,
  faFaceSmile,
  faUser,
} from "@fortawesome/free-regular-svg-icons";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
const cx = classNames.bind(style);
function Content() {
  return (
    <div className={cx("wrapper")}>
      <div className={cx("content")}>
        <div className={cx("recipeContent")}>
          <div className={cx("recipeImg")}>
            <img
              src="http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg"
              alt=""
            />
            <h1 className={cx("recipeName")}>
              <span>Cauliflower Pizza Crust (with BBQ Chicken Pizza)</span>
            </h1>
          </div>
          <div className={cx("recipeAction")}>
            <div className={cx("recipeTime")}>
              <FontAwesomeIcon icon={faClock} />
              <p>75 MINUTES</p>
            </div>
            <div className={cx("recipeServing")}>
              <FontAwesomeIcon icon={faUser} />
              <p>4 SERVINGS</p>
              <div className={cx("recipeServingDecrease")}>+</div>
              <div className={cx("recipeServingIncrease")}>-</div>
            </div>
            <div className={cx("recipeBookMark")}>
              <FontAwesomeIcon icon={faBookmark} />
            </div>
          </div>
          <div className={cx("recipeIngre")}>
            <h3>RECIPE INGREDIENTS</h3>
            <ul className={cx("listIngre")}>
              <li>
                {" "}
                <FontAwesomeIcon className={cx("icon")} icon={faCheck} /> Nihil
                dicta facilis temperature nesciunt.
              </li>
              <li>
                {" "}
                <FontAwesomeIcon className={cx("icon")} icon={faCheck} /> Nihil
                dicta facilis temperature nesciunt.
              </li>
              <li>
                {" "}
                <FontAwesomeIcon className={cx("icon")} icon={faCheck} /> Nihil
                dicta facilis temperature nesciunt.
              </li>
              <li>
                {" "}
                <FontAwesomeIcon className={cx("icon")} icon={faCheck} /> Nihil
                dicta facilis temperature nesciunt.
              </li>
              <li>
                {" "}
                <FontAwesomeIcon className={cx("icon")} icon={faCheck} /> Nihil
                dicta facilis temperature nesciunt.
              </li>
            </ul>
          </div>
          <div className={cx("recipeDetail")}>
            <h3>HOW TO COOK IT</h3>
            <p>
              This recipe was carefully designed and tested by{" "}
              <span>Viet Anh Cooking</span>. Please check out directions at
              their websites.
            </p>
            <button>
              <a href="">
                DIRECTIONS <FontAwesomeIcon icon={faArrowRight} />
              </a>
            </button>
          </div>
        </div>
        <div className={cx("initContent")}>
          <FontAwesomeIcon icon={faFaceSmile} />
          <span>
            Start by searching for a recipe or an ingredient. Have fun!
          </span>
        </div>
      </div>
    </div>
  );
}

export default Content;
