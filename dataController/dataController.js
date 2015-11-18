var dataStackController = window.dataStackController = require(
    'dataStackController');

var dataController = {
    data: {},
    // 撤销的时候的一个备份
    updateCallback: function(data) {},
    init: function(data, updateCallback) {
        this.data = data;
        dataStackController.init(data); //这里有一个完整数据的副本
        this.updateCallback = updateCallback;
    },
    update: function() {
        this.updateCallback(this.data);
    },
    undo: function() {
        var change = dataStackController.undo();
        if (change) {
            this.set(change);
        }
    },
    redo: function() {
        var change = dataStackController.redo();
        if (change) {
            this.set(change);
        }
    },
    // addChange 表示计入状态堆栈，比如拖拽这种连续修改值的操作应该加上此标志
    set: function(setOptions, addChange) {
        var _this = this;


        // 加入变化队列
        if (addChange) {
            dataStackController.set(setOptions, true);
        }


        //设置新值
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
    get: function(args) {
        var _this = this;
        if (typeof(args) === "undefined") {
            return this.data;
        } else if (typeof(args) === "string") {
            return this.getOne(args);
        } else if (typeof(args) === "object" && args.join) {
            var obj = {};
            args.forEach(function(fullkey) {
                obj[fullkey] = _this.getOne(fullkey);
            });
            return obj;
        }

    }
};
module.exports = dataController;
