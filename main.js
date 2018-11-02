const yourDate = new Date("2015-11-02T02:10:26"),
    music = ["dnty.mp3", "123.mp3", "nngdc.mp3"],
    dNow = new Date();

document.addEventListener("DOMContentLoaded", function () {
    let dateCount = document.querySelector('date');
    let wrapper = document.querySelector('.wrapper');
    let timeNow = document.querySelector('#today');
    let day = Math.floor((dNow.getTime() - yourDate.getTime()) / 1000 / 3600 / 24);

    document.querySelector('anni').textContent = `${(yourDate.getDate() <= 9 ? '0' + yourDate.getDate() : yourDate.getDate())} - ${(yourDate.getMonth() <= 9 ? '0' + (yourDate.getMonth() + 1) : (yourDate.getMonth() + 1))} - ${yourDate.getFullYear()}`;
    dateCount.textContent = `${(day >= 365 ? ((day % 365 === 0) ? Math.floor(day / 365) + ' YEARS' : (Math.floor(day / 365) + ' YEARS ' + day % 365 + ' DAYS')) : day + ' DAYS')}`;

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        timeNow.innerHTML = `${h} : ${m} : ${s}`;
        setTimeout(startTime, 500);
    }
    function checkTime(i) {
        if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
        return i;
    }
    startTime();

    document.querySelector('audio').setAttribute('src', `music/${music[Math.floor(Math.random()*music.length)]}`);

    wrapper.insertAdjacentHTML("afterend",`<div class='mask'></div>`);
});