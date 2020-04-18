$(function () {
    var uname = location.search.substr(1).split('=')[1];
    if (uname) {
        $('.account b').html(uname);
    }
    $('.account p').click(function () {
        // $(this).html('<input type="text">');
        var str = $(this).find('b').text();
        $(this).html('<input type="text" />');
        var input = $(this).find('input');
        input.val(str);
        input.select(); // 文本框里面的文字处于选定状态
        //当我们离开文本框就把文本框里面的值给span 
        input.blur(function () {
            uname = $(this).val();
            $(this).parent().html('昵称：<b>' + $(this).val() + '</b>');
        });

        // 按下回车也可以把文本框里面的值给span
        input.keyup(function (e) {
            if (e.keyCode === 13) {
                // 手动调用表单失去焦点事件  不需要鼠标离开操作
                $(this).blur();
            }
        });

    })
    $('.back a').click(function() {
        $(this).prop('href','mine.html?uname='+uname);
    })

    // editTab() {
    //     var str = this.innerHTML;
    //     // 双击禁止选定文字
    //     window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    //     // alert(11);
    //     this.innerHTML = '<input type="text" />';
    //     var input = this.children[0];
    //     input.value = str;
    //     input.select(); // 文本框里面的文字处于选定状态
    //     // 当我们离开文本框就把文本框里面的值给span 
    //     input.onblur = function() {
    //         this.parentNode.innerHTML = this.value;
    //     };
    //     // 按下回车也可以把文本框里面的值给span
    //     input.onkeyup = function(e) {
    //         if (e.keyCode === 13) {
    //             // 手动调用表单失去焦点事件  不需要鼠标离开操作
    //             this.blur();
    //         }
    //     }
})