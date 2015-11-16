define('dataController', function(require, exports, module) {
    "use strict";
    var dataController = {
        data: {},
        updateCallback: function(data) {},
        init: function(data, updateCallback) {
            this.data = data;
            this.updateCallback = updateCallback;
        },
        update: function() {
            this.updateCallback(this.data);
        },
        set: function(setOptions) {
            var _this = this;
            for (var fullkey in setOptions) {
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
        pushOne: function(fullkey, arrayItem) {
            var arrayObject = this.getOne(fullkey);
            if (typeof arrayObject === 'object' && arrayObject.join) {
                arrayObject.push(arrayItem);
            }
            this.update();
        },
        getTargetElementsByTargetId: function(targetId) {
            //通过targetId 查找element节点
            var key = this.getFullKeyByTargetId(targetId);
            return this.getOne(key);
        },
        getFullKeyByTargetId: function(targetId) {
            var index = targetId.split(".");
            var key = "slideData.slides." + index[0] +
                ".elements." + index[1];
            return key;
        },
        getOne: function(fullkey, rootkey) {
            var keys = fullkey.split(".");
            var parent;
            if (rootkey) {
                parent = this.getOne(rootkey);
            } else {
                parent = this.data;
            }
            for (var i = 0, l = keys.length; i < l; i++) {
                var key = keys[i];
                parent = parent[key];
            }
            return parent;
        },
        get: function() {
            return this.data;
        }
    };
    module.exports = dataController;
});
