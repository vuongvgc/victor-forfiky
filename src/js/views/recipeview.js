import {elements} from './base';
export const clearResults = () => {
    elements.viewRecipe.innerHTML = ' ';
}
export const renderRecipe = recipe => {
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
                <use href="${recipe.url}"></use>
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
                <button class="btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-minus"></use>
                    </svg>
                </button>
                <button class="btn-tiny">
                    <svg>
                        <use href="img/icons.svg#icon-circle-with-plus"></use>
                    </svg>
                </button>
            </div>

        </div>
        <button class="recipe__love">
            <svg class="header__likes">
                <use href="img/icons.svg#icon-heart-outlined"></use>
            </svg>
        </button>
    </div>



    <div class="recipe__ingredients">
        <ul class="recipe__ingredient-list">
            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${recipe.ingredients[0].count}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${recipe.ingredients[0].unit}</span>
                    ${recipe.ingredients[0].ingredient}
                </div>
            </li>

            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${recipe.ingredients[1].count}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${recipe.ingredients[1].unit}</span>
                    ${recipe.ingredients[1].ingredient}
                </div>
            </li>

            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${recipe.ingredients[2].count}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${recipe.ingredients[2].unit}</span>
                    ${recipe.ingredients[2].ingredient}
                </div>
            </li>


            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${recipe.ingredients[3].count}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${recipe.ingredients[3].unit}</span>
                    ${recipe.ingredients[3].ingredient}
                </div>
            </li>


            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${recipe.ingredients[4].count}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${recipe.ingredients[4].unit}</span>
                    ${recipe.ingredients[4].ingredient}
                </div>
            </li>


            <li class="recipe__item">
                <svg class="recipe__icon">
                    <use href="img/icons.svg#icon-check"></use>
                </svg>
                <div class="recipe__count">${recipe.ingredients[5].count}</div>
                <div class="recipe__ingredient">
                    <span class="recipe__unit">${recipe.ingredients[5].unit}</span>
                    ${recipe.ingredients[5].ingredient}
                </div>
            </li>

        </ul>

        <button class="btn-small recipe__btn">
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
            <span class="recipe__by">The Pioneer Woman</span>. Please check out directions at their website.
        </p>
        <a class="btn-small recipe__btn" href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/" target="_blank">
            <span>Directions</span>
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-right"></use>
            </svg>

        </a>
    </div>
    `;
    elements.viewRecipe.insertAdjacentHTML('afterbegin',markUp);
}