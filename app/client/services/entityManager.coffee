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
        url: "http://localhost:8000/api"

        @_createEntity: ->
            return new @(@endpoint)

        @extract: (entities) ->
            for item in entities?
                entity = @_createEntity()
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

        @get: (id) ->
            deferred = $q.defer()
            url = @url + '/' + @endpoint + '/' + id + '/'
            entity = @_createEntity()
            $http.get(url).then(
                (response) =>
                    entity.deserialize(response.data)
                    deferred.resolve(entity)
                (error) =>
                    $log.error('retrieve failed', error)
                    deferred.reject(error)
            )
            return entity

        @create: (entity) ->
            deferred = $q.defer()
            url = @url + '/' + @endpoint + '/'
            $http.post(url, entity.serialize()).then(
                (response) =>
                    entity = @_createEntity
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
            url = @url + '/' + @endpoint + '/' + @id + '/'
            $http.put(url, @serialize()).then(
                (response) =>
                    @deserialize(response.data)
                (error) =>
                    console.log(error)
            )
            return

        delete: ->
            deferred = $q.defer()
            url = @url + '/' + @endpoint + '/' + entity.id + '/'
            $http.delete(url).then(
                (response) =>
                    deferred.resolve(response)
                (error) =>
                    deferred.reject(error)
            )
            return deferred.promise
])
