$(function () {
    $('.edit a').click(function () {
        if ($('.edit a').html() === '编辑') {
            $('.edit a').html('完成');
            $('.select_all_car').addClass('hide').siblings().removeClass('hide');
            var startX = 0;
            var moveX = 0;
            var x1 = 0;
            var y1 = 0;
            var x2 = 0;
            var y2 = 0;
            var sin = 0;
            //绑定item的触碰事件
            $('.product_item').on({
                touchstart: function (e) {
                    startX = e.targetTouches[0].pageX;
                    x1 = e.targetTouches[0].clientX;
                    y1 = e.targetTouches[0].clientY;
                },
                touchmove: function (e) {
                    x2 = e.targetTouches[0].clientX;
                    y2 = e.targetTouches[0].clientY;
                    sin = sin_scroll(x1, y1, x2, y2);
                    if (sin >= 0.5) {
                        return;
                    } else if (e.cancelable) {
                        e.preventDefault();
                    }
                    moveX = e.targetTouches[0].pageX - startX;
                    if (Math.abs(moveX) > 30) {
                        if (moveX > 0) {
                            $(this).children('.product').css('margin-left', '0rem');
                            $(this).find('.product_delete').addClass('hide');
                        } else {
                            $(this).children('.product').css('margin-left', '-2rem');
                            $(this).find('.product_delete').removeClass('hide');
                        }
                    }
                }
            });
        } else if ($('.edit a').html() === '完成') {
            //编辑完成后让所有的删除隐藏，所有的item 不移动
            $('.product_delete').addClass('hide');
            $('.product').css('margin-left', '0rem');
            $('.edit a').html('编辑');
            $('.select_all_delete').addClass('hide').siblings().removeClass('hide');
            //解绑item的触碰事件
            $('.product_item').off();
        }
    });
    // 总的删除按钮功能 
    $('.s_compute_delete').click(function() {
        // console.log($($('.checkall')[1]).prop('checked'));
        // 点击全选按钮，全部选择 , 点击 删除 ，全部删除 让全选按钮所在盒子隐藏，让 空购物车盒子显示
        if ($($('.checkall')[1]).prop('checked')) {
            $('.shopping_products').remove();
            $(this).parents('.select_all').addClass('hide');
            $('.car_empty').removeClass('hide');
        }
        // 点击店铺多选按钮，选择该店铺的所有商品 ，点击删除则 删除该店铺的商品 
        $('.check_shop:checked').parents('.shopping_product').remove();
        // 点击多选 按钮，点击删除，删除当前选中的商品
        $('.check_product:checked').parents('.product_item').remove();
    });
    // 点击删除当前店铺商品
    $('.product_delete').click(function () {
        // console.log($(this).parents('.shopping_product').find('.product_item')[1]);
        //如果当前店铺商品为空，删除该店铺
        if ($(this).parents('.shopping_product').find('.product_item').length === 1) {
            $(this).parents('.shopping_product').remove();
        }
        $(this).parent().remove();
        //console.log($('.shopping_products').find('.shopping_product'));
        //如果店铺都删完了，空购物车盒子显示， 全选删除所在盒子隐藏
        if($('.shopping_products').find('.shopping_product').length === 0) {
            $('.select_all').addClass('hide');
            $('.car_empty').removeClass('hide');
        }
        
        getSum();
    });
    //购物功能

    /*
    点击全选按钮，全部选择 ,计算商品总价 写入合计， 结算处统计商品数量
    点击多选 按钮， 计算选中 商品总价 写入合计， 结算处统计商品数量
     点击店铺多选按钮，选择该店铺的所有商品 ，计算选中 商品总价 写入合计， 结算处统计商品数量
    */
    //全选
    $(".checkall").change(function () {
        // console.log($(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品 店铺添加 check_img 类名
            $('.checkall').addClass('check_img').prop('checked', true);
            $(".check_shop").addClass("check_img").prop('checked', true);
            $(".check_product").addClass("check_img").prop('checked', true);
        } else {
            // 让所有的商品 店铺移除 check_img 
            $('.checkall').removeClass('check_img').prop('checked', false);
            $(".check_shop").removeClass("check_img").prop('checked', false);
            $(".check_product").removeClass("check_img").prop('checked', false);
        }

        getSum();
    });
    //店铺复选框
    $(".check_shop").change(function () {
        //店铺复选框选择的个数  === 页面中店铺复选框的个数 ，就让全选选中，否则删除
        if ($(".check_shop:checked").length === $(".check_shop").length) {
            $(".checkall").addClass('check_img').prop('checked', true);
        } else {
            $(".checkall").removeClass('check_img').prop('checked', false);
        }
        // console.log($(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有的商品添加 check_img 类名
            // $(this).prop('checked',true);
            $(this).addClass("check_img").parents('.shopping_product').find(".check_product").addClass("check_img").prop('checked', true);
        } else {
            // check_img 移除
            // $(this).prop('checked',false);
            $(this).removeClass("check_img").parents('.shopping_product').find(".check_product").removeClass("check_img").prop('checked', false);
        }
        getSum();
    });
    $(".check_product").change(function () {
        if ($(this).prop("checked")) {
            // 让当前的商品添加 check_img 类名
            $(this).addClass("check_img").prop('checked', true);
        } else {
            // check_img 移除
            $(this).removeClass("check_img").prop('checked', false);
        }
        //console.log($(this).parents('.shopping_product').find('.check_shop'));
        //判断所有的兄弟商品是否选中 ， 选中则让店铺 选中，否则 不选中
        var flag = true;
        $(this).parents('.shopping_product').find('.check_product').each(function (i, ele) {
            if (!$(ele).prop('checked')) {
                flag = false;
            }
        });
        if (flag) {
            $(this).parents('.shopping_product').find('.check_shop').addClass('check_img').prop('checked', true);
        } else {
            $(this).parents('.shopping_product').find('.check_shop').removeClass('check_img').prop('checked', false);
        }
        //店铺复选框选择的个数  === 页面中店铺复选框的个数 ，就让全选选中，否则未选中
        if ($(".check_shop:checked").length === $(".check_shop").length) {
            $(".checkall").addClass('check_img').prop('checked', true);
        } else {
            $(".checkall").removeClass('check_img').prop('checked', false);
        }

        getSum();
    });





    function getSum() {
        var current =0;
        var sum = 0;
        // console.log( $('.check_product:checked').siblings('.details').find('.text'));
        
        $('.check_product:checked').siblings('.details').find('.text').each(function (i,ele) {
            current += parseInt($(ele).val());
        })
        if(current > 999) {
            $('.s_compute b').html('999+')
        } else {
            $('.s_compute b').html(current);
        }
        // console.log($('.check_product:checked').siblings('.details').find('span'));
        
        $('.check_product:checked').siblings('.details').find('em').each(function (i,ele) {
            sum += parseFloat($(ele).html().substr(1));
        })
        sum ='￥'+sum.toFixed(2);

        // console.log(sum.split('.'));
        
        $('.s_sum').html(sum.split('.')[0]+'<em> .'+sum.split('.')[1]+'</em>');
    }
    getSum();
// 点击加号
    $('.increment').click(function () {
        $(this).siblings('.decrement').removeClass('disabled');
        var num = $(this).siblings('.text').val();
        num++;
        $(this).siblings('.text').val(num);
        var price = ($(this).parents('.details').find('span').html().substr(1) * num).toFixed(2) ;
        // console.log(price);
        $(this).parents('.details').find('.p_sum').html('￥'+ price);
        getSum();
    })
// 点击减号
    $('.decrement').click(function () {
        //$(this).siblings('.decrement').removeClass('disabled');
        var num = $(this).siblings('.text').val();
        if(num == 1) {
            $(this).siblings('.itxt').val(1);
            $(this).addClass('disabled');
            return false;
        } else {
            num--;
        }
        $(this).siblings('.text').val(num);
        var price = ($(this).parents('.details').find('span').html().substr(1) * num).toFixed(2) ;
        // console.log(price);
        $(this).parents('.details').find('.p_sum').html('￥'+ price);
        getSum();
    })
// 手动修改数量
    $('.text').change(function () {
        var  num = $(this).val();
        if(num <= 1) {
            $(this).siblings('.decrement').addClass('disabled');
            $(this).val(1);
            num = 1;
        } else {
            $(this).siblings('.decrement').removeClass('disabled');
        }
        var price = ($(this).parents('.details').find('span').html().substr(1) * num).toFixed(2) ;
        // console.log(price);
        $(this).parents('.details').find('.p_sum').html('￥'+ price);
        getSum();
    });



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
})