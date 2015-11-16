define('elements/ElementShadow', function(require, exports, module) {
    "use strict";
    var styleHelper = require('tools/styleHelper');
    var createStyleObjFromStyleData = styleHelper.createStyleObjFromStyleData;
    var ElementShadow = React.createClass({displayName: "ElementShadow",
        getInitialState: function() {
            return {
                style: this.props.style,
            };
        },
        mouseDown: function(e) {
            e.stopPropagation();
        },
        render: function() {
            var styleObj = createStyleObjFromStyleData(this.state.style);
            var borderWidth=0;
            if(styleObj.border&&styleObj.border!="none"){
                borderWidth = parseInt(borderWidth = styleObj.border.split(" ")[0]);
            }
            var shadowStyleObj = {
                width:parseInt(styleObj.width)+borderWidth*2+"px",
                height:parseInt(styleObj.height)+borderWidth*2+"px",
                left:parseInt(styleObj.left)-1+"px",
                top:parseInt(styleObj.top)-1+"px",
                zIndex:styleObj.top,
                position:"absolute",
                border:"1px dashed red",
                background:"rgba(99,160,195,0.8)"
            };
            return (
                React.createElement("div", {className: "element-shadow", draggable: "false", 
                    onMouseDown: this.mouseDown, 
                    style: shadowStyleObj
                })
            );
        }
    });
    module.exports = ElementShadow;
});
