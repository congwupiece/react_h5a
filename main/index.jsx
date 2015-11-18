var Stage = require("component/stage/stage");
var LeftPanel = require("component/leftPanel/leftPanel");
var RightPanel = require("component/rightPanel/rightPanel");
var LayerManager = require("component/layerManager/layerManager");
var defaultData = require("test/slideData");
var dataController = require("dataController/dataController");
var StyleEditor = require("component/styleEditor/styleEditor");
var ImageElementCreator = require("component/elementCreator/imageElementCreator/imageElementCreator");


function init(){

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

var h5a_stage = ReactDOM.render(<Stage  elements={Immutable.List()}/>,$("#canvas")[0]);
var h5a_leftPanel = ReactDOM.render(<LeftPanel/>,$("#h5animator-left-pane")[0]);
var h5a_layermanager = ReactDOM.render(<LayerManager/>,$("#h5animator-layermanager")[0]);
// var h5a_styleEditor = ReactDOM.render(<StyleEditor/>,$("#h5animator-style-editor")[0]);
var h5a_rightPanel = ReactDOM.render(<RightPanel/>,$("#h5animator-right-pane")[0]);
// test
var s = ReactDOM.render(<ImageElementCreator />,$("#h5animator-top-bar")[0]);
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
    var currentTarget = dataController.getOne("currentTarget");
    if(!currentTarget){return;}
    var index = currentTarget.split(".");
    var x,y,w,h;
    if(pressTarget===currentTarget){
        var xKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.left";
        var yKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.top";
        x = dataController.getOne(xKey);
        y = dataController.getOne(yKey);
    }else if(pressTarget==="SizeControlerRB"&&currentTarget){
        var wKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.width";
        var hKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.height";
        w = dataController.getOne(wKey);
        h = dataController.getOne(hKey);
    }
    dataController.set({
        "mouse.mouseDownX":e.clientX,
        "mouse.mouseDownY":e.clientY,
        "tempx":x,
        "tempy":y,
        "tempw":w,
        "temph":h,
        "mouse.isPressed":true
    });
});

$(document).on("mouseup",function(e){
    var pressTarget = dataController.getOne("mouse.pressTarget");
    var currentTarget= dataController.getOne("mouse.currentTarget");
    var index = pressTarget.split(".");
    var x,y;
    if(currentTarget&&pressTarget===currentTarget){
        var xKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.left";
        var yKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.top";
        x = dataController.getOne(xKey);
        y = dataController.getOne(yKey);
        var updateData={};
        updateData[xKey] = x;
        updateData[yKey] = y;
        dataController.set(updateData,true);
    }

    //
    dataController.set({
        "mouse.isPressed":false,
        "mouse.pressTarget":""
    });
});

$(document).on("mousemove",function(e){
    var isPressed = dataController.getOne("mouse.isPressed");
    if (!isPressed) {
        return;
    }
    var pressTarget = dataController.getOne("mouse.pressTarget");
    var currentTarget = dataController.getOne("currentTarget");
    if(!currentTarget){
        return;
    }

    var index = currentTarget.split(".");
    var updateData={};
    if(pressTarget===currentTarget){
        var x = dataController.getOne("tempx");
        var y = dataController.getOne("tempy");
        var xKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.left";
        var yKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.top";
        var newX = parseInt(x)+e.clientX-dataController.getOne("mouse.mouseDownX");
        var newY = parseInt(y)+e.clientY-dataController.getOne("mouse.mouseDownY");
        // console.log(
            // e.clientX-dataController.getOne("mouse.mouseDownX"),
            // e.clientY-dataController.getOne("mouse.mouseDownY"));
        updateData={};
        updateData[xKey] = newX+"px";
        updateData[yKey] = newY+"px";
        dataController.set(updateData);
    }else if(pressTarget==="SizeControlerRB"&&currentTarget){
        var w = dataController.getOne("tempw");
        var h = dataController.getOne("temph");
        var wKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.width";
        var hKey = "slideData.slides."+index[0]+".elements."+index[1]+".style.box.height";
        var newW = parseInt(w)+e.clientX-dataController.getOne("mouse.mouseDownX");
        var newH = parseInt(h)+e.clientY-dataController.getOne("mouse.mouseDownY");
        updateData = {};
        updateData[wKey] = newW+"px";
        updateData[hKey] = newH+"px";
        dataController.set(updateData);
    }

});

}
module.exports = init;



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
