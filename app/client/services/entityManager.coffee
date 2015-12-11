angular.module('recipes.services')

.factory('RESTfulEntity', ['$http', '$q', '$log', ($http, $q, $log) ->
    class RESTfulEntity
        ###
        Manager for performing crud operations on general entities
        ###
        cache: []
        @endpoint
        endpoint: null
        @url: "http://localhost:8000/api"

        constructor: () ->

        @extract: (entities) ->
            for item in entities?
                entity = new @()
                entity.deserialize(item)
                @cache.push(entity)

        @list: (params={}) ->
            deferred = $q.defer()
            url = @url + '/' + @endpoint + '/'
            $http.get(url, {params:params}).then(
                (response) =>
                    @cache = []
                    @extract(response.data)
                    deferred.resolve(response.data)
                (error) =>
                    $log.error('request error')
                    deferred.reject(error)
            )
            return deferred.promise

        @retrieve: (id) ->
            deferred = $q.defer()
            url = @url + '/' + @endpoint + '/' + id + '/'
            entity = new @()
            $http.get(url).then(
                (response) =>
                    console.log("Got the response back!", response)
                    #entity = new @()
                    entity.deserialize(response.data)
                    #@cache.push(entity)
                    deferred.resolve(entity)
                (error) =>
                    $log.error('retrieve failed', error)
                    deferred.reject(error)
            )
            return entity

        @get: (id) =>
            return _.find(@cache, (e) -> e.id == id)


        @create: (entity) ->
            deferred = $q.defer()
            url = @url + '/' + @endpoint + '/'
            $http.post(url, entity.serialize()).then(
                (response) =>
                    entity = new @()
                    entity.deserialize(response.data)
                    @cache.push(entity)
                    deferred.resolve(entity)
                (error) =>
                    $log.error(error)
                    deferred.reject(error)
            )
            return deferred.promise

        @createMany: (entities) ->
            deferred = $q.defer()
            url = @url + '/' + @endpoint + '/'
            post_data = (e.toServer() for e in entities)
            $http.post(url, post_data).then(
                (response) =>
                    @extract(response.data.data)
                    deferred.resolve(response.data.data)
                (error) =>
                    $log.error(error)
                    deferred.reject(error)
            )
            return deferred.promise

        update: ->
            deferred = $q.defer()
            url = @url + '/' + @endpoint + '/' + @id + '/'
            $http.put(url, @serialize()).then(
                (response) =>
                    @deserialize(response.data.data)
                    deferred.resolve(response.data.data)
                (error) =>
                    deferred.reject(error)
            )
            return deferred.promise

        delete: (entity) ->
            deferred = $q.defer()
            url = @url + '/' + @endpoint + '/' + entity.id + '/'
            $http.delete(url).then(
                (response) =>
                    _.remove(@cache, (e) ->
                      return e.id == entity.id
                    )
                    deferred.resolve(response)
                (error) =>
                    deferred.reject(error)
            )
            return deferred.promise
])
