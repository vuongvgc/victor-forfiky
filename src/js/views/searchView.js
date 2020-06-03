import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = ' ';
}
export const clearResults = () => {
    elements.searchResList.innerHTML = ' ';
}
/*
1. split word and delete ' '
2. so sanh > 17 then lay 17 
3. them khoang tran vao
4. return ket qua
*/
const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if ((acc + cur.length) <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
}
const renderRecipe = repice => {
    const markUp = `
        <li>
        <a class="results__link" href="${repice.recipe_id}">
            <figure class="results__fig">
                <img src="${repice.image_url}" alt="${repice.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(repice.title)}</h4>
                <p class="results__author">${repice.publisher}</p>
            </div>
        </a>
        </li>    
    `;
    elements.searchResList.insertAdjacentHTML('beforeend',markUp);
}
export const renderResults = (repices, page = 2, resPerPage = 10) => {
    const start = (page -1) * resPerPage;
    const end = page * resPerPage;
    repices.slice(start,end).forEach(renderRecipe);
}   