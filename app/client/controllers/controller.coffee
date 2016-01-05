angular.module('recipes.controllers', [])
.controller('RecipesCtrl', ['$scope', 'Recipe', ($scope, Recipe) ->

    $scope.recipes = Recipe.list()
    Recipe.get(2)

    $scope.createdRecipe = Recipe.create({name: "Test Create", ingredients:["i1", "i2"]})
    console.log($scope.createdRecipe)

    $scope.add = ->
        $scope.recipes.push(new Recipe())
])
