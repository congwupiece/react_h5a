define('elements/ImageElement', function(require, exports, module) {
    "use strict";
    var styleHelper = require('tools/styleHelper');
    var createStyleObjFromStyleData = styleHelper.createStyleObjFromStyleData;
    var ImageElement = React.createClass({displayName: "ImageElement",
        getInitialState: function() {
            return {
                content: this.props.content,
                style: this.props.style
            };
        },
        mouseDown:function(e){
            var targetId = this.props.targetId;
            e.stopPropagation();
            dataController.set({
                "currentTarget":targetId
            });
        },
        render: function() {
            var styleObj = createStyleObjFromStyleData(this.state.style);
            return (
                // <ReactDraggable>
                    React.createElement("img", {
                        draggable: "false", 
                        onMouseDown: this.mouseDown, 
                        src: this.state.content.src, 
                        style: styleObj})
                // </ReactDraggable>
            );
        }
    });
    module.exports = ImageElement;
});
