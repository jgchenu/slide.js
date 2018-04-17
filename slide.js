(function () {
    let Slide = function (
        slideId = 'slide',
        timeOut = 3000,
        speed = 0.1,
        d = 20
    ) {
        this.d = d;//滑动灵敏度
        this.timeOut = timeOut;//轮播间隔
        this.slide = document.querySelector('#slide'); //获取视窗层
        this.room = this.slide.querySelector('div'); //获取内容层
        this.imgs = [...this.slide.querySelectorAll('.slide-item')]; //轮播图元素组
        this.slideWidth = parseInt(getComputedStyle(this.slide).width); //视窗层高度
        this.slideHeight = parseInt(getComputedStyle(this.slide).height); //视窗层宽度
        this.startPoint = null; //手指触摸的起点
        this.navButtons = null; //获取到所有的导航圆点
        this.timer = null; //定时器
        this.imgIndex = 1; //当前轮播图片index
        this.prev = null; //上一个
        this.next = null; //下一个
        this.speed = -(this.slideWidth / 10 * speed); //动画速度
        this.resetCss(); //初始化css样式
        this.resetAll(); //初始化设置
        this.imgs.forEach((el) => {
            el.style.height = `${this.slideHeight}px`;
            el.style.width = `${this.slideWidth}px`;
        }); //使图片的宽度跟视窗层一样
        this.autoStart = setInterval(() => {
            this.nextItem()
        }, timeOut);
        //轮播间隔定时器

        for (let i = 0; i < this.navButtons.length; i++) {
            this.navButtons[i].onclick = this.navButtonClick.bind(this);
        } //绑定导航圆点点击事件
        //绑定触摸开始事件
        this.slide.addEventListener('touchstart', this.touchstart.bind(this));
        //绑定触摸结束事件
        this.slide.addEventListener('touchend', this.touchend.bind(this));
    }
    //初始化样式
    Slide.prototype.resetCss = function () {
        let styleEle = document.createElement('style'); //创建style标签
        let navLeft = this.slideWidth / 2 - this.imgs.length * 9;
        let navTop = this.slideHeight / 40;
        styleEle.innerHTML += '.slide{position:relative;overflow:hidden;font-size:0;}'; //舒适化slide视窗的样式
        styleEle.innerHTML += '.slide .room{position:absolute;}'; //初始化room内容层的样式
        styleEle.innerHTML += '.slide .slide-item{display:inline-block;}'; //设置slide-item的样式为内联块级元素
        styleEle.innerHTML += `.slide .nav{padding:0 4px;list-style:none;position:absolute;font-size:0px;background:rgba(222,222,222,0.4);bottom:${navTop}px;left:${navLeft}px;text-align:center;-moz-border-radius:10px;border-radius:10px;}`;
        styleEle.innerHTML += '.navButton{display:inline-block;margin:6px 4px;background:#fff;width:8px;height:8px;-moz-border-radius:8px;border-radius:8px;cursor:pointer;}';
        document.head.appendChild(styleEle); //插入标签
    }

    Slide.prototype.resetAll = function () {
        this.slide.setAttribute('class', 'slide'); //给slide元素增加class属性
        this.room.setAttribute('class', 'room'); //给room元素增加class属性
        this.room.style.left = `0px`; //设置room的初始距离
        this.room.style.width = `${this.slideWidth * (this.imgs.length)}px`; //设置内容层的宽度
        //创建导航圆点定位框
        let nav = document.createElement('ul');
        nav.id = 'nav';
        nav.setAttribute('class', 'nav');
        this.slide.appendChild(nav);

        for (let i = 0; i < this.imgs.length; i++) {
            let navButtonLi = document.createElement('li');
            navButtonLi.setAttribute('class', 'navButton');
            navButtonLi.index = i + 1;
            nav.appendChild(navButtonLi);
        }
        this.navButtons = this.slide.querySelectorAll('li'); //获取所有的li节点
        this.navButtons[0].style.background = '#333'; //初始化第一个圆点的颜色
    }
    //切换下一个的函数
    Slide.prototype.nextItem = function () {
        //清除过度定时器
        clearInterval(this.timer);
        //清除间隔播放定时器
        clearInterval(this.autoStart);
        this.timer = setInterval(() => {
            let left = parseInt(this.room.style.left);
            if (this.imgIndex < this.imgs.length) {
                if (left > (-this.slideWidth * this.imgIndex)) {
                    this.room.style.left = `${parseInt(this.room.style.left)+this.speed}px`;
                } else {
                    clearInterval(this.timer);
                    this.room.style.left = `${-this.slideWidth*this.imgIndex}px`;
                    this.navButtons[this.imgIndex - 1].style.background = '#fff';
                    this.imgIndex++;
                    this.navButtons[this.imgIndex - 1].style.background = '#333';
                }
            } else {
                if (left < 0) {
                    this.room.style.left = `${parseInt(this.room.style.left)+(-this.speed*2)}px`;
                } else {
                    clearInterval(this.timer);
                    this.room.left = '0';
                    this.navButtons[this.imgIndex - 1].style.background = '#fff';
                    this.imgIndex = 1;
                    this.navButtons[this.imgIndex - 1].style.background = '#333';
                }
            }
        }, 16.7);
        this.autoStart = setInterval(() => {
            this.nextItem()
        }, this.timeOut);
    }

    Slide.prototype.lastItem = function () {
        clearInterval(this.timer);
        clearInterval(this.autoStart);
        this.timer = setInterval(() => {
            let left = parseInt(this.room.style.left);
            if (this.imgIndex > 1) {
                if (left < (-this.slideWidth * (this.imgIndex - 2))) {
                    this.room.style.left = `${parseInt(this.room.style.left)-this.speed}px`;
                } else {
                    clearInterval(this.timer);
                    this.room.style.left = `${-this.slideWidth*(this.imgIndex-2)}px`;
                    this.navButtons[this.imgIndex - 1].style.background = '#fff';
                    this.imgIndex--;
                    this.navButtons[this.imgIndex - 1].style.background = '#333';
                }
            } else {
                if (left > -this.slideWidth * (this.imgs.length - 1)) {
                    this.room.style.left = `${parseInt(this.room.style.left)+(this.speed*2)}px`;
                } else {
                    clearInterval(this.timer);
                    this.room.left = `${-this.slideWidth*this.imgs.length-1}px`;
                    this.navButtons[this.imgIndex - 1].style.background = '#fff';
                    this.imgIndex = this.imgs.length;
                    this.navButtons[this.imgIndex - 1].style.background = '#333';
                }
            }
        }, 16.7);
        this.autoStart = setInterval(() => {
            this.nextItem()
        }, this.timeOut);
    }
    Slide.prototype.navButtonClick = function ({
        target
    }) {
        clearInterval(this.autoStart);
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            let left = parseInt(this.room.style.left);
            if (target.index > this.imgIndex) {
                if (left > -this.slideWidth * (target.index - 1)) {
                    this.room.style.left = `${parseInt(this.room.style.left)+this.speed*(target.index-this.imgIndex)}px`;

                } else {
                    clearInterval(this.timer);
                    this.room.style.left = `${-(this.slideWidth)*(target.index-1)}px`;
                    this.navButtonStyle(target);
                }
            } else if (target.index < this.imgIndex) {
                if (left < -this.slideWidth * (target.index - 1)) {
                    this.room.style.left = `${parseInt(this.room.style.left) - this.speed * (this.imgIndex - target.index)}px`;
                } else {
                    clearInterval(this.timer);
                    this.room.style.left = `${(-this.slideWidth) * (target.index - 1)}px`;
                    this.navButtonStyle(target);

                }
            } else {
                return false;
            }
        }, 16.7);
        this.autoStart = setInterval(() => {
            this.nextItem()
        }, this.timeOut);
    }
    //导航圆点点击事件
    Slide.prototype.navButtonStyle = function (target) {
        target.style.background = '#333';
        this.navButtons[this.imgIndex - 1].style.background = '#fff';
        this.imgIndex = target.index;
    }
    //手指触摸起始触发函数
    Slide.prototype.touchstart = function (e = window.event) {
        this.startPoint = e.touches[0];
    }
    //手指触摸结束触发函数
    Slide.prototype.touchend = function (e = window.event) {
        let endPoint = e.changedTouches[0];
        let x = endPoint.clientX - this.startPoint.clientX;
        let y = endPoint.clientY - this.startPoint.clientY;
        if (Math.abs(x) > this.d) {
            if (x < 0) {
                this.nextItem();
            } else {
                this.lastItem();
            }
        }
    }
    this.Slide = Slide;
})();