angular.module('recipes.services')

.factory('RESTfulEntity', ['$http', '$q', '$log', ($http, $q, $log) ->
    class RESTfulEntity
        ###
        Manager for performing crud operations on general entities
        ###
        url: "http://localhost:8000/api"

        @extract: (data) ->
            entities = []
            for item in data
                entity = new @()
                entity.deserialize(item)
                entities.push(entity)
            return entities

        @list: (params={}) ->
            entities = []
            url = @prototype.url + '/' + @prototype.endpoint + '/'
            $http.get(url, {params:params}).then(
                (response) =>
                    extracted = @extract(response.data)
                    for e in extracted
                        entities.push(e)
                (error) =>
                    $log.error('request error')
            )
            return entities

        @get: (id) ->
            entity = new @()
            url = @prototype.url + '/' + @prototype.endpoint + '/' + id + '/'
            $http.get(url).then(
                (response) =>
                    entity.deserialize(response.data)
                (error) =>
                    $log.error('retrieve failed', error)
            )
            return entity

        @create: (params) ->
            entity = new @()
            url = @prototype.url + '/' + @prototype.endpoint + '/'
            $http.post(url, params).then(
                (response) =>
                    entity.deserialize(response.data)
                (error) =>
                    $log.error(error)
            )
            return entity

        @createMany: (entities) ->
            url = @prototype.url + '/' + @prototype.endpoint + '/'
            post_data = (e.toServer() for e in entities)
            $http.post(url, post_data).then(
                (response) =>
                    @extract(response.data)
                (error) =>
                    $log.error(error)
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

        save: ->
            if @id
                @update()
            else
                url = @url + '/' + @endpoint + '/'
                $http.post(url, @serialize()).then(
                    (response) =>
                        @deserialize(response.data)
                    (error) =>
                        $log.error(error)
                )

        delete: ->
            url = @url + '/' + @endpoint + '/' + entity.id + '/'
            $http.delete(url).then(
                (response) =>
                    delete(@id)
                    @synced = false
                    deferred.resolve(response)
                (error) =>
                    deferred.reject(error)
            )
            return deferred.promise
])
