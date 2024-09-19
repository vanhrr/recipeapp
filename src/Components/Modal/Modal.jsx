import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames/bind";
import style from "./Modal.module.scss";
const cx = classNames.bind(style);

const Modal = ({ display }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Process ingredients to fit the expected format for the API
    const ingredients = [
      data.ingre1,
      data.ingre2,
      data.ingre3,
      data.ingre4,
      data.ingre5,
      data.ingre6,
    ]
      .filter((ingre) => ingre) // Filter out empty ingredients
      .map((ingre) => {
        const [quantity, unit, description] = ingre.split(",");
        return {
          quantity: quantity ? parseFloat(quantity.trim()) : null,
          unit: unit?.trim() || "",
          description: description?.trim() || "",
        };
      });

    // Build the recipe object as required by the API
    const recipe = {
      title: data.title,
      source_url: data.sourceUrl, // Corrected field name
      image_url: data.imageUrl, // Corrected field name
      publisher: data.publisher,
      cooking_time: parseInt(data.cookingTime), // Ensure this is a number
      servings: parseInt(data.servings), // Ensure this is a number
      ingredients,
    };

    try {
      const response = await fetch(
        "https://forkify-api.herokuapp.com/api/v2/recipes?key=bef62d0f-e8b5-4cf3-96e1-7e458ad31012",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recipe),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong!");
      }

      alert("Recipe uploaded successfully!");
      reset(); // Reset form after successful upload
      display(); // Close modal
    } catch (error) {
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsSubmitting(false);
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
            <label>Title</label>
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
              {...register("imageUrl", { required: true })}
              required
              name="imageUrl"
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
