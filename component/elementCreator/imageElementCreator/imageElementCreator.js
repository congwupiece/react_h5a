define('elementsCreator/ImageElementCreator', function(require, exports, module) {
    var dataController = require("dataController");
    var defaultImageElementsData = {
        "type": "image",
        "name": "新图片",
        "content": {
            "src": "http://p4.pstatp.com/origin/9105/2724837759"
        },
        "visible": true,
        "animations": [],
        "tagName": "IMG",
        "uuid": "886422199",
        "style": {
            "background": {
                "backgroundImage": "none",
                "backgroundSize": "auto",
                "backgroundColor": "rgba(0, 0, 0, 0)",
                "backgroundRepeat": "repeat"
            },
            "box": {
                "left": "1px",
                "top": "1px",
                "width": "125px",
                "height": "19px"
            },
            "transform": {
                "scaleX": 1,
                "scaleY": 1,
                "scaleZ": 1,
                "translateX": "0px",
                "translateY": "0px",
                "translateZ": "0px",
                "skewX": "0deg",
                "rotateZ": "0deg",
                "rotateX": "0deg",
                "rotateY": "0deg",
                "transformPerspective": "0px",
                "transform": "matrix(1, 0, 0, 1, 0, 0)"
            },
            "transformOrigin": "62.5px 9.5px",
            "zIndex": "6",
            "opacity": "1",
            "border": "0px none rgb(0, 0, 0)",
            "borderRadius": "0px",
            "fontSize": "16px",
            "color": "rgb(0, 0, 0)"
        },
        "preLoadedURLs": [
            "http://p4.pstatp.com/origin/9105/2724837759"
        ],
        "id": 0
    };
    var ImageElementCreator = React.createClass({displayName: "ImageElementCreator",
        onClick:function(){
            var currentPage = dataController.getOne("currentPage");
            var imageElementsData = JSON.parse(JSON.stringify(defaultImageElementsData));
            var id = (Math.random()*1000).toFixed(0);
            imageElementsData.uuid=id;
            imageElementsData.name ="新图片"+id;
            var elements = dataController
                .pushOne("slideData.slides."+currentPage+".elements",imageElementsData);
        },
        render:function(){
            return (
                React.createElement("div", {className: "button-wrapper", onClick: this.onClick}, 
                    React.createElement("div", {className: "button icon-document-text", title: "添加图片"}), 
                    React.createElement("span", {className: "button-title"}, "图片")
                )
            );
        }
    });
    module.exports=ImageElementCreator;
});
