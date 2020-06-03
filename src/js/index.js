import Search from './models/Search';
import {elements, renderLoader, clearLoader, renderResults} from './views/base';
import * as searchView from './views/searchView';
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

