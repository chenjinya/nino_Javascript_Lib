/*!
 * Nino JavaScript Library v0.0.2
 * 
 *
 * Copyright 2013, Jinya Chen
 * Dual licensed under the MIT or GPL Version 2 licenses.

 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed June 21 13:05:34 2013 -0001
 */
var O = function(id){
	Object.prototype.fade=fade;
	Object.prototype.slide=slide;
	var obj = document.getElementById(id);
	return (typeof(obj)!="object")||!obj ?  "Not Find (id=\""+id +"\")":obj ;
}
 
 /*
*@_start 起始opacity [0,1]
*@_end 	 结束opacity [0,1]
*@_speed  速度 [100,1000]
*@_display 结束opacity = 0时有效，display=false 是结束元素消失
*Focus on W3C Browser
*Written by EI Nino
*Email: jinyachen@gmail.com
*/
function fade(_start,_end,_speed,_display){
	if(arguments[0]==undefined)
	{
		_start =1;
		if(arguments[1]==undefined){
			_end=0;
			if(arguments[2]==undefined){
				_speed=1000;
				if(arguments[3]==undefined)
					_display=false;
			}
		}
	}
	_start = _start>1 ? 1:_start;
	_start = _start<0 ? 0:_start;
	_end = _end>1? 1:_end;
	_end = _end <0 ? 0 :_end;
	_speed  = _speed  >1000||_speed <100 ? 100:_speed ;
	var end =_end;
	var start=_start;
	var obj=this;//获取Object
	var display =_display
	var speed = _speed /10000;
	var interval=null;
	var GO = function (){
		obj.style.opacity=start;
		obj.style.display="block";
		interval = setInterval(function (){
			if(obj.style.opacity > end&&obj.style.opacity <=start&&start>end)
			{
				obj.style.opacity=parseFloat(obj.style.opacity)-speed;
				obj.style.opacity = Math.floor(obj.style.opacity*100)/100;
			}
			else if(obj.style.opacity < end&&obj.style.opacity>=start&&start<end)
			{ 
			
				obj.style.opacity=parseFloat(obj.style.opacity)+speed;
				obj.style.opacity = Math.ceil(obj.style.opacity*100)/100;
			}
			else 
			{ 
				if(obj.style.opacity<=0)
				{
					if(display==false)
						obj.style.display="none";
				}
				else if(obj.style.opacity>=0)
				{ 
					obj.style.display="block"; 
				}
				clearInterval(interval);
			}
		},60);
	};
	GO();
}

/*
*@_show 0:隐藏，1:显示
*@_style 向上还是向左顶点 0,1,2,3
*@_speed  速度 [100,1000]
*@_display 结束width 和height = 0时有效，display=false 是结束元素消失
*Focus on W3C Browser
*Written by EI Nino
*Email: jinyachen@gmail.com
*/
function slide(_show,_style,_speed,_display){
	if(arguments[0]==undefined)
	{
		_show =1;
		if(arguments[1]==undefined){
				_style =1;
			if(arguments[2]==undefined){
				_speed=1000;
				if(arguments[3]==undefined)
					_display=false;
			}
		}
	}
	_style= Math.floor(_style);
	_show= _show==1 ? 1:0;
	_style = _style<0 ? 0:_style;
	_speed  = _speed  >10000||_speed <100 ? 100:_speed ;

	var start=_style;
	var obj=this;//获取Object
	var display =_display
	var speed = _speed /100;
	var interval=null;
	var show = _show;
	
	var o_width = parseFloat(obj.style.width.substring(0,obj.style.width.indexOf('px')));
	var o_height = parseFloat(obj.style.height.substring(0,obj.style.height.indexOf('px')));
	obj.setAttribute('oldWidth',o_width);
	obj.setAttribute('oldHeight',o_height);
	var GO = function (){
		obj.style.display="block";
		if(show==1)
		{
			obj.style.width="0px";
			obj.style.height="0px";	
		}
		interval = setInterval(function (){
		   var l_width = parseFloat(obj.style.width.substring(0,obj.style.width.indexOf('px')));
			var l_height = parseFloat(obj.style.height.substring(0,obj.style.height.indexOf('px')));
			if(show==0){
				switch(_style)
				{
					case 0:
					{
						obj.style.width = parseFloat(l_width)-speed+"px";
						break;
					}
					case 1:
					{
						
						obj.style.height = parseFloat(l_height)-speed+"px";
						break;
					}
					case 2:
					{
						obj.style.width = Math.floor(parseFloat(l_width)-speed)+"px";
						obj.style.height = Math.floor(parseFloat(l_height)-speed)+"px";
						break;
					}
				}
				if(l_height<=0 &&l_width<=0 )
				{
					clearInterval(interval);
					if(display==false)
						{}
				}
			}
			else{
				switch(_style)
				{
					case 0:
					{
						obj.style.height=o_height+"px";
						obj.style.width = (parseFloat(l_width)+speed)+"px";
						break;
					}
					case 1:
					{
						obj.style.width=o_width+"px";
						obj.style.height = (parseFloat(l_height)+speed)+"px";
						break;
					}
					case 2:
					{
						obj.style.width=(parseFloat(l_width)+speed)+"px";
						obj.style.height=(parseFloat(l_height)+speed)+"px";
						break;
					}
				}
				if(l_width>=o_width&&l_height>=o_height){
					obj.style.display="block"; 
					obj.style.width=o_width+"px";
					obj.style.height=o_height+"px";
					clearInterval(interval);
					
				}
			}
		},40);
	};
	GO();
}

