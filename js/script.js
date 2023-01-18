class Snowflake {//雪花类
    constructor() {
      this.x = 0;
      this.y = 0;
      this.vx = 0;
      this.vy = 0;
      this.radius = 0;
      this.alpha = 0;
      this.reset();
    }
    reset() {
      this.x = this.randBetween(0, window.innerWidth);
      this.y = this.randBetween(0, -window.innerHeight);
      this.vx = this.randBetween(-3, 3);
      this.vy = this.randBetween(2, 5);
      this.radius = this.randBetween(1, 4);
      this.alpha = this.randBetween(0.1, 0.9);
    }

    //生成最大值和最小值之间随意的雪花大小
    randBetween(min, max) {
      return min + Math.random() * (max - min);
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y + this.radius > window.innerHeight) {
        this.reset();
      }
    }
  }
  class Snow {//雪景类
    constructor() {
      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      document.body.appendChild(this.canvas);
      window.addEventListener('resize', () => this.onResize());
      this.onResize();
      this.updateBound = this.update.bind(this);
      requestAnimationFrame(this.updateBound);
      this.createSnowflakes();
    }
    onResize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }
    createSnowflakes() {
      const flakes = window.innerWidth / 4;
      this.snowflakes = [];
      for (let s = 0; s < flakes; s++) {
        this.snowflakes.push(new Snowflake());
      }
    }
    update() {
      this.ctx.clearRect(0, 0, this.width, this.height);
      for (let flake of this.snowflakes) {
        flake.update();
        this.ctx.save();
        this.ctx.fillStyle = '#FFF';
        this.ctx.beginPath();
        this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        this.ctx.closePath();
        this.ctx.globalAlpha = flake.alpha;
        this.ctx.fill();
        this.ctx.restore();
      }
      requestAnimationFrame(this.updateBound);
    }
  }

  //new一个雪景对象
  new Snow();

  //获取间隔时间并将时间倒计时显示在网页上
  var stop = false;
  function show_runtime() {
    var newDay = '2023/01/22 00:00:00';
    var countDate = new Date(newDay);
    var now = new Date().getTime();
    //由新年时间创建日期对象，然后获得现在的时间，与新年时间相减得到间隔的时间
    gap = countDate - now;
    var second = 1000;
    var minute = second * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var d = Math.floor(gap / day);
    var h = Math.floor((gap % day) / hour);
    var m = Math.floor((gap % hour) / minute);
    var s = Math.floor((gap % minute) / second);
    //倒数到58时自动播放音乐
    if (s === 58){
      document.getElementById('premusic').pause();
      document.getElementById('music').play();
    }
    if (d==0 && h==0 && m==0 && s==1) {
      newyear();
    }
    else if (d,h,m,s < 0){
      stop=true;
    } else {//如果没有停止，那么改变组件中各项的值为当前值
      document.getElementById('day').innerText = d;
      document.getElementById('hour').innerText = h;
      document.getElementById('minute').innerText = m;
      document.getElementById('second').innerText = s;
    }
  }
  //如果时间倒计时归零则显示新年快乐并切换网页
  function newyear() {
    document.getElementById('title').innerText = 'Happy Spring Festival';
    document.getElementById('day').innerText = '春';
    document.getElementById('hour').innerText = '节';
    document.getElementById('minute').innerText = '快';
    document.getElementById('second').innerText = '乐';
  }
  var time = setInterval(() => {
    show_runtime();
    if (stop === true) {
      // newyear();
      clearInterval(time);
      window.location.href="firework.html";
    }
  }, 1000);

  // 定时器 控制图片自动切换
  function downTime() {
    let item = 1;
    setInterval(() => {
      item++;
      if (item === 10) {
        item = 1;
      }
      console.log(item, 'item');
      document.body.style.backgroundImage = `url(./image/rabbit${item}.jpg)`;
      return item;
      e.stopPropagation(); //取消事件冒泡
    }, 2000);
  }
  window.onload = downTime;