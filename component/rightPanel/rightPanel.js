define('RightPanel', function(require, exports, module) {
    "use strict";
    var dataController = require('dataController');
    var PanelItemsName = {
        "content":"内容",
        "style":"样式"
    };
    var RightPanelTabItem = React.createClass({displayName: "RightPanelTabItem",
        onTabClick:function(){
            dataController.set({
                "rightPanelItems.current":this.props.type
            });
        },
        render:function(){
            var currentClass="";
            if(this.props.isCurrent){
                currentClass="current";
            }
            return (
                React.createElement("span", {
                    className: "right-panel-tab-item "+currentClass, 
                    onClick: this.onTabClick}, 
                    PanelItemsName[this.props.type]
                )
            );
        }
    });
    var RightPanel = React.createClass({displayName: "RightPanel",
        getInitialState:function(){
            return {
                element:this.props.element||{},
                rightPanelItems:this.props.rightPanelItems||{
                    "current":"slideBackground",
                    "display":{
                        "content":true,
                        "style":true
                    }
                }
            };
        },
        _getContentEditorName:function(type){
            //"image"=>"elementContentEditor/ImageElementContentEditor";
            return("elementContentEditor/"+
                type.charAt(0).toUpperCase()+type.substr(1)+
                "ElementContentEditor");
        },
        _buildPanelContent:function(){
            //填充元素
            var _this = this;
            var element = this.state.element;
            var type = element.type;
            var panelContent=[];
            if(!type){
                return ("");
            }
            var rightPanelItems =this.state.rightPanelItems;
            var key;
            switch(rightPanelItems.current){
                case "content":

                    var elementContentEditorName = this._getContentEditorName(type);
                    var elementContentEditor = require(elementContentEditorName);
                    key = "content-"+element.uuid;
                    panelContent.push(
                        React.createElement(elementContentEditor,{element: element,key:key})
                    );
                    break;
                case "style":
                    var StyleEditor = require('StyleEditor');
                    key="style-"+element.uuid;
                    panelContent.push(
                        (React.createElement(StyleEditor, {element: element, key: key}))
                    );
                    break;

            }
            return panelContent;
        },
        _buildPanelTabs:function(){
            var _this = this;
            var rightPanelItems =this.state.rightPanelItems;
            var tabs = [];
            for(var key in rightPanelItems.display){
                if(rightPanelItems.display[key]){
                    var isCurrent=false;
                    if(rightPanelItems.current==key){
                        isCurrent=true;
                    }
                    tabs.push(React.createElement(RightPanelTabItem, {
                        isCurrent: isCurrent, 
                        type: key, key: key}));
                }
            }
            return tabs;
        },
        render:function(){
            var _this = this;
            var content = this._buildPanelContent();
            var tabs = this._buildPanelTabs();
            return (
                React.createElement("div", {className: "right-panel-container"}, 
                    React.createElement("div", {className: "right-panel-nav-tabs"}, 
                        tabs
                    ), 
                    React.createElement("div", {className: "right-panel-content"}, 
                        content
                    )
                )
            );
        }
    });
    module.exports = RightPanel;
});
