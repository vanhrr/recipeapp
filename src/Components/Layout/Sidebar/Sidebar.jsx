import style from "./Sidebar.module.scss";
import classNames from "classnames/bind";
import FoodItem from "../../FoodItem/FoodItem";
const cx = classNames.bind(style);
function Sidebar({ foods }) {
  return (
    <div className={cx("wrapper")}>
      {foods.foods &&
        foods.foods.map((item, index) => {
          //console.log(item.publisher);
          return (
            <FoodItem
              key={index}
              image={item.image_url}
              title={item.title}
              publisher={item.publisher}
            />
          );
        })}

      <p className={cx("copyRight")}>
        © Copyright by Vanhrr. Use for learning or your portfolio. Don't use to
        teach. Don't claim as your own.
      </p>
    </div>
  );
}

export default Sidebar;
