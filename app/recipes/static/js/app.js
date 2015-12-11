angular.module('recipes', ['recipes.controllers', 'recipes.services']);

angular.module('ClassyAngular', ['ui.router', 'recipes']).config([
  '$stateProvider', '$urlRouterProvider', '$interpolateProvider', function($stateProvider, $urlRouterProvider, $interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
    $urlRouterProvider.otherwise('/');
    $stateProvider.state("app", {
      url: "/",
      template: 'RABBLE RABBLE RABBLE'
    });
  }
]);

angular.module('recipes.controllers', []).controller('RecipesCtrl', [
  '$scope', 'Recipe', function($scope, Recipe) {
    $scope.thing = "It worked";
    console.log(Recipe.endpoint);
    return $scope.myRecipe = Recipe.retrieve(2);
  }
]);

angular.module('recipes.services', []);

angular.module('recipes.services').factory('RESTfulEntity', [
  '$http', '$q', '$log', function($http, $q, $log) {
    var RESTfulEntity;
    return RESTfulEntity = (function() {

      /*
      Manager for performing crud operations on general entities
       */
      RESTfulEntity.prototype.cache = [];

      RESTfulEntity.endpoint;

      RESTfulEntity.prototype.endpoint = null;

      RESTfulEntity.url = "http://localhost:8000/api";

      function RESTfulEntity() {}

      RESTfulEntity.extract = function(entities) {
        var entity, i, item, len, ref, results;
        ref = entities != null;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          item = ref[i];
          entity = new this();
          entity.deserialize(item);
          results.push(this.cache.push(entity));
        }
        return results;
      };

      RESTfulEntity.list = function(params) {
        var deferred, url;
        if (params == null) {
          params = {};
        }
        deferred = $q.defer();
        url = this.url + '/' + this.endpoint + '/';
        $http.get(url, {
          params: params
        }).then((function(_this) {
          return function(response) {
            _this.cache = [];
            _this.extract(response.data);
            return deferred.resolve(response.data);
          };
        })(this), (function(_this) {
          return function(error) {
            $log.error('request error');
            return deferred.reject(error);
          };
        })(this));
        return deferred.promise;
      };

      RESTfulEntity.retrieve = function(id) {
        var deferred, entity, url;
        deferred = $q.defer();
        url = this.url + '/' + this.endpoint + '/' + id + '/';
        entity = new this();
        $http.get(url).then((function(_this) {
          return function(response) {
            console.log("Got the response back!", response);
            entity.deserialize(response.data);
            return deferred.resolve(entity);
          };
        })(this), (function(_this) {
          return function(error) {
            $log.error('retrieve failed', error);
            return deferred.reject(error);
          };
        })(this));
        return entity;
      };

      RESTfulEntity.get = function(id) {
        return _.find(RESTfulEntity.cache, function(e) {
          return e.id === id;
        });
      };

      RESTfulEntity.create = function(entity) {
        var deferred, url;
        deferred = $q.defer();
        url = this.url + '/' + this.endpoint + '/';
        $http.post(url, entity.serialize()).then((function(_this) {
          return function(response) {
            entity = new _this();
            entity.deserialize(response.data);
            _this.cache.push(entity);
            return deferred.resolve(entity);
          };
        })(this), (function(_this) {
          return function(error) {
            $log.error(error);
            return deferred.reject(error);
          };
        })(this));
        return deferred.promise;
      };

      RESTfulEntity.createMany = function(entities) {
        var deferred, e, post_data, url;
        deferred = $q.defer();
        url = this.url + '/' + this.endpoint + '/';
        post_data = (function() {
          var i, len, results;
          results = [];
          for (i = 0, len = entities.length; i < len; i++) {
            e = entities[i];
            results.push(e.toServer());
          }
          return results;
        })();
        $http.post(url, post_data).then((function(_this) {
          return function(response) {
            _this.extract(response.data.data);
            return deferred.resolve(response.data.data);
          };
        })(this), (function(_this) {
          return function(error) {
            $log.error(error);
            return deferred.reject(error);
          };
        })(this));
        return deferred.promise;
      };

      RESTfulEntity.prototype.update = function() {
        var deferred, url;
        deferred = $q.defer();
        url = this.url + '/' + this.endpoint + '/' + this.id + '/';
        $http.put(url, this.serialize()).then((function(_this) {
          return function(response) {
            _this.deserialize(response.data.data);
            return deferred.resolve(response.data.data);
          };
        })(this), (function(_this) {
          return function(error) {
            return deferred.reject(error);
          };
        })(this));
        return deferred.promise;
      };

      RESTfulEntity.prototype["delete"] = function(entity) {
        var deferred, url;
        deferred = $q.defer();
        url = this.url + '/' + this.endpoint + '/' + entity.id + '/';
        $http["delete"](url).then((function(_this) {
          return function(response) {
            _.remove(_this.cache, function(e) {
              return e.id === entity.id;
            });
            return deferred.resolve(response);
          };
        })(this), (function(_this) {
          return function(error) {
            return deferred.reject(error);
          };
        })(this));
        return deferred.promise;
      };

      return RESTfulEntity;

    })();
  }
]);

var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

angular.module('recipes.services').factory('Recipe', [
  'RESTfulEntity', function(RESTfulEntity) {
    var Recipe;
    Recipe = (function(superClass) {
      extend(Recipe, superClass);

      function Recipe() {
        return Recipe.__super__.constructor.apply(this, arguments);
      }

      Recipe.endpoint = "recipes";

      Recipe.prototype.deserialize = function(data) {
        this.id = data.id;
        this.name = data.name;
        this.ingredients = data.ingredients;
        return this.synced = true;
      };

      Recipe.prototype.serialize = function() {
        this.synced = false;
        return {
          name: this.name,
          ingredients: this.ingredients
        };
      };

      return Recipe;

    })(RESTfulEntity);
    return Recipe;
  }
]);

var Factory, FactoryA, FactoryB,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Factory = (function() {
  Factory.url = "http://www.website.com";

  Factory.endpoint;

  Factory.prototype.endpoint = "";

  Factory.prototype.id = "";

  function Factory() {
    this.update = bind(this.update, this);
  }

  Factory.create = function(params) {
    var entity;
    entity = new this();
    entity.endpoint = this.endpoint;
    entity.deserialize(params);
    return entity;
  };

  Factory.list = function() {
    return this.url + "/" + this.endpoint + "/";
  };

  Factory.prototype.update = function() {
    return this.url + "/" + this.endpoint + "/" + this.id + "/";
  };

  return Factory;

})();

FactoryA = (function(superClass) {
  extend(FactoryA, superClass);

  function FactoryA() {
    return FactoryA.__super__.constructor.apply(this, arguments);
  }

  return FactoryA;

})(Factory);

FactoryB = (function(superClass) {
  extend(FactoryB, superClass);

  function FactoryB() {
    return FactoryB.__super__.constructor.apply(this, arguments);
  }

  return FactoryB;

})(Factory);
