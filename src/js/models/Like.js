export default class Likes {
    constructor() {
        this.likes = [] ;
       // localStorage.setItem('like', this.likes);
    }
    addLike(id, title, author, img) {
        const like = {id, title, author, img};
        this.likes.push(like);
        this.dataPersistent();
        return like; 
    }
    deleteLike(id) {
        const like = this.likes.findIndex(el => el.id === id);
        this.likes.splice(like, 1);
        this.dataPersistent();
    }
    isLike(id) {
        return this.likes.findIndex(el => el.id === id) !== -1;
    }
    getNumLike() {
        //console.log(this.likes.length);
        return this.likes.length;
    }
    dataPersistent() {
        localStorage.setItem('likes', JSON.stringify(this.likes))
    }
    readLocalStorage() {
        const strorage = localStorage.getItem('likes');
        this.likes = JSON.parse(strorage);
    }
}