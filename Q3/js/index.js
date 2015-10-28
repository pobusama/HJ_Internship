/*!
 * @author reven
 * @create 15/10/28
 */

    //业务代码

    var btn = document.getElementById('button');
    var t = new TransformController(btn, 'click', ['div','p','#box','button'], 'rotate');

    t.addTransform();
    //t.removeTransform();

