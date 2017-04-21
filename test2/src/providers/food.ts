import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the Food provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Food {

	public foodthings = [];      //food items from pantry, format: {name: "food"}
  public recipes = [];
  public recipeDetails = [];
  public foodDetails = [];
  public ingredientsHave = [];  //ingredients in a recipe that the user has
  public recipeInstructions = [];
  public useInRecipe = [];     //food items that are used to generate recipes, format: {name: "food"}
  public recentlyUsed = [];    //items recently used in recipes, format: {name: "food"}

	constructor(public http: Http) {
		for(var i in this.foodthings){
			this.foodthings[i]['recipeSelected'] = false;
			this.foodthings[i]['pantrySelected'] = false;
		}
	}

  updateRecentlyUsed(){
    if(this.useInRecipe.length > 0){
      //useInRecipe after the items were deleted from the original useInRecipe
      //so doesn't include any items deleted from foodthings
      for(var item of this.useInRecipe){
        this.recentlyUsed.push(item);        
      }
      this.useInRecipe = [];
    }
    else {
      //removes any items from recently used that are no longer in the pantry
      for(var item of this.recentlyUsed){
        var index = this.foodthings.indexOf(item);
        if(index > -1){
          this.recentlyUsed.splice(index, 1);
        }
      }
    }
    
  }

	filterItems(searchQuery){
		console.log("food filtering");
		return this.foodthings.filter((food) => {
			return food.name.indexOf(searchQuery.toLowerCase()) > -1;
		});
	}
  
  sortPantry(sort){
    console.log("boop");
    console.log(sort);
    if(sort=="alphabetical"){
      this.foodthings = this.foodthings.sort((n1,n2) => {
          if (n1.name > n2.name) {
              return 1;
          }
          if (n1.name < n2.name) {
              return -1;
          }
          return 0;
      });  
    }
    else if (sort=="category"){
      this.foodthings = this.foodthings.sort((n1,n2) => {
          if (n1.attr1 > n2.attr1) {
              return 1;
          }
          else if (n1.attr1 < n2.attr1) {
              return -1;
          }
          else if (n1.attr1 == n2.attr1){
            if (n1.attr2 > n2.attr2) {
                return 1;
            }
            else if (n1.attr2 < n2.attr2) {
                return -1;
            }
          }
          else{
            return 0;
          }
          
      });  
    }
    else if (sort=="recent"){
      console.log("recent sort not yet done!");
    }
    else{
      console.log("lol how did you get here")
    }
    for(var i in this.foodthings){
      console.log(this.foodthings[i].name);
    }
    console.log("done sorting!  Enjoy your life!");
  }
  

}
