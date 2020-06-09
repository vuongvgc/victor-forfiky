export default class Likes {
    constructor(){
        this.likes = []
    }
    addLike (id, title, author, img) => {
        const like = {id, title, author, img};
        this.likes.push(like);
    }
    deleteLike (id) => {
        const like = this.likes.findIndex(el => el.id === id);
        this.likes.splice(like, 1);
    }
    isLike(id) => {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumLike() => {
        return this.likes.length;
    }
}