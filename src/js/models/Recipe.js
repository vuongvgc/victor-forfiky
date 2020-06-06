import axios from 'axios';
export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const res = await axios(`http://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            //console.log(res);
            this.title = res.data.recipe.title;
            this.author = res.data.recipe.publisher;
            this.img = res.data.recipe.image_url;
            this.url = res.data.recipe.source_url;
            this.ingredients = res.data.recipe.ingredients;
        }
        catch (error) {
            console.log(error);
            alert('something went Wrong <3');
        }
        
    }
    calcTime(){
        // Assumme that we need 15 minute for 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng/3);
        this.time = periods * 15 ;
    }
    calcServings() {
        this.servings = 4;
    }
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cup', 'pound'];
        const unitsShort = ['tbsb', 'tbsb', 'oz', 'oz', 'tp', 'tp', 'cup', 'pound'];
        const newIngredients = this.ingredients.map( el =>{
            //1. uniform unit
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            //2. remove parentthese
            ingredient.replace(/ *\([^)]*\) */g, ' ');
            //3. parse ingreient into count unit ingredients
            return ingredient;
        });
        this.ingredients = newIngredients;
            

            
    }
}
