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
          ? Math.floor(days / 365) + 'Y ❤ '
          : Math.floor(days / 365) + 'Y ❤ ' + (days % 365) + 'D'
        : days + 'D'
    } ❤ ${hours}H ❤ ${minutes}M`;

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
    const colours = new Array(
      '#f00',
      '#f06',
      '#f0f',
      '#f6f',
      '#f39',
      '#f9c',
      'dodgerblue',
      'greenyellow',
      'yellow'
    ); // colours of the hearts

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

    const Point = (function () {
      function Point(x, y) {
        this.x = typeof x !== 'undefined' ? x : 0;
        this.y = typeof y !== 'undefined' ? y : 0;
      }
      Point.prototype.clone = function () {
        return new Point(this.x, this.y);
      };
      Point.prototype.length = function (length) {
        if (typeof length == 'undefined')
          return Math.sqrt(this.x * this.x + this.y * this.y);
        this.normalize();
        this.x *= length;
        this.y *= length;
        return this;
      };
      Point.prototype.normalize = function () {
        let length = this.length();
        this.x /= length;
        this.y /= length;
        return this;
      };
      return Point;
    })();

    // get point on heart with -PI <= t <= PI
    function pointOnHeart(t) {
      return new Point(
        160 * Math.pow(Math.sin(t), 3),
        130 * Math.cos(t) -
          50 * Math.cos(2 * t) -
          20 * Math.cos(3 * t) -
          10 * Math.cos(4 * t) +
          25
      );
    }

    const getImageHeart = function (c) {
      var canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');
      canvas.width = 30;
      canvas.height = 30;
      // helper function to create the path
      function to(t) {
        var point = pointOnHeart(t);

        point.x = 30 / 2 + (point.x * 30) / 350;
        point.y = 30 / 2 - (point.y * 30) / 350;
        return point;
      }
      // create the path
      context.beginPath();
      var t = -Math.PI;
      var point = to(t);
      context.moveTo(point.x, point.y);
      while (t < Math.PI) {
        t += 0.01; // baby steps!
        point = to(t);
        context.lineTo(point.x, point.y);
      }
      context.closePath();
      // create the fill
      context.fillStyle = c || '#f06';
      context.fill();
      // create the image
      var image = new Image();
      image.src = canvas.toDataURL();
      return image;
    };

    // Star
    function Heart(x, y) {
      this.x = x;
      this.y = y;
      this.size = Math.floor(Math.random() * 20);
      this.image = getImageHeart(
        colours[Math.floor(Math.random() * colours.length)]
      );
    }
    // Ve
    Heart.prototype.draw = function () {
      c.fillStyle = this.color;
      c.shadowBlur = this.r * 2;
      c.drawImage(this.image, this.x, this.y, this.size, this.size);
    };

    // move
    Heart.prototype.move = function () {
      if (this.y > 0) {
        this.y -= 1.5;
      } else {
        this.y = canvas.height;
      }
      this.draw();
    };

    let arrayHeart;
    function init() {
      arrayHeart = [];
      for (let i = 0; i < 200; i++) {
        arrayHeart.push(new Heart(createX(), createY()));
      }
    }

    function animate() {
      window.requestAnimationFrame(animate);
      c.clearRect(0, 0, canvas.width, canvas.height);

      arrayHeart.forEach((c) => {
        c.move();
      });
    }
    // init();
    // animate();
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
