import {elements} from './base';
export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = ' ';
}
export const clearResults = () => {
    elements.searchResList.innerHTML = ' ';
    elements.searchResPage.innerHTML = ' ';
}
export const hightlightSelected = id => {
    const resultsArray = Array.from(document.querySelectorAll('.results__link'));
    resultsArray.forEach(el => {
        el.classList.remove('results__link--active');
    })
    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
};
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
        <a class="results__link" href="#${repice.recipe_id}">
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
// btn pre next
//https://developer.mozilla.org/vi/docs/Web/API/HTMLElement/dataset
const creatButton = (page, type) => 
`
    <button class="btn-inline results__btn--${type}" data-goto ="${type === 'prev' ? page - 1 : page + 1}">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
    </button>
`
;
const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults/resPerPage);
    let button; // block 
    if (page === 1 && pages > 1){
        // just btn next
       button = creatButton(page,'next');
    }
    else if(page < pages) {
        // both btn next pre
        button = `
        ${creatButton(page,'prev')}
        ${creatButton(page,'next')}
        `;
    }
    else if( page === pages && pages > 1){
        // just btn pre
       button = creatButton(page,'prev');
    }
    elements.searchResPage.insertAdjacentHTML('afterbegin',button);
       
};
export const renderResults = (repices, page = 2, resPerPage = 5) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    //console.log(start, end)
    const sliceRepices = repices.slice(start,end);
    //console.log(sliceRepices);
    sliceRepices.forEach(renderRecipe);
    renderButtons(page, repices.length, resPerPage); 
} 