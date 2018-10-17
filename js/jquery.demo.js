$.fn.demo = function(option){

    var index = 0;

    var carouselNode = option.bannerNode,
        style = option.style,
        btnList = option.btnList,
        className = option.className,
        isAuto = option.isAuto,
        time = option.time || null;

    var selStyle = Object.keys(style)[0];

    var changeStyle = Object.create(Object);

    btnList.click(function(){
        index = $(this).index();


        $(this).addClass(className).siblings().removeClass(className);

        changeStyle[selStyle] = index*style[selStyle] + "%"

        carouselNode.animate(changeStyle);
    });

    if(isAuto){
        setInterval(function(){
            index ++;
            if(index > btnList.length - 1){
                index = 0;
            }
            changeStyle[selStyle] = index*style[selStyle] + "%"
            carouselNode.animate(changeStyle);
            btnList.eq(index).addClass(className).siblings().removeClass();
        },2000)
    }
}