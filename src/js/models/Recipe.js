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
    updateServing(type) {
        // servings
        const newServings = type === 'dec' ? this.servings - 1: this.servings + 1;
        // Ingredient
        this.ingredients.forEach(ing => {
            ing.count *= ( newServings/ this.servings);
        });
        this.servings = newServings;


    };
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsb', 'tbsb', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort,'kg', 'g'];
        const newIngredients = this.ingredients.map( el =>{
            //1. uniform unit
            let ingredient = el.toLowerCase();
            
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            //2. remove parentthese
            ingredient.replace(/ *\([^)]*\) */g, ' ');
            //3. parse ingreient into count unit ingredients
            // creat array
            const arrIng = ingredient.split(' ');
            // find posstion of unit 
            const  unitIndex = arrIng.findIndex(el2  => units.includes(el2));
            //console.log(unitIndex);
            // condition purpose
            let objIng;
                //3.1 have have number unit fist position
                //ex 4 1/2 cups , arrCount is (4, 1/2) => 4,5
                // ext 4 cups, arrCount is 4
            
            if ( unitIndex > -1) {
            let count;
            const arrCount = arrIng.slice(0, unitIndex);    
                 if(arrCount.length === 1) {
                    count = eval(arrIng[0].replace('-', '+'));
                 }
                 else {
                    count = eval(arrIng.slice(0, unitIndex).join('+'));
                 }
                 objIng = {
                     count,
                     unit: arrIng[unitIndex],
                     ingredient: arrIng.slice(unitIndex + 1).join(' ')
                 };

             }
                //3.2 No unit fist but have number position 
            else if ( parseInt(arrIng[0], 10)) {
                objIng = {
                    count:parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' ')
                };
             } 
                //3.3 No unit no number fist position
            else if (unitIndex === -1) {
                objIng = {
                    count:'',
                    unit: '',
                    ingredient: arrIng[0]
                };

            }
            return objIng;
        });
        this.ingredients = newIngredients;   
    }
    updateServings (type) {
        // servings
        const newServings = type === 'dec' ? this.servings - 1: this.servings + 1;
        // Ingredient
        this.ingredients.forEach(ing => {
            ing.count *= ( newServings/ this.servings);
        });
        this.servings = newServings;


    };    
}
