import uniqid from 'uniqid';
export default class List {
    constructor() {
        // creat empty array
        this.items = [];
    }
    addItem (count, unit, ingredient) {
        // Creat obj item
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        };
        // push items
        this.items.push(item);
        // return items
        return item; // chu y returen item

    }
    deleteItem (id) {
        // find index to possition want to remove
        const index = this.items.findIndex(el => el.id === id);
        // remove this item
        this.items.splice(index,1);

    }
    updateCount (id, newcount) {
        // find current value by
        this.items.find(el => {return el.id === id}).count = newcount;
    }
};