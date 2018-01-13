function toggle(btn_1, btn_2) {
    btn_2.classList.remove('active');
    btn_1.classList.add('active');
}

function nightMode() {
    var btn = document.getElementById('night-mode-btn');
    var btn_off =  btn.getElementsByTagName('label')[0];
    var btn_on =  btn.getElementsByTagName('label')[1];

    var ck = document.cookie;
    var reg1 = /(^nightMode=)/g;
    var reg2 = /(\w+$)/g;

    if(ck && ck.match(reg1)){
        if(ck.match(reg2) == "off"){
            toggle(btn_off, btn_on);
            document.getElementsByTagName('body')[0].classList.remove('night-mode');
        }else if(ck.match(reg2) == "on"){
            toggle(btn_on, btn_off);
            document.getElementsByTagName('body')[0].classList.add('night-mode');
        }
    }

    btn_off.addEventListener('click', function () {
        toggle(btn_off, btn_on);
        document.getElementsByTagName('body')[0].classList.remove('night-mode');
        document.cookie = "nightMode=off";
    });
    btn_on.addEventListener('click', function () {
        toggle(btn_on, btn_off);
        document.getElementsByTagName('body')[0].classList.add('night-mode');
        document.cookie = "nightMode=on";
    });
}

nightMode();