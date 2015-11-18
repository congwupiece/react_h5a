var dataController = require('dataController/dataController');
var PositionStyleEditotr = React.createClass({displayName: "PositionStyleEditotr",
    onChange:function(){
        var currentTarget =  dataController.getOne("currentTarget");
        var left = this.refs.left.value;
        var top = this.refs.top.value||"none";
        var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
        var updateData={};
        updateData[elementsFullKey+".style.box.left"]=left+"px";
        updateData[elementsFullKey+".style.box.top"]=top+"px";
        updateData[elementsFullKey+".style.box.width"]=width+"px";
        updateData[elementsFullKey+".style.box.height"]=height+"px";
        dataController.set(updateData);
    },
    render:function(){
        var box = this.props.box;
        var left = parseInt(box.left);
        var top = parseInt(box.top);
        var width = parseInt(box.width);
        var height = parseInt(box.height);
        return (
            React.createElement("div", {className: "property-group-container"}, 
                React.createElement("h3", {className: "property-group-title"}, "位置"), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "x轴坐标"), 
                    React.createElement("input", {type: "number", value: left, 
                        ref: "left", 
                        onChange: this.onChange, className: "edit-element"})
                ), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "y轴坐标"), 
                    React.createElement("input", {type: "number", value: top, 
                        ref: "top", 
                        onChange: this.onChange, className: "edit-element"})
                ), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "宽度"), 
                    React.createElement("input", {type: "number", value: width, 
                        ref: "width", 
                        onChange: this.onChange, className: "edit-element"})
                ), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "高度"), 
                    React.createElement("input", {type: "number", value: height, 
                        ref: "height", 
                        onChange: this.onChange, className: "edit-element"})
                )
            )
        );
    }
});

var BorderStyleEditor = React.createClass({displayName: "BorderStyleEditor",
    onChange:function(){
        var currentTarget =  dataController.getOne("currentTarget");
        var backgroundColor = this.refs.backgroundColor.value;
        var backgroundImage = this.refs.backgroundImage.value||"none";
        var backgroundSize = this.refs.backgroundSize.value;
        var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
        var updateData={};
        updateData[elementsFullKey+".style.background.backgroundImage"]=backgroundImage;
        updateData[elementsFullKey+".style.background.backgroundColor"]=backgroundColor;
        updateData[elementsFullKey+".style.background.backgroundSize"]=backgroundSize;
        dataController.set(updateData);
    },
    render: function() {
        var border = this.props.border||"none";
        var borderArray,borderWidth,borderColor;
        if(border==="none"){

            borderWidth = "0";
            borderType = "none";
            borderColor = "rbga(0,0,0,0)";
        }else{
            borderArray = border.split(" ");
            borderWidth = parseInt(borderArray.shift());
            borderType = borderArray.shift();
            borderColor = borderArray.join("");
        }

        var borderRadius = parseInt(this.props.borderRadius||"0");
        var borderTypeOptions = [];
        return (
            React.createElement("div", {className: "property-group-container"}, 
                React.createElement("h3", {className: "property-group-title"}, "边框"), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "类型"), 
                    React.createElement("select", {className: "edit-element", 
                        ref: "borderType", 
                        value: borderType, 
                        onChange: this.onChange}, 
                        React.createElement("option", {value: "none"}, "无边框"), 
                        React.createElement("option", {value: "solid"}, "实线"), 
                        React.createElement("option", {value: "dashed"}, "虚线"), 
                        React.createElement("option", {value: "dotted"}, "点状")
                    )
                ), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "尺寸"), 
                    React.createElement("input", {type: "number", value: borderWidth, 
                        ref: "borderWidth", 
                        onChange: this.onChange, className: "edit-element"})
                ), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "颜色"), 
                    React.createElement("input", {className: "edit-element", 
                        ref: "borderColor", value: borderColor, 
                        onChange: this.onChange}
                    )
                ), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "圆角"), 
                    React.createElement("input", {type: "number", className: "edit-element", ref: "borderRadius", 
                        value: borderRadius, onChange: this.onChange}
                    )
                )
            )
        );
    }
});

var BackGroundStyleEditor=React.createClass({displayName: "BackGroundStyleEditor",
    onChange:function(){
        var currentTarget =  dataController.getOne("currentTarget");
        var backgroundColor = this.refs.backgroundColor.value;
        var backgroundImage = this.refs.backgroundImage.value||"none";
        var backgroundSize = this.refs.backgroundSize.value;
        var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
        var updateData={};
        updateData[elementsFullKey+".style.background.backgroundImage"]=backgroundImage;
        updateData[elementsFullKey+".style.background.backgroundColor"]=backgroundColor;
        updateData[elementsFullKey+".style.background.backgroundSize"]=backgroundSize;
        dataController.set(updateData);
    },
    render:function(){
        var background = this.props.background;
        var backgroundImage = background.backgroundImage;
        var backgroundColor = background.backgroundColor;
        var backgroundSize = background.backgroundSize;
        return (
            React.createElement("div", {className: "property-group-container"}, 
                React.createElement("h3", {className: "property-group-title"}, "背景"), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "背景填充"), 
                    React.createElement("select", {className: "edit-element", 
                        ref: "backgroundSize", 
                        value: backgroundSize, 
                        onChange: this.onChange}, 
                        React.createElement("option", {value: "auto"}, "原始"), 
                        React.createElement("option", {value: "cover"}, "充满"), 
                        React.createElement("option", {value: "contain"}, "适应"), 
                        React.createElement("option", {value: "100% 100%"}, "拉伸")
                    )
                ), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "背景颜色"), 
                    React.createElement("input", {value: backgroundColor, 
                        ref: "backgroundColor", 
                        onChange: this.onChange, className: "edit-element"})
                ), 
                React.createElement("div", {className: "property-container"}, 
                    React.createElement("label", {className: "name"}, "背景图片"), 
                    React.createElement("input", {type: "number", value: backgroundImage, 
                        ref: "backgroundImage", 
                        onChange: this.onChange, className: "edit-element"})
                )
            )
        );
    }
});




var StyleEditor = React.createClass({displayName: "StyleEditor",
    getInitialState:function(){
        return {
            element:this.props.element||{},
        };
    },
    render: function() {
        var element  = this.state.element;
        var style = element.style||{};
        return (
            React.createElement("div", {className: "style-editor"}, 
                React.createElement(PositionStyleEditotr, {
                    box: style.box}
                ), 
                React.createElement(BorderStyleEditor, {
                    border: style.border, 
                    borderRadius: style.borderRadius}
                ), 
                React.createElement(BackGroundStyleEditor, {
                    background: style.background}
                )
            )
        );
    }
});
module.exports = StyleEditor;
