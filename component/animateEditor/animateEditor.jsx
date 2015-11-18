var dataController = require('dataController');
var AnimateEditor = React.createClass({
    getInitialState:function(){
        return {
            element:this.props.element||{}
        };
    },
    output:function(shouldTrace){
        var src = this.refs.src.value;
        var name = this.refs.name.value;
        var currentTarget = dataController.getOne("currentTarget");
        var elementsFullKey = dataController.getFullKeyByTargetId(currentTarget);
        var updateData = {};
        updateData[elementsFullKey+".name"]=name;
        updateData[elementsFullKey+".content.src"]=src;
        console.log(shouldTrace);
        if(shouldTrace){
            dataController.set(updateData,true);
        }else{
            dataController.set(updateData,false);
        }
    },
    onChange:function(){
        this.output(false);
    },
    onBlur:function(){
        this.output(true); //计入堆栈
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
                        onChange={this.onChange}
                        onBlur={this.onBlur}
                        />
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
module.exports = animateEditor;
