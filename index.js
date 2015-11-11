var Stage = require("Stage");
var defaultData = require("test/slideData");
var index = 0;
var h5a_stage = ReactDOM.render(
    React.createElement(Stage, {slide: defaultData.slides[index]}),$("#h5animator-stage")[0]
);


//test script
function turnToPage(num){
    h5a_stage.setState({
        slide:defaultData.slides[num]
    })
} 