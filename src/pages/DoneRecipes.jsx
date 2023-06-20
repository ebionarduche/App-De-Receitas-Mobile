import SaveRecipes from '../components/SaveRecipes';
import '../style/DoneRecipes.css';

function DoneRecipes() {
  return (
    <div className="done-recipes-container">
      <SaveRecipes title="Done Recipes" localKey="doneRecipes" />
    </div>
  );
}

export default DoneRecipes;
