define('elements/ImageElement', function(require, exports, module) {
    "use strict";
    var styleHelper = require('tools/styleHelper');
    var createStyleObjFromStyleData = styleHelper.createStyleObjFromStyleData;
    var ImageElement = React.createClass({
        getInitialState: function() {
            return {
                content: this.props.content,
                style: this.props.style
            };
        },
        render: function() {
            var styleObj = createStyleObjFromStyleData(this.state.style);
            return ( 
                <img src = {this.state.content.src} style={styleObj}/>
            );
        }
    });
    module.exports = ImageElement;
});