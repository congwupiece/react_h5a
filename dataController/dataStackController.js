var dataStackController = {
    data: {},
    changeStack: [], //
    pointer: -1, //目前状态位置指针，指向目前使在changeStack里哪一个
    changeStackSize: 50, //变化的
    init: function(mirrorData) {
        this.data = JSON.parse(JSON.stringify(mirrorData));
    },
    addChangeState: function(oldOptions, newOptions) {
        //添加到操作堆栈里，用来撤销或者重做
        var pointer = this.pointer;
        //pointer之后的
        this.changeStack = this.changeStack.slice(0,
            pointer + 1);
        oldOptions = JSON.parse(JSON.stringify(oldOptions));
        this.changeStack.push({
            from: oldOptions,
            to: newOptions
        });
        if (this.changeStack.length > this.changeStackSize) {
            this.changeStack.shift();
        }
        this.pointer = this.changeStack.length - 1; //一旦push就指向最后一个修改；
    },
    undo: function() {
        var pointer = this.pointer;
        var change;
        if (pointer > -1) {
            change = this.changeStack[pointer];
            this.set(change.from, false);
            this.pointer--;
            return JSON.parse(JSON.stringify(change.from));
        } else {
            console.log("point at the top");
            return false;
        }

    },
    redo: function() {
        var change;
        if (this.pointer < this.changeStack.length - 1) { //在最后一项之前
            this.pointer++;
            change = this.changeStack[this.pointer];
            this.set(change.to, false);
            return JSON.parse(JSON.stringify(change.to));
        } else {
            console.log("pointer at the latest");
            return false;
        }

    },
    set: function(setOptions, addChange) {
        var _this = this;
        //获取原值
        var keys = [];
        for (var key in setOptions) {
            keys.push(key);
        }
        var oldOptions = this.get(keys);
        oldOptions = JSON.parse(JSON.stringify(oldOptions)); //克隆object

        //加入变化队列
        if (addChange) {
            this.addChangeState(oldOptions, setOptions);
        }



        //设置新值
        for (var fullkey in setOptions) {
            var value = setOptions[fullkey];
            _this.setOne(fullkey, value);
        }
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
module.exports = dataStackController;
