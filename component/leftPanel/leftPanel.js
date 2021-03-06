var dataController = require('dataController/dataController');
var Stage = require("component/stage/stage");
var LeftPanelItem = React.createClass({displayName: "LeftPanelItem",
    itemClick:function(){
        var pageIndex = this.props.pageIndex;
        dataController.set({
            "currentPage":pageIndex
        });
    },
    render:function(){
        var background=this.props.background;
        var pageIndex=this.props.pageIndex;
        var elements=this.props.elements;
        var currentClass="";
        if(this.props.isCurrent){
            currentClass="current";
        }
        return (
            React.createElement("div", {className: "slide-outline-container "+currentClass, onClick: this.itemClick}, 
                React.createElement("div", {className: "slide-outline"}, 
                    React.createElement("div", {className: "slide-outline-content"}, 
                        React.createElement(Stage, {
                            background: background, 
                            pageIndex: pageIndex, 
                            elementsWatch: false, 
                            elements: elements})
                    )
                )
            )
        );
    }
});

var LeftPanel = React.createClass({displayName: "LeftPanel",
    getInitialState:function(){
        return {
            slides:[],
            currentPage:this.props.currentPage||0
        };
    },
    click:function(){

    },
    _buildPreview:function(){
        //填充元素
        var _this = this;
        var slides = this.state.slides;
        var pageIndex = this.state.currentPageIndex;
        var previewPage = [];

        slides.forEach(function(slide,index){
            var elements = Immutable.List(slide.elements);
            var isCurrent = false;
            var background = slide.background;
            if(_this.state.currentPage === index){
                isCurrent = true;
            }
            // var key = Math.random();
            var key = index;
            previewPage.push(
                React.createElement(LeftPanelItem, {
                    key: key, 
                    isCurrent: isCurrent, 
                    background: background, 
                    pageIndex: index, 
                    elements: elements})
            );
        });
        return previewPage;
    },
    mouseDown:function(e){
        dataController.set({
            "currentTarget":""
        });
    },

    render:function(){
        var _this = this;
        var previewPage = this._buildPreview();
        return (
            React.createElement("div", {className: "slides-outline-container"}, 
                previewPage
            )
        );
    }
});
module.exports = LeftPanel;
