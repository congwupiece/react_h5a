var dataController = require('dataController/dataController');
var ImageElement = require("component/elements/imageElement/imageElement");
var ElementShadow = require("component/elements/ElementShadow/ElementShadow");

var Stage = React.createClass({displayName: "Stage",
    getInitialState:function(){
        return {
            elements:this.props.elements,
            background:this.props.background||{},
            pageIndex:this.props.pageIndex||undefined,
            elementsWatch:this.props.elementsWatch||true,
            currentTarget:this.props.currentTarget||""
        };
    },
    _buildElement:function(){
        //填充元素
        var _this = this;
        var elements = this.state.elements;
        var elementNodes = [];
        var pageIndex = this.state.pageIndex;
        elements.forEach(function(element,index){
            // var key = Math.random();
            var key = element.uuid;
            var targetId;
            if(_this.state.elementsWatch){ //左侧预览的元素不监控
                targetId = [pageIndex,index].join(".");  //元素序号（页号.元素序号） 0.1
            }else{
                targetId = "";
            }
            var isCurrent=false;
            if(_this.state.currentTarget===targetId){
                isCurrent=true;
                elementNodes.push(
                    React.createElement(ElementShadow, {style: element.style, key: "shoadow"+key})
                );
            }
            // var key =index;
            switch(element.type){
                case "image":
                    elementNodes.push(
                        React.createElement(ImageElement, {isCurrent: isCurrent, targetId: targetId, style: element.style, key: key, content: element.content})
                    );
                    break;
            }
        });
        return elementNodes;
    },
    _buildStageStyle:function(){
        //设置背景
        var background = this.state.background;
        var stageStyle = {
            "backgroundColor":background['backgroundColor'],
            "backgroundImage":background['backgroundImage'],
            "backgroundSize":background['backgroundSize'],
            "backgroundRepeat":background['backgroundRepeat'],
            "backgroundPosition":background['backgroundPosition']
        }
        return stageStyle;
    },
    mouseDown:function(e){
        console.log(e);
        dataController.set({
            "currentTarget":""
        });
    },
    // componentDidUpdate: function (props, state) {
    //     var isPressed = dataController.getOne("mouse.isPressed");
    //     if (isPressed) {
    //       document.addEventListener('mousemove', this.mouseMove)
    //     } else if (isPressed) {
    //       document.removeEventListener('mousemove', this.mouseMove)
    //     }
    // },
    // mouseMove:function(e){
    //     console.log(e);
    // },
    render:function(){
        var _this = this;
        var elementNodes = this._buildElement();
        var stageStyle = this._buildStageStyle();
        return (
            React.createElement("div", {className: "canvas-slide-container", onMouseDown: this.mouseDown, style: stageStyle}, 
                elementNodes
            )
        );
    }
});
module.exports = Stage;
