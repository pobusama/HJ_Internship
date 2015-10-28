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


