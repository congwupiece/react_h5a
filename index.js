var Stage = require("Stage");
var LeftPanel = require("LeftPanel");
var RightPanel = require("RightPanel");
var LayerManager = require("LayerManager");
var defaultData = require("test/slideData");
var dataController = require("dataController");
var StyleEditor = require("StyleEditor");
var ImageElementCreator  = require('elementsCreator/ImageElementCreator');


dataController.init({
    currentTarget:"",  //e.g 0.1:第一页第二个元素
    currentPage:0,
    mouse:{
        pressTarget:"",
        isPressed:false
    },
    rightPanelItems:{
        "current":"slideBackground",
        "display":{
            "content":true,
            "style":true
        }
    },
    slideData:defaultData
},onDataUpdate);


function onDataUpdate(data){
    var currentPage = dataController.getOne("currentPage");
    var currentTarget = dataController.getOne("currentTarget");
    var elements = Immutable.List(defaultData.slides[currentPage].elements);
    var background = defaultData.slides[currentPage].background;
    var currentElement = {};
    if(currentTarget){
        var index = currentTarget.split(".")[1];
        currentElement = elements.get(index);
    }
    //更新舞台
    h5a_stage.setState({
        pageIndex:currentPage,
        elements:elements,
        background:background,
        currentTarget:currentTarget
    });
    //更新左边面板
    h5a_leftPanel.setState({
        currentPage:currentPage,
        slides:dataController.getOne("slideData.slides")
    });
    //更新右边面板
    h5a_rightPanel.setState({
        element:currentElement,
        rightPanelItems:dataController.getOne("rightPanelItems")
    });
    //更新层级选择工具
    h5a_layermanager.setState({
        currentPage:currentPage,
        currentTarget:currentTarget,
        elements:elements,
    });
}

var h5a_stage = ReactDOM.render(React.createElement(Stage, {elements: Immutable.List()}),$("#canvas")[0]);
var h5a_leftPanel = ReactDOM.render(React.createElement(LeftPanel, null),$("#h5animator-left-pane")[0]);
var h5a_layermanager = ReactDOM.render(React.createElement(LayerManager, null),$("#h5animator-layermanager")[0]);
// var h5a_styleEditor = ReactDOM.render(<StyleEditor/>,$("#h5animator-style-editor")[0]);
var h5a_rightPanel = ReactDOM.render(React.createElement(RightPanel, null),$("#h5animator-right-pane")[0]);
// test
var s = ReactDOM.render(React.createElement(ImageElementCreator, null),$("#h5animator-top-bar")[0]);
//test
// var s = ReactDOM.render(<ColorPicker/>,$("#colorpicker")[0]);



turnToPage(0);


//test script
function turnToPage(num){
    dataController.set({
        "currentPage":num
    });
}


$(document).on("mousedown",function(e){
    var pressTarget = dataController.getOne("mouse.pressTarget");
    var index = pressTarget.split(".");
    var x,y;
    if(pressTarget){
        var xKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.left";
        var yKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.top";
        x = dataController.getOne(xKey);
        y = dataController.getOne(yKey);
    }
    dataController.set({
        "mouse.mouseDownX":e.clientX,
        "mouse.mouseDownY":e.clientY,
        "tempx":x,
        "tempy":y,
        "mouse.isPressed":true
    });
});

$(document).on("mouseup",function(e){
    dataController.set({
        "mouse.isPressed":false,
        "mouse.pressTarget":""
    });
});

$(document).on("mousemove",function(e){
    var isPressed = dataController.getOne("mouse.isPressed");
    if (isPressed) {
        var pressTarget = dataController.getOne("mouse.pressTarget");
        if(pressTarget){
            var index = pressTarget.split(".");
            var xKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.left";
            var yKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.top";
            var x = dataController.getOne("tempx");
            var y = dataController.getOne("tempy");
            var newX = parseInt(x)+e.clientX-dataController.getOne("mouse.mouseDownX");
            var newY = parseInt(y)+e.clientY-dataController.getOne("mouse.mouseDownY");
            console.log(
                e.clientX-dataController.getOne("mouse.mouseDownX"),
                e.clientY-dataController.getOne("mouse.mouseDownY"));
            var updateData={};
            updateData[xKey] = newX+'px';
            updateData[yKey] = newY+'px';
            dataController.set(updateData);
        }
    }
    // dataController.set({
    //     "mouse.mouseX":e.clientX,
    //     "mouse.mouseY":e.clientY
    // });
    // console.log(e.clientX);
});

// var p;
// window.onmousedown=function(){
//     p=1;
// }

// window.onmouseup=function(){
//     p=0;
// }

// window.onmousemove=function(e){
//     if(!p){return;}
//     var x = e.clientX;
//     requestAnimationFrame(function(){
//             defaultData.slides[0].elements[0].style.box.left=x+"px" ;
//     })
//     turnToPage(0)
// }
