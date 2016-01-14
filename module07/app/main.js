
import angular from 'angular';

class MainController {
  constructor($filter){
        this.tasks = [
      "Do laundry",
      "Buy socks",
      "Buy milk",
      "Laminate kitchen",
      "Buy apples"
    ];
  }
}
let app = angular.module('app', []).controller('MainController', MainController);
