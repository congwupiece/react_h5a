var dataController = require('dataController/dataController');
var styleHelper = require('tools/styleHelper');
var createStyleObjFromStyleData = styleHelper.createStyleObjFromStyleData;
var ImageElement = React.createClass({displayName: "ImageElement",
    getInitialState: function() {
        return {
            content: this.props.content,
            style: this.props.style,
            isCurrent:this.props.isCurrent
        };
    },
    mouseDown:function(e){
        var targetId = this.props.targetId;
        e.stopPropagation();
        dataController.set({
            "currentTarget":targetId,
            "mouse.pressTarget":targetId
        });
    },
    render: function() {
        var styleObj = createStyleObjFromStyleData(this.state.style);
        var currentClass="";
        if(this.props.isCurrent){
            currentClass="current";
        }
        return (
            // <ReactDraggable>
                React.createElement("img", {
                    className: currentClass, 
                    draggable: "false", 
                    onMouseDown: this.mouseDown, 
                    src: this.state.content.src, 
                    style: styleObj}
                    )
            // </ReactDraggable>
        );
    }
});
module.exports = ImageElement;
