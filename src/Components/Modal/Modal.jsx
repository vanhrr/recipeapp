// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import classNames from "classnames/bind";
// import style from "./Modal.module.scss";
// const cx = classNames.bind(style);
// const Modal = ({ display }) => {
//   const [title, setTitle] = useState("");
//   const [url, setUrl] = useState("");
//   const [imgURL, setImgURL] = useState("");
//   const [publisher, setPublisher] = useState("");
//   const [prepTime, setPrepTime] = useState("");
//   const [servings, setServings] = useState("");
//   const [ingre1, setIngre1] = useState("");
//   const [ingre2, setIngre2] = useState("");
//   const [ingre3, setIngre3] = useState("");
//   const [ingre4, setIngre4] = useState("");
//   const [ingre5, setIngre5] = useState("");
//   const [ingre6, setIngre6] = useState("");
//   return (
//     <div className={cx("overlay")}>
//       <div className={cx("add-recipe-window")}>
//         <button onClick={() => display()} className={cx("btn--close-modal")}>
//           &times;
//         </button>
//         <form className={cx("upload")}>
//           <div className={cx("upload__column")}>
//             <h3 className={cx("upload__heading")}>Recipe data</h3>
//             <label>Title </label>
//             <input
//               onChange={(event) => {
//                 setTitle(event.target.value);
//               }}
//               value={title}
//               required
//               name="title"
//               type="text"
//             />
//             <label>URL</label>
//             <input
//               onChange={(event) => {
//                 setUrl(event.target.value);
//               }}
//               value={url}
//               required
//               name="sourceUrl"
//               type="text"
//             />
//             <label>Image URL</label>
//             <input
//               onChange={(event) => {
//                 setImgURL(event.target.value);
//               }}
//               value={imgURL}
//               required
//               name="image"
//               type="text"
//             />
//             <label>Publisher</label>
//             <input
//               onChange={(event) => {
//                 setPublisher(event.target.value);
//               }}
//               value={publisher}
//               required
//               name="publisher"
//               type="text"
//             />
//             <label>PREP Time</label>
//             <input
//               onChange={(event) => {
//                 setPrepTime(event.target.value);
//               }}
//               value={prepTime}
//               required
//               name="cookingTime"
//               type="number"
//             />
//             <label>Servings</label>
//             <input
//               onChange={(event) => {
//                 setServings(event.target.value);
//               }}
//               value={servings}
//               required
//               name="servings"
//               type="number"
//             />
//           </div>

//           <div className={cx("upload__column")}>
//             <h3 className={cx("upload__heading")}>Ingredients</h3>
//             <label>Ingredient 1</label>
//             <input
//               onChange={(event) => {
//                 setIngre1(event.target.value);
//               }}
//               value={ingre1}
//               type="text"
//               required
//               name="ingredient-1"
//               placeholder="Format: 'Quantity,Unit,Description'"
//             />
//             <label>Ingredient 2</label>
//             <input
//               onChange={(event) => {
//                 setIngre2(event.target.value);
//               }}
//               value={ingre2}
//               type="text"
//               name="ingredient-2"
//               placeholder="Format: 'Quantity,Unit,Description'"
//             />
//             <label>Ingredient 3</label>
//             <input
//               onChange={(event) => {
//                 setIngre3(event.target.value);
//               }}
//               value={ingre3}
//               type="text"
//               name="ingredient-3"
//               placeholder="Format: 'Quantity,Unit,Description'"
//             />
//             <label>Ingredient 4</label>
//             <input
//               onChange={(event) => {
//                 setIngre4(event.target.value);
//               }}
//               value={ingre4}
//               type="text"
//               name="ingredient-4"
//               placeholder="Format: 'Quantity,Unit,Description'"
//             />
//             <label>Ingredient 5</label>
//             <input
//               onChange={(event) => {
//                 setIngre5(event.target.value);
//               }}
//               value={ingre5}
//               type="text"
//               name="ingredient-5"
//               placeholder="Format: 'Quantity,Unit,Description'"
//             />
//             <label>Ingredient 6</label>
//             <input
//               onChange={(event) => {
//                 setIngre6(event.target.value);
//               }}
//               value={ingre6}
//               type="text"
//               name="ingredient-6"
//               placeholder="Format: 'Quantity,Unit,Description'"
//             />
//           </div>

//           <button className={cx("upload__btn")}>
//             <span>Upload</span>
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Modal;
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import style from "./Modal.module.scss";
const cx = classNames.bind(style);

const Modal = ({ display }) => {
  const { register, handleSubmit, reset } = useForm(); // Sử dụng useForm để quản lý form
  const [isSubmitting, setIsSubmitting] = useState(false); // Trạng thái khi đang submit

  // Hàm xử lý khi form được submit
  const onSubmit = async (data) => {
    setIsSubmitting(true); // Set trạng thái đang submit
    const ingredients = [
      data.ingre1,
      data.ingre2,
      data.ingre3,
      data.ingre4,
      data.ingre5,
      data.ingre6,
    ]
      .filter((ingre) => ingre) // Bỏ qua các ingredient rỗng
      .map((ingre) => {
        const [quantity, unit, description] = ingre.split(",");
        return {
          quantity: quantity.trim(),
          unit: unit.trim(),
          description: description.trim(),
        };
      });

    const recipeData = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients: ingredients,
    };

    try {
      const response = await fetch(
        "https://forkify-api.herokuapp.com/api/v2/recipes?key=0fc2a314-c7ec-4b2b-bbea-7fc9da004a03",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ recipe: recipeData }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      alert("Recipe uploaded successfully!");
      reset(); // Reset form sau khi upload thành công
      display(); // Đóng modal
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsSubmitting(false); // Kết thúc trạng thái đang submit
    }
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("add-recipe-window")}>
        <button onClick={() => display()} className={cx("btn--close-modal")}>
          &times;
        </button>
        <form className={cx("upload")} onSubmit={handleSubmit(onSubmit)}>
          <div className={cx("upload__column")}>
            <h3 className={cx("upload__heading")}>Recipe data</h3>
            <label>Title </label>
            <input
              {...register("title", { required: true })}
              required
              name="title"
              type="text"
            />
            <label>URL</label>
            <input
              {...register("sourceUrl", { required: true })}
              required
              name="sourceUrl"
              type="text"
            />
            <label>Image URL</label>
            <input
              {...register("image", { required: true })}
              required
              name="image"
              type="text"
            />
            <label>Publisher</label>
            <input
              {...register("publisher", { required: true })}
              required
              name="publisher"
              type="text"
            />
            <label>PREP Time</label>
            <input
              {...register("cookingTime", { required: true })}
              required
              name="cookingTime"
              type="number"
            />
            <label>Servings</label>
            <input
              {...register("servings", { required: true })}
              required
              name="servings"
              type="number"
            />
          </div>

          <div className={cx("upload__column")}>
            <h3 className={cx("upload__heading")}>Ingredients</h3>
            <label>Ingredient 1</label>
            <input
              {...register("ingre1")}
              type="text"
              name="ingredient-1"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 2</label>
            <input
              {...register("ingre2")}
              type="text"
              name="ingredient-2"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 3</label>
            <input
              {...register("ingre3")}
              type="text"
              name="ingredient-3"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 4</label>
            <input
              {...register("ingre4")}
              type="text"
              name="ingredient-4"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 5</label>
            <input
              {...register("ingre5")}
              type="text"
              name="ingredient-5"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
            <label>Ingredient 6</label>
            <input
              {...register("ingre6")}
              type="text"
              name="ingredient-6"
              placeholder="Format: 'Quantity,Unit,Description'"
            />
          </div>

          <button
            className={cx("upload__btn")}
            type="submit"
            disabled={isSubmitting}
          >
            <span>{isSubmitting ? "Uploading..." : "Upload"}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
