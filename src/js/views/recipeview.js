import {elements} from './base';
import fraction from 'fractional';
export const clearResults = () => {
    elements.recipe.innerHTML = ' ';
}
const formatCount = count => {
    // count = 2.5 then 2 1/2
    // count = 2 then 2
    if(count) {
        const [int, dec] = count.toString().split('.').map(el => parseInt(el, 10));
        if (!dec) return count;
        if (int == 0) {
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`;

        } else {
            const fr = new Fraction(count - int);
            return `${int} ${fr.numerator}/${fr.denominator}`;

        };
    }
    return '?';

}
const creatIngredient = ingredient => 
    `<li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
`;
export const renderRecipe = (recipe, isLike) => {
    const markUp = `
    <figure class="recipe__fig">
        <img src="${recipe.img}" alt="" class="recipe__img">
        <h1 class="recipe__title">
            <span>${recipe.title}</span>
        </h1>
    </figure>
    <div class="recipe__details">
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-stopwatch"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
            <span class="recipe__info-text"> minutes</span>
        </div>
        <div class="recipe__info">
            <svg class="recipe__info-icon">
                <use href="img/icons.svg#icon-man"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
            <span class="recipe__info-text"> servings</span>

            <div class="recipe__info-buttons">
                <button class="btn-tiny btn-decrease">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny btn-increase">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart${isLike ? '' : '-outlined'}"></use>
            </svg>
        </button>
    </div>
    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            ${recipe.ingredients.map(el => creatIngredient(el)).join('')}
        </ul>
        <button class="btn-small recipe__btn recipe__btn--add">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-shopping-cart"></use>
            </svg>
            <span>Add to shopping list</span>
        </button>
    </div>

    <div class="recipe__directions">
        <h2 class="heading-2">How to cook it</h2>
        <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;
    elements.recipe.insertAdjacentHTML('afterbegin',markUp);
};
export const updateServingsIngredients = recipe => {
    // update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    // update ingredient
    // lay cac gia tri count ra luon . all ingredients ra thanh tung array
    const CountElements = Array.from(document.querySelectorAll('.recipe__count'));
    console.log(CountElements);

    CountElements.forEach((el, i) => {
        // ingredients.count them i vo vong lap cho du so ingredient * count do chinh la data 
        // them format de cho dung format vaf * count
        el.textContent = formatCount(recipe.ingredients[i].count);
    });

}