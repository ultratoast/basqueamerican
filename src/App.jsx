import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Home from './views/Home'
import CategoryView from './views/CategoryView'
import RecipeView from './views/recipeView'
import Categories from './views/Categories'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categorySlug" element={<CategoryView />} />
        <Route path="/categories/:categorySlug/recipes/:recipeId" element={<RecipeView />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
