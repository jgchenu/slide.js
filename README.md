# swiper.js
原生js写的swiper插件，支持轮播速度，轮播内容，轮播间隔自定义，以及导航圆点点击跳转,后续再增加手势滑动。

html代码

    <div id="slide" style="height:200px;width:300px;height:100px;border:1px solid #ccc">
        <div class="room">
            <img src="http://chenjianguang.com/static/callName/images/1.png" alt="" class="slide-item">
            <img src="http://chenjianguang.com/static/callName/images/2.png" alt="" class="slide-item">
            <img src="http://chenjianguang.com/static/callName/images/3.png" alt="" class="slide-item">
            <img src="http://chenjianguang.com/static/callName/images/4.png" alt="" class="slide-item">
            <img src="http://chenjianguang.com/static/callName/images/5.png" alt="" class="slide-item"> 
        </div>
    </div>

   必须需要设置：包裹元素的id，以及高度跟宽度
    
   包裹元素下面需要跟随一个div，div下面可以是自定义的带有class属性为slide-item的任意元素
    
 js代码：
 
  需要先引入插件  
    <script src="./slide.js"></script> <br/>
    <script>
        let slide = new Slide('slide', 3000,1);
    </script> <br/>
   //第一个参数是设置了轮播的包裹元素的id，是必须参数  <br/>
   //第二个参数是轮播间隔，非必须参数，默认为3000ms  <br/>
   //第三个参数是轮播速度, 非必须参数，默认为1，数值越大轮播速度越快<br/>
   
   <a href='http://chenjianguang.com/slide/'>Demo<a>

    
