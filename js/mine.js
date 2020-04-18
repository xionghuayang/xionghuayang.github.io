
$(function() {
    var uname = location.search.substr(1).split('=')[1];
    
    
    if(uname) {
        console.log(uname);
        $('.login').addClass('hide').siblings('.register').addClass('hide');
        $('.user').html($('.user').html() + uname);
        $('.user a').eq(0).prop('href','account_setting.html?uname='+uname);
    } else {
        $('.login').removeClass('hide').siblings('.register').removeClass('hide');
    }

    // console.log($('.user a').eq(0));
    // console.log($('.user a').eq(0).prop('href'))
    
})