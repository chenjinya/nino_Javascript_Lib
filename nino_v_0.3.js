/*!
 * Nino JavaScript Library v0.2
 * 
 *
 * Copyright 2013, Jinya Chen
 * 2013/7/8
 *verson name is nino
 *note:
 optimization:
 1, O object for only O() object not all Object
 2,add randColor(),Debug(),Tip() functions
 
 */
/*
 *function O()
 *获取O对象，或者将dom对象转化为O对象
 *Add in 2013/6/11
 *Update in 2013/7/8
 */

var O = function(_id){
	var obj = new Object();
	var body;
	if(typeof(_id)=="object")
	{
		if(_id.verson!="nino")
			{body =_id;}
	}
	else{
		body = document.getElementById(_id);
	}
	
	obj.version="nino";
	obj.dom = body;
	obj.fade=fade;
	obj.slide=slide;
	obj.cssStyle =cssStyle;
	obj.animate = animate;
	return obj;
	
}

/*
 *function isO=(_obj)
 *@_obj 对象名，判断是否为库对象
 *Add in 2013/7/8
 *Last update in 2013/7/8
 */
var isO=function(_obj){
	if(_obj.version=="nino")
		return true;
	else 
		return false;

}
/*
 *function cssStyle(_style,_type)
 *@_style CSS 名称，第二个字母大写
 *@_type 默认返回优先级最高，为1时，返回window的数值
 *Add in 2013/7/8
 *Last update in 2013/7/8
 */

var cssStyle = function(_style,_type){
	var obj = this.dom;
	var cssStyle;
	var variable =eval("obj.style."+_style);
	if(_type==undefined)
		_type=0;
	if(_type==0&&variable)
	{
		return variable;
	}
	else if(obj.currentStyle)
	{
		return obj.currentStyle[_style];
	}
	else{
		return window.getComputedStyle(obj, null)[_style];
	}

}
/*
 *function fade(_start,_end,_speed,_display,_func)
 *@_start 起始opacity [0,1]
 *@_end 	 结束opacity [0,1]
 *@_speed  速度 [100,1000]
 *@_display 结束opacity = 0时有效，display=false 是结束元素消失
 *@_func 回调函数
 *Add in 2013/6/11
 *Last update in 2013/7/8
 */
var fade=function(_start,_end,_speed,_display,_func){
	if(arguments[0]==undefined)
	{
		_start =1;
		if(arguments[1]==undefined){
			_end=0;
			if(arguments[2]==undefined){
				_speed=1000;
				if(arguments[3]==undefined){
					_display=false;
					if(arguments[4]==undefined)
					{	
						_func=function(){ };
					}
				}
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
	var obj=this.dom;//获取Object
	var display =_display
	var speed = _speed /10000;
	var interval=null;
	var func = _func==undefined ? function(){}: _func;
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
						{
							obj.style.display="none";
						
						}
				}
				else if(obj.style.opacity>=0)
				{ 
					obj.style.display="block"; 
				}
				clearInterval(interval);
				func.call();
				
			}
		},60);
	};
	GO();
}

/*
 *function slide(_show,_style,_speed,_display,_func)
 *@_show 0:隐藏，1:显示
 *@_style 向上还是向左顶点 0,1,2,3
 *@_speed  速度 [100,1000]
 *@_display 结束width 和height = 0时有效，display=false 是结束元素消失
 *@_func 回调函数
 *Add in 2013/6/11
 *Last update in 2013/7/8
 */
var slide=function(_show,_style,_speed,_display,_func){
	if(arguments[0]==undefined)
	{
		_show =1;
		if(arguments[1]==undefined){
				_style =1;
			if(arguments[2]==undefined){
				_speed=1000;
				if(arguments[3]==undefined){
					_display=false;
					if(arguments[4]==undefined)
						_func=function(){};
					}
				}
			}
		
	}
	_style= Math.floor(_style);
	_show= _show==1 ? 1:0;
	_style = _style<0 ? 0:_style;
	_speed  = _speed  >10000||_speed <100 ? 100:_speed ;

	var start=_style;
	var obj=this.dom;//获取Object
	var display =_display
	var speed = _speed /100;
	var interval=null;
	var show = _show;
	var func = _func==undefined ? function(){}: _func;
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
						{obj.style.display="none";}
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
					func.call();
					
				}
			}
		},40);
	};
	GO();
}

/*
*function randColor()
*@return #NNNNNN rand color format
*Add in 2013/7/8
*/
var randColor =function(){
	var v=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
	return "#"+v[Math.ceil(Math.random()*16%16)]+v[Math.ceil(Math.random()*16%16)]+v[Math.ceil(Math.random()*16%16)]+v[Math.ceil(Math.random()*16%16)]+v[Math.ceil(Math.random()*16%16)]+v[Math.ceil(Math.random()*16%16)];
}
/*
 *function debug()
 *Show a debug window 
 *Add in 2013/7/8
 */
var Debug = function debug(){
	if(arguments.length==0)
	return;
	var d;
	var p = document.createElement("p");
	var pp;
	for(var i in arguments){
		var a = document.createElement("a");
		a.style.margin="4px";
		a.style.fontFamily="Arial";
		a.style.color=randColor();
		a.innerHTML = i+"@"+arguments[i];
		p.appendChild(a);
	}
	if(!(d=document.getElementById("DEBUG")))
	{
		d = document.createElement("div");
		d.setAttribute("id","DEBUG");
		d.style.width="500px";
		d.style.height="300px";
		d.style.background="#EFE";
		d.style.position="fixed";
		d.style.right="0";
		d.style.top="0";
		d.style.overflow="scroll";
		var h2 = document.createElement("h2");
		h2.innerHTML="DEBUG";
		h2.style.color="#AAA";
		h2.style.fontFamily="Arial";
		d.appendChild(h2);
		document.getElementsByTagName("body")[0].appendChild(d);
	}
	if(!(pp=document.getElementById("debug_p")))
	{
		d.appendChild(p);
	}
	else{
		d.insertBefore(p,pp);
		pp.setAttribute("id","");
	}
	d.style.opacity=0.8;
	p.setAttribute("id","debug_p");
}

/*
 *function tip(_content,_obj)
 *Show a kindly tip,below _obj
 *Add in 2013/7/8
 */
var Tip = function(_content,_obj){
	if(isO(this))
	{
		_obj = this;
	}
	var p = document.createElement("p");
	p.style.background="#EEE";
	p.style.border="1px #666 solid";
	p.style.borderRadius="5px";
	p.style.padding="5px";
	p.style.margin="0px";
	p.style.fontFamily="Arial";
	p.innerHTML=_content;
	if(_obj.version=="nino")
		{_obj.dom.appendChild(p);}
	else 
		{_obj.appendChild(p);}
	p=O(p);
	p.fade(0,1,1000);
}
/*
 *function Ajax()
 *@_method Post or get
 *@_url  url address
 *@_fun  's first variable is ajax return data
 *Add in 2013/7/8
 */
var Ajax =function(_method,_url,_func){
	var data="";
	var func = _func==undefined ? function(){}: _func;
	var xmlHttp =false;
	try{
		xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
	}catch(e){
		try{
			xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		catch(e){
		xmlHttp = false;
		}
	}
	if(!xmlHttp && typeof XMLHttpRequest!='undefined')
	{
		xmlHttp =new XMLHttpRequest();
	}
	xmlHttp.open(_method,_url);
	xmlHttp.onreadystatechange=function(){
		if(xmlHttp.readyState== 4 && xmlHttp.status==200)
		{
			data = xmlHttp.responseText;
			func.call(this,data);
		}
	}
	xmlHttp.send(null);
	return data;
}
/*
 *function animate()
 *@_style CSS style name 
 *@_value CSS style value
 *@_fun  affter animate call function
 *Add in 2013/7/8
 */
var animate = function(_style,_value,_speed,_func){
	var obj = this;
	var speed = _speed/1000;
	var style_value = this.cssStyle(_style);
	var regExp ="px";
	var func = _func==undefined ? function(){}: _func;
	
	if(_value.indexOf("px")!=-1)
	{
		regExp ="px";
	}
	else if(_value.indexOf("%")!=-1)
	{
		regExp ="%";
	}
	var o_l = style_value.substring(0,style_value.indexOf(regExp));
	var o_l_l = _value.substring(0,_value.indexOf(regExp));
	var l =o_l;
	Debug(o_l,o_l_l,l);
	var obj_setInterval = setInterval(
		function(){
		
			if(o_l<=o_l_l)
			{
				l = parseFloat(l)+parseFloat(speed);
				obj.dom.style[_style]=l+regExp;
				if(l>=o_l_l)
				{
					obj.dom.style[_style]=_value;
					clearInterval(obj_setInterval);
					func.call();
				}
			}
			else{
				l = parseFloat(l)-parseFloat(speed);
				obj.dom.style[_style]=l+regExp;
				if(l<=o_l_l)
				{
					obj.dom.style[_style]=_value;
					clearInterval(obj_setInterval);
					func.call();
				}
			}
		}
	,40);


}