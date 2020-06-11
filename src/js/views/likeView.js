import {elements} from './base';
export const toggleLikeBtn = (isLiked) => {
    /*
    <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
    */
   const iconString = isLiked ? 'heart' : 'heart-outlined';
   document.querySelector('.recipe__love use').setAttribute('href',`img/icons.svg#icon-${iconString}`);
}
export const toggleNumLike = numLike => {
    //console.log(numLike);
    elements.iconLikeMenu.style.visibility = numLike > 0 ? 'visible' : 'hidden'
}
export const renderLike = like => {
    const markUp = `
        <li>
        <a class="likes__link" href="${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${like.title}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
        </li>
    `;
    elements.listLikeMenu.insertAdjacentHTML("beforeend",markUp);
}
export const deleteLike = id => {
    const  el = document.querySelector(`.likes__link[href="#${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);

}