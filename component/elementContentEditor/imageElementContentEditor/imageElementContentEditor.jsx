define('elementContentEditor/ImageElementContentEditor', function(require, exports, module) {
    "use strict";
    var dataController = require('dataController');
    var ImageElementContentEditor = React.createClass({
        getInitialState:function(){
            return {
                element:this.props.element||{}
            };
        },
        onChange:function(){
            var src = this.refs.src.value;
            var name = this.refs.name.value;
            var currentTarget = dataController.getOne("currentTarget");
            var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
            var updateData = {};
            updateData[elementsFullKey+".name"]=name;
            updateData[elementsFullKey+".content.src"]=src;
            dataController.set(updateData);
        },
        render:function(){
            var element = this.state.element;
            if(!element.name){
                return ("");
            }
            var name = element.name||"";
            var src = element.content.src||"";
            return (
                <div className="each-property-editor">
                    <div className="property-container">
                        <label className="name">名称</label>
                        <input
                            value={name}
                            ref={"name"}
                            className="edit-element" type="text"
                            onChange={this.onChange}/>
                    </div>
                    <div className="property-container">
                        <label className="name">图片</label>
                        <input ref={"src"}
                                value={src}
                                className="edit-element" type="text"
                                onChange={this.onChange}/>
                        <div className="background-upload-image">选择图片</div>
                    </div>
                    <div className="image-area">
                        <img src={this.state.src}/>
                    </div>
                </div>
            );
        }
    });
    module.exports = ImageElementContentEditor;
});
