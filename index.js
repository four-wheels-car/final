var wrap = document.querySelector(".wrap");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");
next.onclick = function () {
	next_pic();
}
prev.onclick = function () {
	prev_pic();
}
 
//手动播放：添加左右两个箭头用以控制图片的翻页
function next_pic () {
	index++;
	if(index > 4){
		index = 0;
	}
	showCurrentDot();
	var newLeft;
	if(wrap.style.left === "-3600px"){
		newLeft = -1200;
	}else{
		newLeft = parseInt(wrap.style.left)-600;
	}
	wrap.style.left = newLeft + "px";
}
function prev_pic () {
	index--;
	if(index < 0){
		index = 4;
	}
	showCurrentDot();
	var newLeft;
	if(wrap.style.left === "0px"){
		newLeft = -2400;
	}else{
		newLeft = parseInt(wrap.style.left)+600;
	}
	wrap.style.left = newLeft + "px";
}
 
//自动播放：设置一个定时器，创建一个可以自动播放的函数并调用
var timer = null;
function autoPlay () {
	timer = setInterval(function () {
		next_pic();
	},1800);
}
autoPlay();
 
//停止播放：停止调用函数
var container = document.querySelector(".container");
container.onmouseenter = function () {
	clearInterval(timer);
}
container.onmouseleave = function () {
	autoPlay();    
}
 
//实现图片下方小圆点的滚动
var index = 0;
var dots = document.getElementsByTagName("span");
function showCurrentDot () {
	for(var i = 0, len = dots.length; i < len; i++){
		dots[i].className = "";
	}
	dots[index].className = "on";
}
 
//点击小圆点可以跳转到对应的图片
for (var i = 0, len = dots.length; i < len; i++){
	(function(i){
		dots[i].onclick = function () {
			var dis = index - i;
			if(index == 4 && parseInt(wrap.style.left)!==-3000){
				dis = dis - 5;     
			}
			//和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可
			if(index == 0 && parseInt(wrap.style.left)!== -600){
				dis = 5 + dis;
			}
			wrap.style.left = (parseInt(wrap.style.left) +  dis * 600)+"px";
			index = i;
			showCurrentDot();
		}
	})(i);            
}
