/*!
 * 俱乐部查询
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


