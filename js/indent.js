$(function () {

    console.log(location.search);
    console.log(location.search.substr(1));
    console.log(location.search.substr(1).split('=')[1]);

    var id = location.search.substr(1).split('=')[1];
    

    var index = 0;
    $('.indent li').on('click', function () {
        $(this).addClass('current').siblings().removeClass('current');
        // console.log($(this).prop('class'));
        var str = $(this).prop('class');
        var arr = str.split(' ');
        index = $(this).index();
        // console.log(index);

        // console.log(arr[0]);
        // console.log($('.indent_items .'+arr[0])[0]);
        // console.log($('.indent_items .indent_all'));
        $('.indent_items .indent_all').each(function (i, ele) {
            // console.log(i);
            // console.log($(ele).hasClass('indent_item_payment'));
            $(ele).removeClass('hide');
            if (!$(ele).hasClass(arr[0])) {
                $(ele).addClass('hide');
            }
        })
    })

    $('.indent li')[id].click();

    var startX = 0;
    var moveX = 0;
    var flag = true;
    $(document).on({
        touchstart: function (e) {
            startX = e.targetTouches[0].pageX;
        },
        touchmove: function (e) {
            if (flag) {
                flag = false;
                moveX = e.targetTouches[0].pageX - startX;
                console.log(moveX);
                if (Math.abs(moveX) > 10) {
                    if (moveX > 0) {
                        index--;
                    } else {
                        index++;
                    }
                    if (index > $('.indent li').length - 1) {
                        index = 0;
                    }
                    if (index < 0) {
                        index = $('.indent li').length - 1;
                    }
                    console.log(index);

                    $('.indent li')[index].click();
                }

            }
            // 禁止当前页面返回事件代码
            if(window.history && window.history.pushState) {
                window.onpopstate=function () {
                        window.history.pushState('forward', null, '');
                        window.history.forward(1);
                };
            }
            window.history.pushState('forward', null, '');//在IE中必须得有这两行
            window.history.forward(1);
            // e.preventDefault();
        },
        touchend: function () {
            flag = true;
        }
    });

})