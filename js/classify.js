
$(function () {
    // 当我们点击了小li 此时不需要执行 页面滚动事件里面的 li 的背景选择 添加 current
    var flag = true;
    var startY = 0;
    var moveY = 0;
    // 记录手指移动后的位置 ， 同时也记录 鼠标点击 li 后移动的位置
    var moveOver = 0;
    var index = 0;
    var h = $($('.classify_product')[0]).height();
    $('.product').on({
        touchstart: function (e) {
        // console.log($('.product').css('transform'));
        startY = e.targetTouches[0].pageY;
        if(flag) {
            moveOver = moveY;
        } else {
            flag = true;
        }
    },
        touchmove: function (e) {
            // console.log(moveOver);
            moveY = e.targetTouches[0].pageY - startY + moveOver;
            if (moveY > 0){
                moveY = 0;
            }
            index = Math.floor( Math.abs(moveY) / h );
            if (Math.abs(moveY) / h > ($('.classify_product').length - 2)) {
                moveY = - ($('.classify_product').length- 2) * h ;
                index = $(".classify_items li").length - 2;
                // console.log(moveX);
            }
            if(moveY <  - ($('.classify_product').length- 2) * h ){
                index = $(".classify_items li").length - 1;
            }

            $(".classify_items li").eq(index).addClass("current").siblings().removeClass();
            // console.log(index);
            // console.log(moveY);
            $('.product').css('transform','translateY('+ moveY+'px)' );
            // console.log($('.product').css('transform'));
            e.preventDefault();
        }
    });
    // 2. 点击电梯导航页面可以滚动到相应内容区域
    $(".classify_items li").click(function () {
        flag = false;
        // console.log($(this).index());
        index = $(this).index();
        // 当我们每次点击小li 就需要计算出页面要去往的位置
        // 选出对应索引号的内容区的盒子 计算它的.offset().top
    //     var current = $(".floor .w").eq($(this).index()).offset().top;
       // var current = $(".classify_products .classify_product").eq($(this).index()).offset().top;
        if(index === $('.classify_product').length - 1) {
            index = index - 1 ;
        }
        var current = - index * $('.classify_product').height();
        moveOver = current;
        // console.log(moveOver);
        // console.log(current);
       //  console.log($('.classify_product').height());
    //     // 页面动画滚动效果
        $(".product").css('transform','translateY(' +current+'px)');
        // $(".product").stop().animate({
        //     // scrollTop: current
        //     transform: 'translateY('+current +'px)'
        // }, function () {
        //     flag = true;
        // });
        // console.log($('.product').css('transform'));
        // 点击之后，让当前的小li 添加current 类名 ，姐妹移除current类名
        $(this).addClass("current").siblings().removeClass();
    })
})