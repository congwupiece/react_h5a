define('dataController', function(require, exports, module) {
    "use strict";
    var dataController = {
        data: {},
        updateCallback:function(data){},
        init: function(data,updateCallback) {
            this.data = data;
            this.updateCallback = updateCallback;
        },
        set:function(setOptions){
            var _this = this;
            for(var fullkey in setOptions){
                var value = setOptions[fullkey];
                _this.setOne(fullkey, value);
            }
            this.updateCallback(this.data);
        },
        setOne: function(fullkey, value) {
            var keys = fullkey.split(".");
            var parent = this.data;
            for (var i = 0, l = keys.length - 1; i < l; i++) {
                var key = keys[i];
                parent = parent[key];
            }
            var lastKey = keys[i];
            if (typeof parent[lastKey] !== "object") {
                parent[lastKey] = value;
            } else {
                console.error("dataController setOne error");
            }

        },
        getOne:function(fullkey){
            var keys = fullkey.split(".");
            var parent = this.data;
            for (var i = 0, l = keys.length; i < l; i++) {
                var key = keys[i];
                parent = parent[key];
            }
            return parent;
        },
        get: function() {
            return this.data;
        }
    }
    module.exports = dataController;
});