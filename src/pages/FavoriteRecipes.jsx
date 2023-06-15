import SaveRecipes from '../components/SaveRecipes';

function FavoritesRecipes() {
  return (
    <div>
      <SaveRecipes title="Favorite Recipes" localKey="favoriteRecipes" />
    </div>
  );
}

export default FavoritesRecipes;
