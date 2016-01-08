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
    $scope.recipes = Recipe.list();
    return $scope.add = function() {
      return $scope.recipes.push(new Recipe());
    };
  }
]);

angular.module('recipes.services', []);

angular.module('recipes.services').factory('RESTfulEntity', [
  '$http', '$q', '$log', function($http, $q, $log) {
    var RESTfulEntity;
    return RESTfulEntity = (function() {
      function RESTfulEntity() {}


      /*
      Manager for performing crud operations on general entities
       */

      RESTfulEntity.prototype.url = "http://localhost:8000/api";

      RESTfulEntity.extract = function(data) {
        var entities, entity, i, item, len;
        entities = [];
        for (i = 0, len = data.length; i < len; i++) {
          item = data[i];
          entity = new this();
          entity.deserialize(item);
          entities.push(entity);
        }
        return entities;
      };

      RESTfulEntity.list = function(params, defer) {
        var entities, url;
        if (params == null) {
          params = {};
        }
        if (defer == null) {
          defer = false;
        }
        entities = [];
        url = this.prototype.url + '/' + this.prototype.endpoint + '/';
        $http.get(url, {
          params: params
        }).then((function(_this) {
          return function(response) {
            var e, extracted, i, len, results;
            extracted = _this.extract(response.data);
            results = [];
            for (i = 0, len = extracted.length; i < len; i++) {
              e = extracted[i];
              results.push(entities.push(e));
            }
            return results;
          };
        })(this), (function(_this) {
          return function(error) {
            return $log.error('request error');
          };
        })(this));
        if (defer) {
          return deferred.promise;
        } else {
          return entities;
        }
      };

      RESTfulEntity.get = function(id, defer) {
        var deferred, entity, url;
        if (defer == null) {
          defer = false;
        }
        deferred = $q.defer();
        entity = new this();
        url = this.prototype.url + '/' + this.prototype.endpoint + '/' + id + '/';
        $http.get(url).then((function(_this) {
          return function(response) {
            entity.deserialize(response.data);
            return deferred.resolve(entity);
          };
        })(this), (function(_this) {
          return function(error) {
            return $log.error('retrieve failed', error);
          };
        })(this));
        if (defer) {
          return deferred.promise;
        } else {
          return entity;
        }
      };

      RESTfulEntity.create = function(params) {
        var entity, url;
        entity = new this();
        url = this.prototype.url + '/' + this.prototype.endpoint + '/';
        $http.post(url, params).then((function(_this) {
          return function(response) {
            return entity.deserialize(response.data);
          };
        })(this), (function(_this) {
          return function(error) {
            return $log.error(error);
          };
        })(this));
        return entity;
      };

      RESTfulEntity.createMany = function(entities) {
        var e, post_data, url;
        url = this.prototype.url + '/' + this.prototype.endpoint + '/';
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
            return _this.extract(response.data);
          };
        })(this), (function(_this) {
          return function(error) {
            return $log.error(error);
          };
        })(this));
        return deferred.promise;
      };

      RESTfulEntity.prototype.update = function() {
        var url;
        url = this.url + '/' + this.endpoint + '/' + this.id + '/';
        $http.put(url, this.serialize()).then((function(_this) {
          return function(response) {
            return _this.deserialize(response.data);
          };
        })(this), (function(_this) {
          return function(error) {
            return $log.error(error);
          };
        })(this));
      };

      RESTfulEntity.prototype.save = function() {
        var url;
        if (this.id) {
          return this.update();
        } else {
          url = this.url + '/' + this.endpoint + '/';
          return $http.post(url, this.serialize()).then((function(_this) {
            return function(response) {
              return _this.deserialize(response.data);
            };
          })(this), (function(_this) {
            return function(error) {
              return $log.error(error);
            };
          })(this));
        }
      };

      RESTfulEntity.prototype["delete"] = function() {
        var url;
        url = this.url + '/' + this.endpoint + '/' + this.id + '/';
        return $http["delete"](url).then((function(_this) {
          return function(response) {
            _this.id = void 0;
            return _this.synced = false;
          };
        })(this), (function(_this) {
          return function(error) {
            return $log.error(error);
          };
        })(this));
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

      Recipe.prototype.endpoint = "recipes";

      function Recipe() {
        this.ingredients = [];
      }

      Recipe.prototype.deserialize = function(data) {
        this.id = data.id;
        this.name = data.name;
        this.ingredients = data.ingredients || [];
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

  FactoryA.prototype.endpoint = "FactoryA";

  return FactoryA;

})(Factory);

FactoryB = (function(superClass) {
  extend(FactoryB, superClass);

  function FactoryB() {
    return FactoryB.__super__.constructor.apply(this, arguments);
  }

  FactoryB.prototype.endpoint = "FactoryB";

  return FactoryB;

})(Factory);
