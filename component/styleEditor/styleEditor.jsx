var dataController = require('dataController/dataController');
var PositionStyleEditotr = React.createClass({
    onChange:function(){
        var currentTarget =  dataController.getOne("currentTarget");
        var left = this.refs.left.value;
        var top = this.refs.top.value||"none";
        var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
        var updateData={};
        updateData[elementsFullKey+".style.box.left"]=left+"px";
        updateData[elementsFullKey+".style.box.top"]=top+"px";
        updateData[elementsFullKey+".style.box.width"]=width+"px";
        updateData[elementsFullKey+".style.box.height"]=height+"px";
        dataController.set(updateData);
    },
    render:function(){
        var box = this.props.box;
        var left = parseInt(box.left);
        var top = parseInt(box.top);
        var width = parseInt(box.width);
        var height = parseInt(box.height);
        return (
            <div className="property-group-container">
                <h3 className="property-group-title">位置</h3>
                <div className="property-container">
                    <label className="name">x轴坐标</label>
                    <input type="number" value={left}
                        ref={"left"}
                        onChange={this.onChange} className="edit-element"/>
                </div>
                <div className="property-container">
                    <label className="name">y轴坐标</label>
                    <input type="number" value={top}
                        ref={"top"}
                        onChange={this.onChange} className="edit-element"/>
                </div>
                <div className="property-container">
                    <label className="name">宽度</label>
                    <input type="number" value={width}
                        ref={"width"}
                        onChange={this.onChange} className="edit-element"/>
                </div>
                <div className="property-container">
                    <label className="name">高度</label>
                    <input type="number" value={height}
                        ref={"height"}
                        onChange={this.onChange} className="edit-element"/>
                </div>
            </div>
        );
    }
});

var BorderStyleEditor = React.createClass({
    onChange:function(){
        var currentTarget =  dataController.getOne("currentTarget");
        var backgroundColor = this.refs.backgroundColor.value;
        var backgroundImage = this.refs.backgroundImage.value||"none";
        var backgroundSize = this.refs.backgroundSize.value;
        var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
        var updateData={};
        updateData[elementsFullKey+".style.background.backgroundImage"]=backgroundImage;
        updateData[elementsFullKey+".style.background.backgroundColor"]=backgroundColor;
        updateData[elementsFullKey+".style.background.backgroundSize"]=backgroundSize;
        dataController.set(updateData);
    },
    render: function() {
        var border = this.props.border||"none";
        var borderArray,borderWidth,borderColor;
        if(border==="none"){

            borderWidth = "0";
            borderType = "none";
            borderColor = "rbga(0,0,0,0)";
        }else{
            borderArray = border.split(" ");
            borderWidth = parseInt(borderArray.shift());
            borderType = borderArray.shift();
            borderColor = borderArray.join("");
        }

        var borderRadius = parseInt(this.props.borderRadius||"0");
        var borderTypeOptions = [];
        return (
            <div className="property-group-container">
                <h3 className="property-group-title">边框</h3>
                <div className="property-container">
                    <label className="name">类型</label>
                    <select className="edit-element"
                        ref={"borderType"}
                        value={borderType}
                        onChange={this.onChange}>
                        <option  value="none">无边框</option>
                        <option  value="solid">实线</option>
                        <option  value="dashed">虚线</option>
                        <option  value="dotted">点状</option>
                    </select>
                </div>
                <div className="property-container">
                    <label className="name">尺寸</label>
                    <input type="number" value={borderWidth}
                        ref={"borderWidth"}
                        onChange={this.onChange} className="edit-element"/>
                </div>
                <div className="property-container">
                    <label className="name">颜色</label>
                    <input className="edit-element"
                        ref={"borderColor"} value={borderColor}
                        onChange={this.onChange}
                    />
                </div>
                <div className="property-container">
                    <label className="name">圆角</label>
                    <input type="number" className="edit-element" ref={"borderRadius"}
                        value={borderRadius} onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }
});

var BackGroundStyleEditor=React.createClass({
    onChange:function(){
        var currentTarget =  dataController.getOne("currentTarget");
        var backgroundColor = this.refs.backgroundColor.value;
        var backgroundImage = this.refs.backgroundImage.value||"none";
        var backgroundSize = this.refs.backgroundSize.value;
        var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
        var updateData={};
        updateData[elementsFullKey+".style.background.backgroundImage"]=backgroundImage;
        updateData[elementsFullKey+".style.background.backgroundColor"]=backgroundColor;
        updateData[elementsFullKey+".style.background.backgroundSize"]=backgroundSize;
        dataController.set(updateData);
    },
    render:function(){
        var background = this.props.background;
        var backgroundImage = background.backgroundImage;
        var backgroundColor = background.backgroundColor;
        var backgroundSize = background.backgroundSize;
        return (
            <div className="property-group-container">
                <h3 className="property-group-title">背景</h3>
                <div className="property-container">
                    <label className="name">背景填充</label>
                    <select className="edit-element"
                        ref={"backgroundSize"}
                        value={backgroundSize}
                        onChange={this.onChange}>
                        <option  value="auto">原始</option>
                        <option  value="cover">充满</option>
                        <option  value="contain">适应</option>
                        <option  value="100% 100%">拉伸</option>
                    </select>
                </div>
                <div className="property-container">
                    <label className="name">背景颜色</label>
                    <input value={backgroundColor}
                        ref={"backgroundColor"}
                        onChange={this.onChange} className="edit-element"/>
                </div>
                <div className="property-container">
                    <label className="name">背景图片</label>
                    <input type="number" value={backgroundImage}
                        ref={"backgroundImage"}
                        onChange={this.onChange} className="edit-element"/>
                </div>
            </div>
        );
    }
});




var StyleEditor = React.createClass({
    getInitialState:function(){
        return {
            element:this.props.element||{},
        };
    },
    render: function() {
        var element  = this.state.element;
        var style = element.style||{};
        return (
            <div className="style-editor">
                <PositionStyleEditotr
                    box={style.box}
                />
                <BorderStyleEditor
                    border={style.border}
                    borderRadius={style.borderRadius}
                />
                <BackGroundStyleEditor
                    background={style.background}
                />
            </div>
        );
    }
});
module.exports = StyleEditor;
