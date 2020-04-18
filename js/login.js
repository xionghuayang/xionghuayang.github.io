window.addEventListener('load',function() {
    var login_tel = document.querySelector('#login_tel');
    var rg_tel = /^1[1|3|4|5|7|8]\d{9}$/;
    // var span = document.querySelector('.login_prompt');
    // console.log(login_tel.nextElementSibling);
    var code = document.querySelector('.code');
    var rg_code = /^[a-zA-Z0-9]{4}$/; 
    regexp(code,rg_code);
    regexp(login_tel,rg_tel);
    
    var login_go = this.document.querySelector('.login_go');
    var login_prompt = document.querySelector('.login_prompt');
    login_go.onclick = function() {
        if(login_tel.value == '') {
            login_prompt.innerHTML = '输入的格式不正确！';
            login_prompt.classList.add('error');
            login_prompt.classList.remove('hide');
        }
        if(rg_tel.test(login_tel.value) && rg_code.test(code.value)) {
            this.href = 'mine.html?uname=' + login_tel.value;
        }
    }
    
    // if(rg_tel.test(login_tel.Value))
})