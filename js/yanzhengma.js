// console.log(num);


// console.log(img_url);


// 装验证码的父盒子ul 
function yanzhengma(id) {
    // console.log(id);
    let ul = document.getElementById(id);
    let num = yanzhen();
    listul(num, id);
    // 随机生成背景图地址
    let img_url = ran_img();

    ul.onclick = function () {
        // let arr3 = []
        num = yanzhen();
        ran_img();
        listul(num, id);
    }

    // 生成随机验证码
    function yanzhen() {
        let arry = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 0);
        let arry1 = new Array('q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm');
        let arrylength = 4;
        let mathtest = [];
        let test = null
        for (i = 0; i < arrylength; i++) {
            if (i == 0) {
                test = parseInt(Math.random() * 26)
                mathtest.push(arry1[test])
            } else if (i == 1) {
                test = parseInt(Math.random() * 10)
                mathtest[i] = arry[test]
            } else if (i == 2) {
                test = parseInt(Math.random() * 10)
                mathtest[i] = arry[test]
            } else if (i == 3) {
                test = parseInt(Math.random() * 26)
                mathtest.push(arry1[test])
            }
        }
        return mathtest;
    }
    // 验证码用li 在页面中显示
    function listul(num) {
        let test = null
        let ul_html = '';
        for (i = 0; i < num.length; i++) {
            test = parseInt(Math.random() * 4)
            ul_html += '<li>' + num[i] + '</li>'
        }
        ul.innerHTML = ul_html;
    }

    function ran_img() {
        var f = new Array('../images/common/code1.jpg', '../images/common/code2.jpg', '../images/common/code3.jpg', '../images/common/code4.jpg')
        var g = parseInt(Math.random() * 4);
        ul.style.backgroundImage = 'URL' + '(' + f[g] + ')';
        return f[g];
    }

}