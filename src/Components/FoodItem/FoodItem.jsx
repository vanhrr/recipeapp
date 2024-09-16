import style from "./FoodItem.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(style);
function FoodItem({ image, title, publisher, onClick }) {
  return (
    <div className={cx("wrapper")} onClick={() => onClick()}>
      <div className={cx("foodImage")}>
        <img src={image} alt="food image" />
      </div>
      {console.log("render")}
      <div className={cx("foodInfo")}>
        <p className={cx("foodTitle")}>{title}</p>
        <p className={cx("foodPublisher")}>{publisher}</p>
      </div>
    </div>
  );
}

export default FoodItem;
