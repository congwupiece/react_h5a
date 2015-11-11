define('Stage', function(require, exports, module) {
    "use strict";
    var ImageElement = require("elements/ImageElement");
    
    var Stage = React.createClass({displayName: "Stage",
        getInitialState:function(){
            return {
                slide:this.props.slide
            }
        },
        _buildElement:function(){
            //填充元素
            var slide = this.state.slide;
            var elements = slide.elements;
            console.log(elements);
            var elementNodes = [];
            console.log(elements);
            elements.forEach(function(element,index){
                // var key = Math.random();
                var key = element.uuid;
                switch(element.type){
                    case "image":
                        elementNodes.push(React.createElement(ImageElement, {style: element.style, key: key, content: element.content}));
                        break;
                }
            });
            return elementNodes;
        },
        _buildStageStyle:function(){
            //设置背景
            var slide = this.state.slide;
            var background = slide.background;
            var stageStyle = {
                "backgroundColor":background["backgroundColor"],
                "backgroundImage":background["backgroundImage"],
                "backgroundSize":background["backgroundSize"],
                "backgroundRepeat":background["backgroundRepeat"],
                "backgroundPosition":background["backgroundPosition"]
            }
            return stageStyle;
        },
        render:function(){
            var _this = this;
            var elementNodes = this._buildElement();
            var stageStyle = this._buildStageStyle();
            return (
                React.createElement("div", {className: "h5animator-stage-wrapper", id: "dvStageWrapper"}, 
                    React.createElement("div", {className: "i5s i5s-lt"}), 
                    React.createElement("div", {className: "i5s i5s-rt"}), 
                    React.createElement("div", {className: "i5s i5s-earphone"}), 
                    React.createElement("div", {className: "i5s i5s-home"}), 
                    React.createElement("div", {className: "i5s i5s-lb"}), 
                    React.createElement("div", {className: "i5s i5s-rb"}), 
                    React.createElement("div", {className: "i5s i5s-sidebotton"}), 
                    React.createElement("div", {id: "canvas", className: "canvas", style: {"cursor": "default","width": "320px","height":"480px"}}, 
                        React.createElement("div", {className: "canvas-slide-container", style: stageStyle}, 
                            elementNodes
                        )
                    )
                )
            )
        }
    });
    module.exports = Stage
});