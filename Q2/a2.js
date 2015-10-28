/*!
 * Q2.a2
 * @author reven
 * @create 15/10/27 11:08
 * 点击左上角沪江的logo后， 页面的全部img元素逆时针旋转180度，2秒完成，要求旋转动作是非线性的。 动画2秒完成(效果二选一)
 */

//通过class获取元素
function getByClass(oParent,sClass){
    var arr=[];
    var aEle =oParent.getElementsByTagName('*');
    var pattern=new RegExp('\\b'+sClass+'\\b');

    for (var i = 0; i < aEle.length; i++) {
        if( pattern.test(aEle[i].className) )
        {
            arr.push(aEle[i]);
        }
    };
    return arr;
}


var oLogo = getByClass(document,'logo')[0];
var aImg = document.getElementsByTagName('img');

//加3d属性
Array.prototype.forEach.call(aImg,function(elem,index){
    elem.style.webkitTransition = '2s ';
    elem.style.webkitTransitiontimingFunction = 'cubic-bezier(0.42,0,0.58,1)';
    elem.style.webkitTransformOrigin = 'center center';
    elem.parentNode.style.transformStyle = 'preserve-3d';
    elem.parentNode.style.perspective = '300px';

});

//点击加事件
oLogo.addEventListener('click',function(ev){
    Array.prototype.forEach.call(aImg,function(elem,index){
        elem.style.webkitTransform = 'rotateZ(-180deg)';
    });
    ev.preventDefault();
},false);