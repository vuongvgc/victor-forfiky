import Search from './models/Search';
import Recipe from './models/Recipe';
import {elements, renderLoader, clearLoader, renderResults, searchResPage, searchResLink} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeview';
/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/** 
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
    // 1. Get query from view
    const query = searchView.getInput();
   // console.log(query);
    if (query) {
        // 2. New search object and add to state
            state.search = new Search(query);
        try {
            // 3. Prepare UI for results
            searchView.clearInput();
            searchView.clearResults();
            renderLoader(elements.searchLoader);

            // 4. Search for recipes
            await state.search.getResults();
            clearLoader();
    
            // 5. Render results on UI
            // console.log(state.search.result);
            //const result = state.search.result;
            //console.log(state.search.result);
            searchView.renderResults(state.search.result);
            
        } catch (err) {
            alert('Something wrong with the search...');
            console.log(err);
        }
    }
}
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})
//TEST

elements.searchResPage.addEventListener('click',e =>{
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        searchView.clearResults();
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.renderResults(state.search.result, goToPage);
       // console.log(goToPage);
    }
});


/** 
 * Recipe CONTROLLER
 */
/*
const r = new Recipe(47746);
r.getRecipe();
console.log(r);
*/
const controlRepice = async () => {
    const id = window.location.hash.replace('#', '');
    //id = 47746;
    if (id) {
        //1. prepare UI for change
            recipeView.clearResults();
            renderLoader(elements.recipe);
            // Hightlight active link
            if(state.search) searchView.hightlightSelected(id);
           
        //2. creat new repice object 
            state.Recipe = new Recipe(id);
        //3. get recipe data and parseingredient
        try {
            await state.Recipe.getRecipe();
            state.Recipe.parseIngredients();
            console.log(state.Recipe.ingredients);
        //4. Calc Serving nanad time
            state.Recipe.calcTime();
            state.Recipe.calcServings();

        //5. Render Recipe
            clearLoader();
            await recipeView.renderRecipe(state.Recipe);
            console.log(state.Recipe);
        }
        catch(err){
            alert(`It wrong somthing ${err}`);
        }
            
    }
};
//window.addEventListener('hashchange', controlRepice);
//window.addEventListener('load',controlRepice);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRepice));
//Handing the recipe button click
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *' )) {
        // decrease button is clicked
        if (state.Recipe.servings > 1) {
            state.Recipe.updateServings('dec');
        }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *' )) {
        // increase button is clicked
        state.Recipe.updateServings('inc');
    }
    console.log(state.Recipe)
});