/*!
 * 文件描述
 * @author reven
 * @create 2015-10-28 20:52
 */


/*!
 * 添加运动效果组件
 * @author reven
 * @create 2015-10-27 14:03
 *
 */


/*
 * !为元素添加动画的组件
 *
 * 参数说明:
 * @obj:指定的对象
 * @event:指定对象触发的事件
 * @tagNameArr:相应联动的元素的[标签名|id|class]的数组
 * @type: 动画的类型
 *
 * 举例:
 * 假如要为logo添加点击事件，这个点击事件联动所有img元素，联动的动画类型是rotate，参数列表就是:
 * (oLogo,'click','img','rotate')
 * */

function TransformController(obj, event, tagNameArr, type) {
    this.obj = obj;
    this.event = event;
    this.tagNameArr = tagNameArr;
    this.type = type;
    this.selector = new Selector();
    this.selector.init(this.tagNameArr);
    this.aItems = this.selector.getElems();
    var that = this;
    this.rotate = function (ev) {
        Array.prototype.forEach.call(that.aItems, function (elem, index) {
            elem.style.webkitTransform = 'rotateZ(-180deg)';
        });
        ev.preventDefault();
    };
}
/*
 *!添加动画原型方法
 */
TransformController.prototype.addTransform = function () {
    if (this.type === 'rotate') {
        var that = this;

        //为联动元素添加必要的动画属性
        Array.prototype.forEach.call(that.aItems, function (elem, index) {
            elem.style.webkitTransition = '2s';
            elem.style.webkitTransformOrigin = 'center center';
            elem.style.webkitTransitiontimingFunction = 'cubic-bezier(0.42,0,0.58,1)';
            elem.parentNode.style.transformStyle = 'preserve-3d';
            elem.parentNode.style.perspective = '300px';

        });

        //加事件
        this.obj.addEventListener(that.event,this.rotate,false);

    }


};

/*
 * !移除动画原型方法
 * */
TransformController.prototype.removeTransform = function () {
    var that = this;
    //为联动元素添加必要的动画属性
    Array.prototype.forEach.call(that.aItems, function (elem, index) {
        elem.style.webkitTransition = '0s';
        elem.style.webkitTransformOrigin = '';
        elem.style.webkitTransitiontimingFunction = '';
        elem.parentNode.style.transformStyle = '';
        elem.parentNode.style.perspective = '';
    });
    //去事件
    this.obj.removeEventListener(this.event,that.rotate,false);
};


