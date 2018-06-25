# slide.js
原生js写的轮播兼容 pc+移动端 插件，支持轮播速度，轮播内容，轮播间隔，手势灵敏度自定义，导航圆点点击跳转,手势滑动。

 >  <a href='https://jgchenu.github.io/slide.js/' blank>Demo<a>
    
### 使用说明：slide.js文件包含小部分es6语法编写的文件，在移动端有兼容性问题，仅供于源码参考。移动端跟pc端开发引用js文件直接下载slide-es5.js进行引入使用。
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
    
   包裹元素下面需要跟随一个div，div下面是带有class属性为slide-item的任意元素
    
 js代码：
 
  需要先引入插件  
    <script src="./slid-es5.js"></script> <br/>
    <script>
         slide = new Slide('slide',3000,1,20);
    </script> <br/>
   //第一个参数是设置了轮播的包裹元素的id，是必须参数  <br/>
   //第二个参数是轮播间隔，非必须参数，默认为3000ms  <br/>
   //第三个参数是轮播速度, 非必须参数，默认为1，数值越大轮播速度越快<br/>
   //第四个参数是手指滑动灵敏度，非必须参数，默认为20，数值越大需要滑动触发的距离就越大<br/>


    
