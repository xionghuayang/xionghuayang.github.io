window.addEventListener('load', function () {
    // 我的行程部分
    move_Tabsmall('.journey','.content','.items',2);
    // 附近店铺
    move_Tabsmall('.shop','.shop_items','.shop_item',3);
    // 轮播图
    slideShow('.commodity_focus','ul','.focus_bar');
})