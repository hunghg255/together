document.addEventListener(
  'DOMContentLoaded',
  function () {
    const yourDate = new Date('Thu Dec 30 2021 21:30:00 GMT+0700');
    const music = ['ctcht.mp3', 'cmty.mp3'];
    const dNow = new Date();
    let dateCount = document.querySelector('date');
    let wrapper = document.querySelector('.wrapper');
    let timeNow = document.querySelector('#today');

    // get total seconds between the times
    let delta = Math.floor(dNow.getTime() - yourDate.getTime()) / 1000;

    // calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    // calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    // calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    document.querySelector('anni').textContent = `${
      yourDate.getDate() <= 9 ? '0' + yourDate.getDate() : yourDate.getDate()
    } - ${
      yourDate.getMonth() <= 9
        ? '0' + (yourDate.getMonth() + 1)
        : yourDate.getMonth() + 1
    } - ${yourDate.getFullYear()}`;

    dateCount.textContent = `${
      days >= 365
        ? days % 365 === 0
          ? Math.floor(days / 365) + ' YEARS'
          : Math.floor(days / 365) + ' YEARS ' + (days % 365) + ' daysS'
        : days + ' DAYS'
    } - ${hours} HOURS - ${minutes} MINUTES`;

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
      if (i < 10) {
        i = '0' + i;
      } // add zero in front of numbers < 10
      return i;
    }
    startTime();

    document
      .querySelector('audio')
      .setAttribute(
        'src',
        `music/${music[Math.floor(Math.random() * music.length)]}`
      );

    wrapper.insertAdjacentHTML(
      'afterend',
      `<div class='mask'></div>
        <canvas class="canvas"></canvas>`
    );

    // Canvas
    let canvas = document.querySelector('.canvas');
    let c = canvas.getContext('2d');
    let mouse = {
      x: undefined,
      y: undefined,
    };

    window.addEventListener('mousemove', function (event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    //set size canvas
    function setCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvas();
    window.addEventListener('resize', setCanvas);

    function createX() {
      return Math.floor(Math.random() * canvas.width);
    }

    function createY() {
      return Math.floor(Math.random() * canvas.height);
    }

    // Star
    function Star(x, y) {
      this.x = x;
      this.y = y;
      this.radius = Math.floor(Math.random() * 2) + 1;
      this.color = `crimson`;
    }
    // Ve
    Star.prototype.draw = function () {
      c.fillStyle = this.color;
      c.shadowBlur = this.r * 2;
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      c.closePath();
      c.fill();
    };

    // move
    Star.prototype.move = function () {
      if (this.y > 0) {
        this.y -= 1.5;
      } else {
        this.y = canvas.height;
      }
      this.draw();
    };

    let arrayStar;
    function init() {
      arrayStar = [];
      for (let i = 0; i < 200; i++) {
        arrayStar.push(new Star(createX(), createY()));
      }
    }

    function animate() {
      window.requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);

      arrayStar.forEach((c) => {
        c.move();
      });
    }
    init();
    animate();
  },
  false
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker
      .register('/serviceWorker.js')
      .then((res) => console.log('service worker registered'))
      .catch((err) => console.log('service worker not registered', err));
  });
}
