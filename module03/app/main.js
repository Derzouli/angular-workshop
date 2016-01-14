
import angular from 'angular';

class MainController {
  constructor() {
    this.title = "This is my favorite title";
  }
  foo() {
    this.title = "This is my foo title";
  }
}

let app = angular.module('app', [])
  .controller('MainController', MainController);
