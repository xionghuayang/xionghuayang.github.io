window.onload = function () {

}
//  最外面的盒子 ul li 内容盒子 小内容 num 表示剩余的小item个数
function move_Tabsmall(big, content, item, num) {
    // var content = document.querySelector('.content');
    // var journey = document.querySelector('.journey');
    // var journey_ul = journey.querySelector('ul');
    // var journey_li = journey.querySelectorAll('li');
    // var journey_items = journey.querySelector('.items');
    // console.log(journey_items.offsetWidth);

    // console.log(content);
    // console.log(journey_li);
    var content = document.querySelector(content);
    var big = document.querySelector(big);
    var big_ul = big.querySelector('ul');
    var big_li = big.querySelectorAll('li');
    var big_items = big.querySelectorAll(item);
    var index = 0;
    var startX = 0;
    var moveX = 0;
    var item_width = big_items[0].offsetWidth;
    for (var i = 0; i < big_li.length; i++) {
        big_li[i].index = i
    }
    big_ul.addEventListener('click', function () {
        index++;
        if (index > big_li.length - 1) {
            index = 0;
        }
        // console.log(index);
        for (var i = 0; i < big_li.length; i++) {
            big_li[i].className = '';
        }
        big_li[index].className = 'cards_current';
        moveX = -item_width * 2 * index;
        if (Math.abs(moveX) / (item_width) > big_items.length - num) {
            moveX = - (big_items.length - num) * item_width;
            index = big_li.length - 1;
            // console.log(moveX);
        }
        content.style.transform = 'translateX(' + moveX + 'px)';
    })
    var moveOver = 0;
    //x1,y1 手指开始坐标  x2,y2 手指移动时坐标 x,y 坐标差  z = x,y为直角边，斜边的长度
    // sin = y / z 表示手指移动角度对应的sin值 1/2 表示30°

    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var sin = 0;
    content.addEventListener('touchstart', function (e) {
        startX = e.targetTouches[0].pageX;
        // console.log(startX);
        moveOver = moveX;
        // console.log(moveOver);
        x1 = e.targetTouches[0].clientX;
        y1 = e.targetTouches[0].clientY;
    });
    content.addEventListener('touchmove', function (e) {
        x2 = e.targetTouches[0].clientX;
        y2 = e.targetTouches[0].clientY;
        sin =  sin_scroll(x1,y1,x2,y2);
        // console.log(sin);
        
        if (sin >= 0.5) {
            return;
        } else if (e.cancelable) {
            e.preventDefault();
        }
        moveX = e.targetTouches[0].pageX - startX + moveOver;
        if (moveX > 0) {
            moveX = 0;
        }
        for (var i = 0; i < big_li.length; i++) {
            // if(big_li[i].index == 0 && moveX > 0  ) {
            //     moveX = 0;
            // }
            big_li[i].className = '';
        }
        // console.log(big_items.length);
        // console.log(big_li.length);
        // 每移动两个item大小，就让li 走一步
        index = Math.floor(Math.abs(moveX) / (item_width * 2));
        // 内容中保留item的个数 ， big_items.length - 2 ，代表保留两个 -3 保留三个
        if (Math.abs(moveX) / (item_width) > big_items.length - num) {
            moveX = - (big_items.length - num) * item_width;
            index = big_li.length - 1;
            // console.log(moveX);
        }
        // console.log(moveX);
        // console.log(index);
        big_li[index].className = 'cards_current';
        // content.style.transition = 'none';
        content.style.transform = 'translateX(' + moveX + 'px)';
        // e.preventDefault();
    });
    content.addEventListener('touchend', function (e) {
    })
}

//轮播图(focus盒子 ， ul , 小圆圈)
function slideShow(focus, ul, ol) {
    var focus = document.querySelector(focus);
    var ul = focus.querySelector(ul);
    var ol = focus.querySelector(ol);
    // 方便管理图片记录索引
    var index = 0;
    var timer = this.setInterval(function () {
        index++;
        translatex1();
    }, 2000);
    ul.addEventListener('transitionend', function () {
        if (index >= 4) {
            index = 0;
        } else if (index < 0) {
            index = 3;
        }
        translatex2();
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });

    var startX = 0;
    var moveX = 0;
    var flag = false;
    var x1 = 0;
    var y1 = 0;
    var x2 = 0;
    var y2 = 0;
    var sin = 0;
    ul.addEventListener('touchstart', function (e) {
        clearInterval(timer);
        startX = e.targetTouches[0].pageX;
        x1 = e.targetTouches[0].clientX;
        y1 = e.targetTouches[0].clientY;
        // console.log(x1);
        // console.log(startX);
        


    });
    ul.addEventListener('touchmove', function (e) {
        x2 = e.targetTouches[0].clientX;
        y2 = e.targetTouches[0].clientY;

        sin =  sin_scroll(x1,y1,x2,y2);
        // console.log(sin);
        
        if (sin >= 0.5) {
            return;
        } else if (e.cancelable) {
            // console.log(e.cancelable);
            e.preventDefault();
        }

        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * focus.offsetWidth + moveX;
        //console.log(-index * focus.offsetWidth);
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        // translatex2();
        flag = true;

    });

    ul.addEventListener('touchend', function () {
        if (flag) {
            if (Math.abs(moveX) > 50) {
                if (moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                translatex1();
            } else {
                translatex1();
            }
            flag = false;
        }
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            translatex1();
        }, 2000);
    })

    function translatex1() {
        var translatex = -index * focus.offsetWidth;
        ul.style.transition = 'all .3s';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }
    function translatex2() {
        var translatex = -index * focus.offsetWidth;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }
}
// 计算两点间的sin值
function sin_scroll(x1, y1, x2, y2) {
    var x = 0;
    var y = 0;
    var z = 0;
    var sin = 0;
    x = Math.abs(x1 - x2);
    y = Math.abs(y1 - y2);
    // Math.hypot() 函数返回它的所有参数的平方和的平方根
    z = Math.hypot(x, y);
    sin = y / z;
    // console.log(sin);
    // console.log(x,y);
    return sin;
}