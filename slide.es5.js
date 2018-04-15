
'use strict';

;
(function () {
    var Slide = function Slide() {
        var slideId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'slide';

        var _this = this;

        var timeOut = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
        var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.1;

        this.slide = document.querySelector('#slide'); //获取视窗层
        this.room = this.slide.querySelector('div'); //获取内容层
        this.imgs = this.slide.querySelectorAll('.slide-item'); //轮播图元素组
        this.slideWidth = parseInt(getComputedStyle(this.slide).width); //视窗层高度
        this.slideHeight = parseInt(getComputedStyle(this.slide).height); //视窗层宽度
        this.imgs.forEach(function (el) {
            el.style.height = _this.slideHeight + 'px';
            el.style.width = _this.slideWidth + 'px';
        }); //使图片的宽度跟视窗层一样
        this.navButtons = null; //获取到所有的导航圆点
        this.timer = null; //定时器
        this.imgIndex = 1; //当前轮播图片index
        this.prev = null; //上一个
        this.next = null; //下一个
        this.speed = -(this.slideWidth / 10 * speed); //动画速度
        this.resetAll(); //初始化设置
        this.resetCss();
        this.autoStart = setInterval(function () {
            _this.nextItem();
        }, timeOut);
        for (var i = 0; i < this.navButtons.length; i++) {
            this.navButtons[i].onclick = this.navButtonClick.bind(this);
        }
    };
    //初始化样式
    Slide.prototype.resetCss = function () {
        var styleEle = document.createElement('style'); //创建style标签
        var navLeft = (this.slideWidth - parseInt(getComputedStyle(this.slide.querySelector('#nav')).width)) / 2;
        var navTop = this.slideHeight / 40;
        styleEle.innerHTML += '.slide{position:relative;overflow:hidden;font-size:0}'; //舒适化slide视窗的样式
        styleEle.innerHTML += '.slide .room{position:absolute}'; //初始化room内容层的样式
        styleEle.innerHTML += '.slide .slide-item{display:inline-block}'; //初始化room下class为slide-item 的元素
        styleEle.innerHTML += '.slide .nav{padding:0 4px;list-style:none;position:absolute;font-size:0px;background:rgba(222,222,222,0.4);bottom:' + navTop + 'px;left:' + navLeft + 'px;text-align:center;-moz-border-radius:10px;border-radius:10px;}';
        styleEle.innerHTML += '.navButton{display:inline-block;margin:6px 4px;background:#fff;width:8px;height:8px;-moz-border-radius:8px;border-radius:8px;cursor:pointer;}';
        document.head.appendChild(styleEle); //插入标签
    };

    Slide.prototype.resetAll = function () {
        this.slide.setAttribute('class', 'slide'); //给slide元素增加class属性
        this.room.setAttribute('class', 'room'); //给room元素增加class属性
        this.room.style.left = '0px'; //设置room的初始距离
        this.room.style.width = this.slideWidth * this.imgs.length + 'px'; //设置内容层的宽度

        //创建导航圆点定位框
        var nav = document.createElement('ul');
        nav.id = 'nav';
        nav.setAttribute('class', 'nav');
        this.slide.appendChild(nav);

        for (var i = 0; i < this.imgs.length; i++) {
            var navButtonLi = document.createElement('li');
            navButtonLi.setAttribute('class', 'navButton');
            navButtonLi.index = i + 1;
            nav.appendChild(navButtonLi);
        }
        this.navButtons = this.slide.querySelectorAll('li'); //获取所有的li节点
        this.navButtons[0].style.background = '#333'; //初始化第一个圆点的颜色
    };
    Slide.prototype.nextItem = function () {
        var _this2 = this;

        clearInterval(this.timer);
        this.timer = setInterval(function () {
            var left = parseInt(_this2.room.style.left);
            if (_this2.imgIndex < _this2.imgs.length) {
                if (left > -_this2.slideWidth * _this2.imgIndex) {
                    _this2.room.style.left = parseInt(_this2.room.style.left) + _this2.speed + 'px';
                } else {
                    clearInterval(_this2.timer);
                    _this2.room.style.left = -_this2.slideWidth * _this2.imgIndex + 'px';
                    _this2.navButtons[_this2.imgIndex - 1].style.background = '#fff';
                    _this2.imgIndex++;
                    _this2.navButtons[_this2.imgIndex - 1].style.background = '#333';
                }
            } else {
                if (left < 0) {
                    _this2.room.style.left = parseInt(_this2.room.style.left) + -_this2.speed * 2 + 'px';
                } else {
                    clearInterval(_this2.timer);
                    _this2.room.left = '0';
                    _this2.navButtons[_this2.imgIndex - 1].style.background = '#fff';
                    _this2.imgIndex = 1;
                    _this2.navButtons[0].style.background = '#333';
                }
            }
        }, 16.7);
    };
    Slide.prototype.navButtonClick = function (_ref) {
        var _this3 = this;

        var target = _ref.target;

        clearInterval(this.timer);
        console.log(target);
        this.timer = setInterval(function () {
            var left = parseInt(_this3.room.style.left);
            if (target.index > _this3.imgIndex) {
                if (left > -_this3.slideWidth * (target.index - 1)) {
                    _this3.room.style.left = parseInt(_this3.room.style.left) + _this3.speed * (target.index - _this3.imgIndex) + 'px';
                } else {
                    clearInterval(_this3.timer);
                    _this3.room.style.left = -_this3.slideWidth * (target.index - 1) + 'px';
                    _this3.navButtonStyle(target);
                }
            } else if (target.index < _this3.imgIndex) {
                if (left < -_this3.slideWidth * (target.index - 1)) {
                    _this3.room.style.left = parseInt(_this3.room.style.left) - _this3.speed * (_this3.imgIndex - target.index) + 'px';
                } else {
                    clearInterval(_this3.timer);
                    _this3.room.style.left = -_this3.slideWidth * (target.index - 1) + 'px';
                    _this3.navButtonStyle(target);
                }
            } else {
                return false;
            }
        }, 16.7);
    };
    Slide.prototype.navButtonStyle = function (target) {
        target.style.background = '#333';
        this.navButtons[this.imgIndex - 1].style.background = '#fff';
        this.imgIndex = target.index;
    };
    this.Slide = Slide;
})();