var app = angular.module('RecipeApp', ['ngRoute', 'RecipeCtrls', "RecipeServices"]);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $routeProvider
  .when('/', {
    templateUrl: 'app/views/recipes.html',
    controller: 'HomeCtrl'
  })
  .when('/recipes/new', {
    templateUrl: 'app/views/newRecipe.html',
    controller: 'NewCtrl'
  })
  .when('/recipes/:id', {
    templateUrl: 'app/views/showRecipe.html',
    controller: 'ShowCtrl'
  })
  .when('/login', {
    templateUrl: 'app/views/userLogin.html',
    controller: 'LoginCtrl'
  })
  .when('/signup', {
  templateUrl: 'app/views/userLogin.html',
  controller: 'SignupCtrl'
  })
  .otherwise({
    templateUrl: 'app/views/404.html'
  });

  $locationProvider.html5Mode(true);
}])
.config(['$httpProvider', function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
}])
.run(["$rootScope", "Auth", function($rootScope, Auth) {
  $rootScope.isLoggedIn = function() {
    return Auth.isLoggedIn.apply(Auth);
  }
}]);