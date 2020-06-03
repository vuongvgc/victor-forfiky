export const elements = {
    // 1. search form 
    searchForm: document.querySelector('.search'),
    // 2. search input
    searchInput: document.querySelector('.search__field'),
    //3. Render UI
    searchResList: document.querySelector('.results__list'),
    //4. Renderreload
    searchLoader: document.querySelector('.results')
}
export const renderLoader = parent => {
    const loader = `
        <div class ="loader">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin',loader);
}