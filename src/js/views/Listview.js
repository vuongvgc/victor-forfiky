import {elements} from './base';
export const renderItem = item => {
    const markup = `
    <li class="shopping__item" data-itemid ="${item.id}">
        <div class="shopping__count" >
            <input type="number" value="${item.count}" step="${item.count}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny"> 
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;
    // snake_case ; // const: Snake_Case
    // camelCase; variable, function, class, obj
    // PascalCase;
    // kebal-case; folder , img, video
    //https://medium.com/better-programming/string-case-styles-camel-pascal-snake-and-kebab-case-981407998841
elements.shopping.insertAdjacentHTML('beforeend', markup);
};
export const deleteItem = id => {
    const item = document.querySelector(`[data-itemid = "${id}"]`);
    //console.log('delete btm')
    if(item) item.parentElement.removeChild(item);
    
};