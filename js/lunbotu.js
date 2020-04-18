window.addEventListener('load', function () {
    var focus = document.querySelector('.commodity_focus');
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.focus_bar');
    // 方便管理图片记录索引
    var index = 0;
    var timer = this.setInterval(function () {
        index++;
        translatex1();
    }, 2000);
    ul.addEventListener('transitionend',function() {
        if (index >= 4) {
            index = 0;
        } else if(index < 0 ){
            index = 3;
        }
        translatex2();
        ol.querySelector('.current').classList.remove('current');
        ol.children[index].classList.add('current');
    });

    var startX =0 ;
    var moveX = 0;
    var flag = false;

    ul.addEventListener('touchstart',function(e) {
        clearInterval(timer);
        startX = e.targetTouches[0].pageX ;
    });
    ul.addEventListener('touchmove',function(e) {
        moveX = e.targetTouches[0].pageX - startX;
        var translatex = -index * focus.offsetWidth + moveX;
        //console.log(-index * focus.offsetWidth);
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
        // translatex2();
        flag = true;
        e.preventDefault();
    });
    
    ul.addEventListener('touchend',function() {
        if(flag) {
            if(Math.abs(moveX) > 50) {
                if(moveX >0 ) {
                    index -- ;
                } else {
                    index ++;
                }
                translatex1();
            }else {
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
                ul.style.transition = 'all .5s';
                ul.style.transform = 'translateX(' + translatex + 'px)';
    }
    function translatex2() {
        var translatex = -index * focus.offsetWidth;
        ul.style.transition = 'none';
        ul.style.transform = 'translateX(' + translatex + 'px)';
    }
})