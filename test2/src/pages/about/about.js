var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { FoodCreatePage } from '../food-create/food-create';
import { ConfirmScannedPage } from '../confirm-scanned/confirm-scanned';
import { Food } from '../../providers/food';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FooddetailPage } from '../fooddetail/fooddetail';
import 'rxjs/add/operator/map';
var AboutPage = (function () {
    function AboutPage(navCtrl, modalCtrl, foodService, http) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.foodService = foodService;
        this.http = http;
        this.selected = [];
        this.inDeletionMode = false;
        this.foodDetail = FooddetailPage;
    }
    AboutPage.prototype.takePicture = function () {
        var _this = this;
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 750,
            targetHeight: 1000
        }).then(function (imageData) {
            // imageData is a base64 encoded string
            _this.base64Image = "data:image/jpeg;base64," + imageData;
            var dataImage = JSON.stringify({ image: _this.base64Image });
            _this.navCtrl.push(ConfirmScannedPage, { image: dataImage });
        }, function (err) {
            alert(err);
        });
    };
    AboutPage.prototype.openFoodCreate = function () {
        var createModal = this.modalCtrl.create(FoodCreatePage);
        createModal.present();
    };
    /******FOR SELECTION MODE*****/
    AboutPage.prototype.multicheckTap = function (food) {
        if (this.inDeletionMode) {
            //checks if item is already selected
            var index = this.selected.indexOf(food);
            if (index > -1) {
                this.selected.splice(index, 1);
                food.pantrySelected = false;
            }
            else {
                this.selected.push(food);
                food.pantrySelected = true;
            }
        }
    };
    AboutPage.prototype.closeSelected = function () {
        this.inDeletionMode = false;
        this.selected = [];
        for (var index in this.foodService.foodthings) {
            this.foodService.foodthings[index].pantrySelected = false;
        }
    };
    AboutPage.prototype.goToFoodDetail = function (food) {
        var _this = this;
        if (!this.inDeletionMode) {
            console.log(food.name);
            console.log(food.api_id);
            var array = JSON.stringify({ data: [food.api_id, 100, "grams"] });
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options = new RequestOptions({
                headers: headers
            });
            this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/foodDetail', array, options)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log(data);
                _this.foodService.foodDetails = data.detail;
                console.log("food id sent to server");
                _this.navCtrl.push(_this.foodDetail);
            }, function (error) {
                console.log("Oooops!");
            });
        }
    };
    AboutPage.prototype.deleteFood = function () {
        var _this = this;
        if (this.inDeletionMode && this.selected.length > 0) {
            console.log("deletion mode");
            var matched = false;
            var index = 0;
            var array = [];
            for (var item in this.selected) {
                while (!matched) {
                    if (this.selected[item].name == this.foodService.foodthings[index].name) {
                        matched = true;
                    }
                    else {
                        index++;
                    }
                }
                this.foodService.foodthings.splice(index, 1);
                index = 0;
                matched = false;
                array.push(this.selected[item].id);
            }
            console.log(this.foodService.foodthings);
            console.log(this.selected);
            console.log(array);
            var data = JSON.stringify({ userid: this.foodService.user, data: array });
            var headers = new Headers({
                'Content-Type': 'application/json'
            });
            var options_1 = new RequestOptions({
                headers: headers
            });
            this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/deleteItem', data, options_1)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log(data.message);
                _this.http.post('http://ec2-52-37-159-82.us-west-2.compute.amazonaws.com/api/getRecipes', JSON.stringify({ userid: _this.foodService.user, flag: 0, data: [] }), options_1)
                    .map(function (res) { return res.json(); })
                    .subscribe(function (data) {
                    _this.foodService.recipes = data.message;
                }, function (error) {
                    console.log("something is wrong with request " + error);
                });
            }, function (error) {
                console.log("Oooops!");
            });
            this.selected = [];
            this.inDeletionMode = false;
        }
        else {
            this.inDeletionMode = !this.inDeletionMode;
        }
    };
    return AboutPage;
}());
AboutPage = __decorate([
    Component({
        selector: 'page-about',
        templateUrl: 'about.html'
    }),
    __metadata("design:paramtypes", [NavController, ModalController, Food, Http])
], AboutPage);
export { AboutPage };
//# sourceMappingURL=about.js.map