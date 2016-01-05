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
