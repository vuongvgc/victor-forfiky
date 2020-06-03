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
    //4. Renderreload
    searchLoader: document.querySelector('.results'),
    searchResPage: document.querySelector('.results__pages')
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