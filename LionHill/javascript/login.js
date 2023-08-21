//로그인 페이지

//비밀번호 토글
const eyeToggle = document.querySelector('.eyeBtn');
const pwInput = document.querySelector('input[type="password"]');

eyeToggle.onclick = function(){
    eyeToggle.classList.toggle('active');
    if (eyeToggle.classList.contains('active')){
        pwInput.type = 'text';
    }else{
        pwInput.type = 'password';
    }
}