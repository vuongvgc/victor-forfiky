const elementsString = {
    loader: 'loader'
}
export const elements = {
    // 1. search form 
    searchForm: document.querySelector('.search'),
    // 2. search input
    searchInput: document.querySelector('.search__field'),
    //3. Render UI
    searchResList: document.querySelector('.results__list'),
    searchResLink: document.querySelector('.results__link'),
    //4. Renderreload
    searchLoader: document.querySelector('.results'),
    searchResPage: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    iconLikeMenu: document.querySelector('.likes__field'),
    listLikeMenu: document.querySelector('.likes__list')
}
export const renderLoader = parent => {
    const loader = `
        <div class ="${elementsString.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
}
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementsString.loader}`);
    if(loader) loader.parentElement.removeChild(loader);
}