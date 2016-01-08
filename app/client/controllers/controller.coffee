angular.module('recipes.controllers', [])
.controller('RecipesCtrl', ['$scope', 'Recipe', ($scope, Recipe) ->

    $scope.recipes = Recipe.list()

    $scope.add = ->
        $scope.recipes.push(new Recipe())
])
