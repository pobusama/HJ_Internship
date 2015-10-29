/*!
 * 
 * @author reven
 * @create 15/10/28
 */

/******公用方法*********/

//数组去重
function unique(arr) {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;
}

//通过class获取元素
function getByClass(oParent, sClass) {
    var arr = [];
    var aEle = oParent.getElementsByTagName('*');
    var pattern = new RegExp('\\b' + sClass + '\\b');

    for (var i = 0; i < aEle.length; i++) {
        if (pattern.test(aEle[i].className)) {
            arr.push(aEle[i]);
        }
    }

    return arr;
}


/*!
 * @author reven
 * @create 15/10/28
 */

/*
 *  !选择器组件(工具类组件)
 *  原型方法:
 *  @init : 初始化Selector组件
 *  @getElems : 得到选择到得元素，返回一个数组（DOM元素集合）
 *
 * */

function Selector() {
    this.result = [];
    this.idPattern = /\#(\w+)/;
    this.classPattern = /\.(\w+)/;
    this.tagPattern = /(\w+)/;
}

/*
 *  !初始化选择器
 *  参数:
 *  @arr:一个字符串的集合，如['div','.box','#div1']
 *
 */
Selector.prototype.init = function (arr) {
    this.arr = arr;
};

/*
 *  !获取选择后的DOM元素集合，如果没有符合条件的就返回空数组
 *
 */
Selector.prototype.getElems = function () {
    var that = this;
    var len = that.arr.length;
    for (var i = 0; i < len; i++) {
        var tempCol = [];
        var tempArr = [];
        var elem = this.arr[i];
        if (elem) {
            //id
            if (that.idPattern.test(elem)) {
                elem = elem.replace(this.idPattern, '$1');
                tempCol = document.getElementById(elem);
                //console.log( 'id+1'+ ' : ' +tempCol );
                that.result.push(tempCol);
            }
            //class
            else if (that.classPattern.test(elem)) {
                elem = elem.replace(this.classPattern, '$1');
                tempCol = getByClass(document, elem);
                tempArr = Array.prototype.slice.call(tempCol);
                console.log('class+1' + ' : ' + tempArr);
                that.result = that.result.concat(tempArr);
            }
            //tag
            else if (that.tagPattern.test(elem)) {
                tempCol = document.getElementsByTagName(elem);
                tempArr = Array.prototype.slice.call(tempCol);
                //console.log('tag+1' + ' : ' + tempArr);
                that.result = that.result.concat(tempArr);
            }
        }

    }
    return unique(this.result);
};


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


/*!
 * @author reven
 * @create 15/10/28
 */

//业务代码

var oLogo = getByClass(document,'logo')[0];
var queue = 0;
var t1 = new TransformController(oLogo, 'click', ['p'], 'rotate');
var t2 = {};
var t3 = {};
t1.addTransform();
if(queue === 0){
    oLogo.addEventListener('click',function(){
        t2 = new TransformController(oLogo, 'click', ['p','img'], 'rotate');
        t2.addTransform();
        queue++;
    },false);
}
if(queue === 1){
    oLogo.addEventListener('click',function(){
        t3 = new TransformController(oLogo, 'click', ['p','img','div'], 'rotate');
        t3.addTransform();
        queue++;
    },false);
}


