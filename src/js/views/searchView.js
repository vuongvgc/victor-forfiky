import {elements} from './base';
export const getInput = () => elements.searchIpunt.value;
const renderRecipe = repice => {
    const markUp = `
        <li>
        <a class="results__link results__link--active" href="${repice.recipe_id}">
            <figure class="results__fig">
                <img src="${repice.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="${repice.title}">Pasta with Tomato ...</h4>
                <p class="${repice.publisher}">The Pioneer Woman</p>
            </div>
        </a>
        </li>    
    `;
    elements.renderRecList.insertAdjacentHTML('beforeend',markUp);
}
export const renderResults = repices => {
    repices.forEach(renderRecipe);
}