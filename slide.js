;
(function () {
    let Slide = function (
        slideId = 'slide',
        timeOut = 3000,
        speed = 0.1
    ) {
        this.slide = document.querySelector('#slide'); //获取视窗层
        this.room = this.slide.querySelector('div'); //获取内容层
        this.imgs = this.slide.querySelectorAll('.slide-item'); //轮播图元素组
        this.slideWidth = parseInt(getComputedStyle(this.slide).width); //视窗层高度
        this.slideHeight = parseInt(getComputedStyle(this.slide).height); //视窗层宽度
        this.imgs.forEach((el) => {
            el.style.height = `${this.slideHeight}px`;
            el.style.width = `${this.slideWidth}px`;
        }); //使图片的宽度跟视窗层一样
        this.navButtons = null; //获取到所有的导航圆点
        this.timer = null; //定时器
        this.imgIndex = 1; //当前轮播图片index
        this.prev = null; //上一个
        this.next = null; //下一个
        this.speed = -(this.slideWidth / 10 * speed); //动画速度
        this.resetAll(); //初始化设置
        this.resetCss();//初始化css样式
        this.autoStart = setInterval(() => {
            this.nextItem()
        }, timeOut);
        for (let i = 0; i < this.navButtons.length; i++) {
            this.navButtons[i].onclick = this.navButtonClick.bind(this);
        }
    }
    //初始化样式
    Slide.prototype.resetCss = function () {
        let styleEle = document.createElement('style'); //创建style标签
        let navLeft = this.slideWidth / 2 - this.imgs.length*9;
        let navTop = this.slideHeight / 40;
        console.log(navLeft, document.querySelector('#nav').clientWidth);
        styleEle.innerHTML += '.slide{position:relative;overflow:hidden;font-size:0}'; //舒适化slide视窗的样式
        styleEle.innerHTML += '.slide .room{position:absolute}'; //初始化room内容层的样式
        styleEle.innerHTML += '.slide .slide-item{display:inline-block}'; //初始化room下class为slide-item 的元素
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
    Slide.prototype.nextItem = function () {
        clearInterval(this.timer);
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
                    this.navButtons[0].style.background = '#333';
                }
            }
        }, 16.7);

    }
    Slide.prototype.navButtonClick = function ({
        target
    }) {
        clearInterval(this.timer);
        console.log(target);
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
    }
    Slide.prototype.navButtonStyle = function (target) {
        target.style.background = '#333';
        this.navButtons[this.imgIndex - 1].style.background = '#fff';
        this.imgIndex = target.index;
    }
    this.Slide = Slide;
})();