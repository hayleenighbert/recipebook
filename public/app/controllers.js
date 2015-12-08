angular.module('RecipeCtrls', ['RecipeServices'])
.controller('HomeCtrl', ['$scope', 'Recipe', function($scope, Recipe) {
  $scope.recipes = [];
  $scope.search = '';

  Recipe.query(function success(data) {
    $scope.recipes = data;
  }, function error(data) {
    console.log(data)
  });

  $scope.deleteRecipe = function(id, recipesIdx) {
    Recipe.delete({id: id}, function success(data) {
      $scope.recipes.splice(recipesIdx, 1);
    }, function error(data) {
      console.log(data);
    });
  }
}])
.controller('ShowCtrl', ['$scope', '$routeParams', 'Recipe', function($scope, $routeParams, Recipe) {
  $scope.recipe = {};

  Recipe.get({id: $routeParams.id}, function success(data) {
    $scope.recipe = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['$scope', '$location', 'Recipe', function($scope, $location, Recipe) {
  $scope.recipe = {
    title: '',
    description: '',
    image: ''
  };

  $scope.createRecipe = function() {
    Recipe.save($scope.recipe, function success(data) {
      $location.path('/');
    }, function error(data) {
      console.log(data);
    });
  }
}])
//inject scope and auth
.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.logout = function() {
    Auth.removeToken();
  };
}])
  .controller("LoginCtrl", [
    "$scope",
    "$http",
    "$location",
    "Auth",
    function($scope, $http, $location, Auth) {
      $scope.user = {
        email: "",
        password: ""
      };
      $scope.actionName = "Login";
      $scope.userAction = function() {
        $http.post("/api/auth", $scope.user).then(function(res) {
          Auth.saveToken(res.data.token);
          $location.path("/");
        }, function(res) {
          console.log(res.data);
        });
      };
    }])
  .controller("SignupCtrl", [
    "$scope",
    "$http",
    "$location",
    "Auth",
    function($scope, $http, $location, Auth) {
      $scope.user = {
        email: "",
        password: ""
      };
      $scope.actionName = "Sign Up";
      $scope.userAction = function() {
        $http.post("/api/users", $scope.user).then(function(res) {
          $http.post("/api/auth", $scope.user).then(function(res) {
            Auth.saveToken(res.data.token);
            $location.path("/");
          }, function(res) {
            console.log(res.data);
          });
        }, function (res) {
          console.log(res.data);
        });
      }
    }
  ]);