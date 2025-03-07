import React from "react";
import "./RecipeCard.css"

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img src={recipe.imgUrl} alt={recipe.name} className="recipe-image" />
      <h3>{recipe.name}</h3>
      <p>👨‍🍳 Chef: {recipe.chef}</p>
      <p>{recipe.description}</p>
      <p>⭐ {recipe.avgRating} ({recipe.totalRatings} ratings)</p>
      <p>📅 Uploaded: {recipe.uploadedOn}</p>
      <p>🍽️ {recipe.mealType} | 🥘 {recipe.dishType}</p>
    </div>
  );
};

export default RecipeCard
