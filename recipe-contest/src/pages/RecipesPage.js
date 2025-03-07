import React, { useState } from "react";
import recipesData from "../data/recipes"; 
import RecipeCard from "../components/RecipeCard"; 
import "./RecipesPage.css"

const RecipesPage = () => {
  const [recipes, setRecipes] = useState(recipesData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [filters, setFilters] = useState({
    mealType: "",
    dishType: "",
  });

  // ✅ Filtering Function
  const filteredRecipes = recipes
    .filter(recipe =>
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.chef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(recipe =>
      filters.mealType ? recipe.mealType === filters.mealType : true
    )
    .filter(recipe =>
      filters.dishType ? recipe.dishType === filters.dishType : true
    )
    .sort((a, b) => {
      if (sortOption === "newest") return new Date(b.uploadedOn) - new Date(a.uploadedOn);
      if (sortOption === "oldest") return new Date(a.uploadedOn) - new Date(b.uploadedOn);
      if (sortOption === "highest") return b.avgRating - a.avgRating;
      if (sortOption === "lowest") return a.avgRating - b.avgRating;
      return 0;
    });

  return (
    <div className="filters-container">
    
      
      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search Recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* ⏳ Sorting Options */}
      <select onChange={(e) => setSortOption(e.target.value)}>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Rating</option>
        <option value="lowest">Lowest Rating</option>
      </select>

      {/* 🍽️ Meal Type Filter */}
      <select onChange={(e) => setFilters({ ...filters, mealType: e.target.value })}>
        <option value="">All Meal Types</option>
        <option value="Dinner">Dinner</option>
        <option value="Lunch">Lunch</option>
        <option value="Breakfast">Breakfast</option>
      </select>

      {/* 🥘 Dish Type Filter */}
      <select onChange={(e) => setFilters({ ...filters, dishType: e.target.value })}>
        <option value="">All Dish Types</option>
        <option value="Curry">Curry</option>
        <option value="Pizza">Pizza</option>
        <option value="Seafood">Seafood</option>
      </select>

      {/* 📝 Recipe List */}
      <div className="recipes-container">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe, index) => <RecipeCard key={index} recipe={recipe} />)
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipesPage;
