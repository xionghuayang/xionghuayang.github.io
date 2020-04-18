function regexp(ele,reg) {
    ele.onblur = function() {
        if(!this.value) {
            this.nextElementSibling.innerHTML = '';
            return;
        }
        if(reg.test(this.value)) {
            this.nextElementSibling.innerHTML = '恭喜你，输入正确！';
            this.nextElementSibling.classList.remove('error');
            this.nextElementSibling.classList.add('right');
            // this.nextElementSibling.className = 'login_prompt right';
        } else {
            this.nextElementSibling.innerHTML = '输入的格式不正确！';
            this.nextElementSibling.classList.remove('right');
            this.nextElementSibling.classList.add('error');
            // this.nextElementSibling.className = 'login_prompt error';
        }
    }
    // ele.addEventListener('keyup', function(e) {
    //     // console.log(e.keyCode);
    //     // if(e.keyCode === 8) {
    //         if(reg.test(this.value)) {
    //             this.nextElementSibling.innerHTML = '恭喜你，输入正确！';
    //             this.nextElementSibling.classList.remove('error');
    //             this.nextElementSibling.classList.add('right');
    //             // this.nextElementSibling.className = 'login_prompt right';
    //         } else {
    //             this.nextElementSibling.innerHTML = '输入的格式不正确！';
    //             this.nextElementSibling.classList.remove('right');
    //             this.nextElementSibling.classList.add('error');
    //             // this.nextElementSibling.className = 'login_prompt error';
    //         }
    //     // }
        
    // })
}