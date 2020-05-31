import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = ' ';
}
export const clearResults = () => {
    elements.searchResList.innerHTML = ' ';
}
const renderRecipe = repice => {
    //console.log(repice);
    const markUp = `
        <li>
        <a class="results__link" href="${repice.recipe_id}">
            <figure class="results__fig">
                <img src="${repice.image_url}" alt="${repice.title}">
            </figure>
            <div class="results__data">
                <h4 class="${repice.title}">Pasta with Tomato ...</h4>
                <p class="${repice.publisher}">The Pioneer Woman</p>
            </div>
        </a>
        </li>    
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markUp);
}
export const renderResults = repices => {
    //console.log(repices);
    repices.forEach(renderRecipe);
}