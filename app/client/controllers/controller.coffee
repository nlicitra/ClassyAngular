angular.module('recipes.controllers', [])
.controller('RecipesCtrl', ['$scope', 'Recipe', ($scope, Recipe) ->
    $scope.thing = "It worked"
    console.log(Recipe.endpoint)
    $scope.myRecipe = Recipe.retrieve(2)
    # Recipe.retrieve(2).then(
    #     (success) =>
    #         console.log("resolved:", success)
    #         console.log(Recipe.cache)
    #     (error) =>
    #         console.log("error:", error)
    # )
])
