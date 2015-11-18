var dataController = require('dataController/dataController');
var LayerItem = React.createClass({displayName: "LayerItem",
    layerItemClick:function(){
        var targetId = this.props.targetId;
        dataController.set({
            "currentTarget":targetId
        });
    },
    render: function() {
        var type = this.props.type||"unknow";
        var name = this.props.name;
        var currentClass="";
        if(this.props.isCurrent){
            currentClass="current";
        }
        // console.log(this.props.isCurrent);
        return (
            React.createElement("div", {className: "slides-layer-items "+currentClass, onClick: this.layerItemClick}, 
                React.createElement("span", {className: "layer-icon icon"+this.props.type}, 
                    this.props.name
                )
            )
        );
    }
});

var LayerManager = React.createClass({displayName: "LayerManager",
    getInitialState: function() {
        return {
            currentPage:this.props.currentPage ||0,
            currentTarget:this.props.currentTarget,
            elements: this.props.elements||[]
        };
    },
    render: function() {
        var _this = this;
        var layerItems = [];
        this.state.elements.forEach(function(element,index){
            var type = element.type;
            var name = element.name;
            var targetId = _this.state.currentPage+"."+index;
            var isCurrent = (_this.state.currentTarget===targetId)?true:false;
            layerItems.push(
                React.createElement(LayerItem, {
                    key: targetId, 
                    type: type, 
                    name: name, 
                    targetId: targetId, 
                    isCurrent: isCurrent}
                )
            );
        });
        return (
            React.createElement("div", {className: "slides-layer-wrapper"}, 
                layerItems
            )
        );
    }
});
module.exports = LayerManager;
