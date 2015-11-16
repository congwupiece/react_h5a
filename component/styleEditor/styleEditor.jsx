define('StyleEditor', function(require, exports, module) {
    var dataController = require('dataController');
    var BorderStyleEditor = React.createClass({
        onChange:function(){
            var currentTarget =  dataController.getOne("currentTarget");
            if(!currentTarget){return;}
            var borderWidth = this.refs.borderWidth.value;
            var borderType = this.refs.borderType.value;
            var borderColor = this.refs.borderColor.value;
            var borderRadius = this.refs.borderRadius.value;
            var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
            var updateData={};
            updateData[elementsFullKey+".style.border"]=[borderWidth+"px",borderType,borderColor].join(" ");
            updateData[elementsFullKey+".style.borderRadius"]=borderRadius+"px";
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
                <BorderStyleEditor
                    border={style.border}
                    borderRadius={style.borderRadius}
                />
        );
        }
    });
    module.exports = StyleEditor;
});
