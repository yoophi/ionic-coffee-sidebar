var BaseController, Module, moduleKeywords,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

moduleKeywords = ['extended', 'included'];

Module = (function() {
  function Module() {}

  Module.extend = function(obj) {
    var key, ref, value;
    for (key in obj) {
      value = obj[key];
      if (indexOf.call(moduleKeywords, key) < 0) {
        this[key] = value;
      }
    }
    if ((ref = obj.extended) != null) {
      ref.apply(this);
    }
    return this;
  };

  Module.include = function(obj) {
    var key, ref, value;
    for (key in obj) {
      value = obj[key];
      if (indexOf.call(moduleKeywords, key) < 0) {
        this.prototype[key] = value;
      }
    }
    if ((ref = obj.included) != null) {
      ref.apply(this);
    }
    return this;
  };

  return Module;

})();

BaseController = (function(superClass) {
  extend(BaseController, superClass);

  BaseController.inject = function() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    return this.$inject = args;
  };

  function BaseController() {
    var args, fn, fn1, i, index, key, len, ref, ref1, ref2;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ref = this.constructor.$inject;
    for (index = i = 0, len = ref.length; i < len; index = ++i) {
      key = ref[index];
      this[key] = args[index];
    }
    if (this.$scope != null) {
      this.scope = this.$scope;
    }
    ref1 = this.constructor.prototype;
    fn1 = (function(_this) {
      return function(key) {
        if (typeof fn === 'function') {
          fn = (typeof fn.bind === "function" ? fn.bind(_this) : void 0) || _.bind(fn, _this);
        }
        Object.defineProperty(_this, key, {
          get: function() {
            return this.scope[key];
          },
          set: function(v) {
            return this.scope[key] = v;
          }
        });
        return _this.scope[key] = fn;
      };
    })(this);
    for (key in ref1) {
      fn = ref1[key];
      if ((key === 'constructor' || key === 'initialize') || key[0] === '_') {
        continue;
      }
      fn1(key);
    }
    if ((ref2 = this.initialize) != null) {
      ref2.call(this);
    }
  }

  return BaseController;

})(Module);
