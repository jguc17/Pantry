import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { IonPullUpFooterState} from 'ionic-pullup';
import { Food } from '../../providers/food';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    footerState: IonPullUpFooterState;
    public foodthings = [{title:"Apple", imageURL: "https://staticdelivery.nexusmods.com/mods/110/images/74627-0-1459502036.jpg",selected: false},
                         {title:"Durian", imageURL: "http://foodnsport.com/assets/images/articles/durian600square.jpg",selected: false},
                         {title:"Banana", imageURL: "http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png",selected: false},
                         {title:"Watermelon", imageURL: "http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png",selected: false},
                         {title:"Coconut", imageURL: "http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png",selected: false},
                         {title:"Fish", imageURL: "http://www.clker.com/cliparts/f/1/d/9/13683029131592382225bananas-icon-md.png",selected: false}];

    public selected = [];
    public anySelected : boolean = false;

    constructor(public navCtrl: NavController, public foodService: Food) {
      this.footerState = IonPullUpFooterState.Collapsed;
      
      interface food {
        name: string;
        imageURL: string;
        selected:  boolean;
      }
      
      function pantryRequestListener () {
      var pantrycontents: food[] = JSON.parse(this.responseText);
      //console.log(pantrycontents[0].name);
    }

    var request = new XMLHttpRequest();
    request.onload = pantryRequestListener;
    request.open("get", '../testpantry.json', true);
    request.send();
    
    }
    
    /******FOR JSON READING******/
    
    /*
    pantryRequestListener () {
    var pantrycontents: Level[] = JSON.parse(this.responseText);
      console.log(pantrycontents[0].name);
    }

    var request = new XMLHttpRequest();
    request.onload = pantryRequestListener;
    request.open("get", "testpantry.json", true);
    request.send();
    */

    /******FOR FOOTER*****/
    footerExpanded() {
      console.log('Footer expanded!');
    }

    footerCollapsed() {
      console.log('Footer collapsed!');
    }

    toggleFooter() {
      this.footerState = this.footerState == IonPullUpFooterState.Collapsed ? IonPullUpFooterState.Expanded : IonPullUpFooterState.Collapsed;
    }

    /******FOR SELECTION MODE*****/
  multicheckTap(food){
    //checks if item is already selected
    var index = this.selected.indexOf(food);
    if(index > -1){
      this.selected.splice(index, 1);
      food.recipeSelected = false;
    }
    else {
      this.selected.push(food);
      food.recipeSelected = true;
    }

    //checks if any items are selected
    if(this.selected.length == 0){
      this.anySelected = false;
    }
    else {
      this.anySelected = true;
    }      
  }

  unselectAll(){
    for(var item of this.foodService.foodthings){
      if(item.recipeSelected){
        item.recipeSelected = false;
      }
    }
    this.selected = [];
    this.anySelected = false;
    console.log("Unselecting all");
  }

}
