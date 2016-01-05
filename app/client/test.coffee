class Factory
    @url: "http://www.website.com"
    endpoint: ""
    id: ""

    constructor: () ->

    @create: (params) ->
        entity = new @()
        entity.endpoint = @endpoint
        entity.deserialize(params)
        return entity

    @list: ->
        return @url + "/" + @endpoint + "/"

    update: =>
        return @url + "/" + @endpoint + "/" + @id + "/"

class FactoryA extends Factory
    endpoint: "FactoryA"

class FactoryB extends Factory
    endpoint: "FactoryB"
