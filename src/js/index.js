// find default as Search
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Like';
import {elements, renderLoader, clearLoader, renderResults, searchResPage, searchResLink} from './views/base';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeview';
import * as listView from './views/Listview';
import * as likeView from './views/likeView'
/**Global state of the app
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
            searchView.renderResults(state.search.result);  
        } catch (err) {
            console.log(`Search controller has some wrong ${err}`);
        }
    }
}
// when submit from
elements.searchForm.addEventListener('submit', e => {
    // prevent form submitting a form: 
    // ex: when form is empty cant not search
     e.preventDefault();
    // search a query
    controlSearch();
});
// when click btn
elements.searchResPage.addEventListener('click',e =>{
    // closest method traverese the element and its parent
    // until it finds a node that matches the provided selector string. 
    // Will return itself or the matching ancestor 
    // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
    const btn = e.target.closest('.btn-inline');
    if(btn) {
        // Clear list search result
        searchView.clearResults();
        // control button page
        const goToPage = parseInt(btn.dataset.goto, 10);
        // render result ffolow page
        searchView.renderResults(state.search.result, goToPage);
    }
});
/** 
 * Recipe CONTROLLER
 */
const controlRepice = async () => {
    // give id when you chosse in screen 
    const id = window.location.hash.replace('#', '');
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
        //4. Calc Serving and time
            state.Recipe.calcTime();
            state.Recipe.calcServings();
        //5. Render Recipe
            clearLoader();
            recipeView.renderRecipe(
                state.Recipe,
                state.likes.isLike(id));
            console.log(state.Recipe);
        }
        catch(err){
            console.log(`It wrong somthing Control Recipe ${err}`);
        }
            
    }
};
/** 
 * Listshopping CONTROLLER
 **/
const controlList = () => {
    // creat new list if there is not list
    if(!state.List) state.List = new List();
        //1. give each ingredients and UI
        state.Recipe.ingredients.forEach(el => {
        const item = state.List.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    })
};
//Handle delete and update list item event
elements.shopping.addEventListener('click', e => {
    // choose id of item
    const id = e.target.closest('.shopping__item').dataset.itemid;
    //handle delete item
    if(e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.List.deleteItem(id);
    // prepare UI after deleteItme
        listView.deleteItem(id);
    }
    else if (e.target.matches('.shopping__count, .shopping__count *')) {
    // Handle update count
        const val = parseFloat(e.target.value, 10);
        state.List.updateCount(id, val);
    }
});
/** 
 * Like CONTROLLER
 **/
const controlLike = () => {
    //check state have likes array ?
    if(!state.likes) state.likes = new Like();
    //give ID current
    const currentID = state.Recipe.id;
    // check item have or not like
    if(!state.likes.isLike(currentID)){
        // add to list like
        const newLike = state.likes.addLike(
            currentID,
            state.Recipe.title,
            state.Recipe.author,
            state.Recipe.img
        );
        // change buttom toggle
        likeView.toggleLikeBtn(true);
        // update UI
        likeView.renderLike(newLike);
    }
    else {
        // delete to list like
        state.likes.deleteLike(currentID);
        // change butoon toggle
        likeView.toggleLikeBtn(false);
        // display UI
        likeView.deleteLike(currentID);
    }
    likeView.toggleNumLike(state.likes.getNumLike());
   
};
// add load brower
window.addEventListener('load', () => {
    state.likes = new Like(); 
    // Restore Like
    state.likes.readLocalStorage();
    // toggle like menu button
    likeView.toggleNumLike(state.likes.getNumLike());
    //render exiting like
    state.likes.likes.forEach(like => likeView.renderLike(like))

});
//window.addEventListener('hashchange', controlRepice);
//window.addEventListener('load',controlRepice);
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRepice));
//Handing the recipe button click
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *' )) {
        // decrease button is clicked
        if (state.Recipe.servings > 1) {
            state.Recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.Recipe);
        }
    }
    else if (e.target.matches('.btn-increase, .btn-increase *' )) {
        // increase button is clicked
        state.Recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.Recipe);
        controlList();
    }
    //console.log(state.Recipe)
    // I modify matches by closet for add shopping list  button
    else if (e.target.closest('.recipe__btn--add, .recipe__btn-add *')) {
        //console.log('btn shopping list');
        controlList();
    }
    else if(e.target.closest('.recipe__love, .recipe__love *')) {
        // add event to add like list
        controlLike();
    }
});