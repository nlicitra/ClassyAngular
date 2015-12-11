angular.module('recipes.services')

.factory('Recipe', ['RESTfulEntity', (RESTfulEntity) ->
    class Recipe extends RESTfulEntity
        @endpoint: "recipes"

        constructor: (@endpoint)->

        deserialize: (data) ->
            @id = data.id
            @name = data.name
            @ingredients = data.ingredients
            @synced = true

        serialize: ->
            @synced = false
            return {
                name: @name
                ingredients: @ingredients
            }

    return Recipe
])
