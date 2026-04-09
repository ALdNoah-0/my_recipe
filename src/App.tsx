import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RecipePage from './pages/RecipePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import IngredientPlannerPage from './pages/IngredientPlannerPage';
import LikedRecipes from './pages/LikedRecipes';
import './styles/global.css';
import './App.css';

function AppShell() {
  const location = useLocation();
  const isHomeRoute = location.pathname === '/';

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname, location.search]);

  return (
    <>
      <Header key={location.pathname} />
      <main className={`app-shell ${isHomeRoute ? 'app-shell--home' : ''}`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/ingredient-planner" element={<IngredientPlannerPage />} />
          <Route path="/favourites" element={<LikedRecipes />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <AppShell />
      </div>
    </Router>
  );
}

export default App;
