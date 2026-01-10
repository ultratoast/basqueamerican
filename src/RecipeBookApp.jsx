import { useState } from "react"

import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import useRecipes from './hooks/useRecipes'
import { RecipeBookContext } from "./RecipeBookContext";

import Home from './views/Home'
import CategoryView from './views/CategoryView'
import RecipeView from './views/RecipeView'
import Categories from './views/Categories'

export default function RecipeBookApp() {
  const { recipes, byId, categories } = useRecipes()

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/categories" element={<RecipeBookContext value={{recipes, byId, categories}}><Categories /></RecipeBookContext>} />
        <Route path="/categories/:categorySlug" element={<RecipeBookContext value={{recipes, byId, categories}}><CategoryView /></RecipeBookContext>} />
        <Route path="/categories/:categorySlug/recipes/:recipeId" element={<RecipeBookContext value={{recipes, byId, categories}}><RecipeView /></RecipeBookContext>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
