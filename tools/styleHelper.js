define('tools/styleHelper', function(require, exports, module) {
    "use strict";
    var styleHelper = {
        createStyleObjFromStyleData:function(styleData){
            var styleObj = {
                "position":"absolute"
            };
            make(styleData);
            return styleObj;
            function make(styleData){
                for(var prop in styleData){
                    var styleDesc = styleData[prop];
                    if(typeof styleDesc === "string"){
                        styleObj[prop] = styleDesc;
                    }else if(typeof styleDesc === "object"){
                        if(prop==="transform"){
                           //这块需要再研究一下;
                        }else{
                            make(styleDesc);
                        }
                    }
                }
            }
        }
    }
    module.exports = styleHelper;
});

//  var testStyleData = {
//     "background": {
//         "backgroundImage": "none",
//         "backgroundSize": "auto",
//         "backgroundColor": "rgba(0, 0, 0, 0)",
//         "backgroundRepeat": "repeat"
//     },
//     "box": {
//         "left": "137px",
//         "top": "257px",
//         "width": "125px",
//         "height": "19px"
//     },
//     "transform": {
//         "scaleX": 1,
//         "scaleY": 1,
//         "scaleZ": 1,
//         "translateX": "0px",
//         "translateY": "0px",
//         "translateZ": "0px",
//         "skewX": "0deg",
//         "rotateZ": "0deg",
//         "rotateX": "0deg",
//         "rotateY": "0deg",
//         "transformPerspective": "0px",
//         "transform": "matrix(1, 0, 0, 1, 0, 0)"
//     },
//     "transformOrigin": "62.5px 9.5px",
//     "zIndex": "6",
//     "opacity": "1",
//     "border": "0px none rgb(0, 0, 0)",
//     "borderRadius": "0px",
//     "fontSize": "16px",
//     "color": "rgb(0, 0, 0)"
// };

// var testResult = require('tools/styleHelper').createStyleObjFromStyleData(testStyleData);
// console.log(testResult);


