class Factory
    @url: "http://www.website.com"
    @endpoint
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
class FactoryB extends Factory
