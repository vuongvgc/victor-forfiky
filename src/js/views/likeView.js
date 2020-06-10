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