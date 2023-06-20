import SaveRecipes from '../components/SaveRecipes';
import '../style/FavoriteRecipes.css';

function FavoritesRecipes() {
  return (
    <div className="favorite-recipes-container">
      <SaveRecipes title="Favorite Recipes" localKey="favoriteRecipes" />
    </div>
  );
}

export default FavoritesRecipes;
