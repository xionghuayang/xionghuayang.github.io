window.addEventListener('load',function() {
    var uname = document.querySelector('#uname');
    var rg_uname = /^[\u4e00-\u9fa5]{2,8}$/;  // 汉字的正则 
    regexp(uname,rg_uname);
    var passport = document.querySelector('#passport');
    //身份证正则
    var rg_passport = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/; 
    regexp(passport,rg_passport); 
    var tel = document.querySelector('#tel');
    //国外手机号 
    var rg_tel = /^\+[\d]{1,5}\s[\d]{1,14}$/;  
    regexp(tel,rg_tel);    
})