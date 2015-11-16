define('elementContentEditor/ImageElementContentEditor', function(require, exports, module) {
    "use strict";
    var dataController = require('dataController');
    var ImageElementContentEditor = React.createClass({displayName: "ImageElementContentEditor",
        getInitialState:function(){
            return {
                element:this.props.element||{}
            };
        },
        onChange:function(){
            var src = this.refs.src.value;
            var name = this.refs.name.value;
            var currentTarget = dataController.getOne("currentTarget");
            var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
            var updateData = {};
            updateData[elementsFullKey+".name"]=name;
            updateData[elementsFullKey+".content.src"]=src;
            dataController.set(updateData);
        },
        render:function(){
            var element = this.state.element;
            if(!element.name){
                return ("");
            }
            var name = element.name||"";
            var src = element.content.src||"";
            return (
                React.createElement("div", {className: "each-property-editor"}, 
                    React.createElement("div", {className: "property-container"}, 
                        React.createElement("label", {className: "name"}, "名称"), 
                        React.createElement("input", {
                            value: name, 
                            ref: "name", 
                            className: "edit-element", type: "text", 
                            onChange: this.onChange})
                    ), 
                    React.createElement("div", {className: "property-container"}, 
                        React.createElement("label", {className: "name"}, "图片"), 
                        React.createElement("input", {ref: "src", 
                                value: src, 
                                className: "edit-element", type: "text", 
                                onChange: this.onChange}), 
                        React.createElement("div", {className: "background-upload-image"}, "选择图片")
                    ), 
                    React.createElement("div", {className: "image-area"}, 
                        React.createElement("img", {src: this.state.src})
                    )
                )
            );
        }
    });
    module.exports = ImageElementContentEditor;
});
