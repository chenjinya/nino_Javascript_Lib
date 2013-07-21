/*!
 * Nino JavaScript Library v0.4
 * 
 *
 * Copyright 2013, Jinya Chen
 * 2013/7/18
 *verson name is Nino
 */

/*
 *function O()
 *获取O对象，或者将dom对象转化为O对象
 *Add in 2013/6/11
 *Update in 2013/7/17
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
	obj.fade=Nino.fade;
	obj.slide=Nino.slide;
	obj.cssStyle =Nino.cssStyle;
	obj.animate = Nino.animate;
	obj.drag = Nino.drag;
	obj.removeDrag=Nino.removeDrag;
	obj.addListener = Nino.addListener;
	obj.removeListener = Nino.removeListener;
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




var Nino = {
	/*
	 *Global Variable
	 *
	 */
	/*used in showWindow*/
	windowCount:0,
	windowId:0,
	/*used in mouseCoordinate*/
	mouseX:0,
	mouseY:0,
	/*used in direct*/
	mouseXDisplacement:0,
	mouseYDisplacement:0,
	
	/*
	 *function cssStyle(_style,_type)
	 *@_style CSS 名称，第二个字母大写
	 *@_type 默认返回优先级最高，为1时，返回window的数值
	 *Add in 2013/7/8
	 *Last update in 2013/7/8
	 */

	cssStyle : function(_style,_type){
		var obj = this.dom;
		
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

	},
	/*
	 *function addListener(_event,_func,_obj)
	 *Use: O.addListener(eventname,functionname) or addListener(eventname,functionname,domObject);
	 *add Event Listener
	 *Add in 2013/7/9
	 *Update in 2013/7/17
	 */
	addListener : function(_event,_func,_obj){
		var obj =this;
		if(isO(obj))
				{obj = obj.dom;}
		if(_obj)
		{
			if(isO(_obj))
				{obj = _obj.dom;}
			else {obj = _obj;}
		}
		if(obj.attachEvent)
		{
			obj.attachEvent("on"+_event,_func);
		}else
		{
			obj.addEventListener(_event,_func);
		}
		
	},
	removeListener : function(_event,_func,_obj){
		var obj =this;
		if(isO(obj))
				{obj = obj.dom;}
		if(_obj)
		{
			if(isO(_obj))
				{obj = _obj.dom;}
			else {obj = _obj;}
		}
		if(obj.attachEvent)
		{
			obj.detachEvent("on"+_event,eval(_func));
		}else
		{
			obj.removeEventListener(_event,_func);
		}
		
	},
	/*
	 *function getEvent()
	 *Use: O.addListener(eventname,functionname) or addListener(eventname,functionname,domObject);
	 *add Event Listener
	 *Add in 2013/7/9
	 */
	getEvent : function(event){

		event = event ? event :window.event;
		return event;
	},
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
	fade:function(_start,_end,_speed,_display,_func){
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
		_speed  = _speed  >10000||_speed <100 ? 100:_speed ;
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
	},

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
	slide:function(_show,_style,_speed,_display,_func){
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
		var obj=this;//获取Object
		var display =_display
		var speed = _speed /100;
		var interval=null;
		var show = _show;
		var func = _func==undefined ? function(){}: _func;
		var o_width =obj.cssStyle("width");
		var o_height = obj.cssStyle("height");
		
		obj.dom.style.width=o_width;
		obj.dom.style.height=o_height;
		var o_width = parseFloat(o_width.substring(0,o_width.indexOf('px')));
		var o_height = parseFloat(o_height.substring(0,o_height.indexOf('px')));
		
		obj.dom.setAttribute('oldWidth',o_width);
		obj.dom.setAttribute('oldHeight',o_height);
		var GO = function (){
			obj.dom.style.display="block";
			if(show==1)
			{
				obj.dom.style.width="0px";
				obj.dom.style.height="0px";	
			}
			interval = setInterval(function (){
			   var l_width = parseFloat(obj.cssStyle("width").substring(0,obj.cssStyle("width").indexOf('px')));
				var l_height = parseFloat(obj.cssStyle("height").substring(0,obj.cssStyle("height").indexOf('px')));
				if(show==0){
					switch(_style)
					{
						case 0:
						{
							obj.dom.style.width = parseFloat(l_width)-speed+"px";
							break;
						}
						case 1:
						{
							
							obj.dom.style.height = parseFloat(l_height)-speed+"px";
							break;
						}
						case 2:
						{
							obj.dom.style.width = Math.floor(parseFloat(l_width)-speed)+"px";
							obj.dom.style.height = Math.floor(parseFloat(l_height)-speed)+"px";
							break;
						}
					}
					if(l_height<=0 &&l_width<=0 )
					{
						clearInterval(interval);
						if(display==false)
							{obj.dom.style.display="none";}
						
						func.call();
					}
				}
				else if(show==1){
					switch(_style)
					{
						case 0:
						{
							obj.dom.style.height=o_height+"px";
							obj.dom.style.width = (parseFloat(l_width)+speed)+"px";
							break;
						}
						case 1:
						{
							obj.dom.style.width=o_width+"px";
							obj.dom.style.height = (parseFloat(l_height)+speed)+"px";
							break;
						}
						case 2:
						{
							obj.dom.style.width=(parseFloat(l_width)+speed)+"px";
							obj.dom.style.height=(parseFloat(l_height)+speed)+"px";
							break;
						}
					}
					if(l_width>=o_width&&l_height>=o_height){
						obj.dom.style.display="block"; 
						obj.dom.style.width=o_width+"px";
						obj.dom.style.height=o_height+"px";
						clearInterval(interval);
						
						func.call();
						
					}
				}
			},40);
		};
		GO();
	},


	/*
	 *function animate()
	 *@_style CSS style name 
	 *@_value CSS style value
	 *@_fun  affter animate call function
	 *Add in 2013/7/9
	 */
	animate : function(_style,_value,_speed,_func){
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
	},

	/*
	 *function drag()
	 *@_fun  affter animate call function
	 *affter animate call function,W3C support well
	 *Add in 2013/7/9
	 */
	drag : function(_func1,_func2,_func3,event){
		
		var obj =this;
		
		var o_x =obj.dom.offsetLeft;
		var o_y =obj.dom.offsetTop;
		var o_z =obj.dom.style.zIndex;
		
		var o_m_x =0;
		var o_m_y=0;
		var moused =false;
		var func1 =typeof _func1!="function" ? function(){}: _func1;
		var func2 =typeof _func2!="function" ? function(){}: _func2;
		var func3 =typeof _func3!="function" ? function(){}: _func3;
		obj.dom.style.cursor="move";
		var m = function(){
		
			var x =Nino.mouseX;
			var y =Nino.mouseY;
			
			obj.dom.style.top =o_y+y-o_m_y+"px";
			obj.dom.style.left =o_x+x-o_m_x+"px";
		}
		
		var md =function(){ 
			o_x =obj.dom.offsetLeft;
			o_y =obj.dom.offsetTop;
			o_m_x =Nino.mouseX;
			o_m_y =Nino.mouseY;
			moused =true;
			obj.dom.style.zIndex=9999;
			func1.call();
			};
		var mm =function(){ 
					if(moused==true){
						m();
						func2.call();
					}
					
				};
		var mu =function(){ 
					if(moused==true){
						m();
					}
					obj.dom.style.zIndex=o_z;
					moused =false;
					func3.call();
				}
		obj.addListener("mousedown",md);
		obj.addListener("mousemove",mm);
		obj.addListener("mouseup",mu);
	},
	removeDrag : function(_func1,_func2,_func3,event){
		
		var obj =this;
		var o_x =obj.dom.offsetLeft;
		var o_y =obj.dom.offsetTop;
		var o_z =obj.dom.style.zIndex;
		var o_m_x =0;
		var o_m_y=0;
		var moused =false;
		var func1 =typeof _func1!="function" ? function(){}: _func1;
		var func2 =typeof _func2!="function" ? function(){}: _func2;
		obj.dom.style.cursor="move";
		var m = function(){
		
			var x =Nino.mouseX;
			var y =Nino.mouseY;
			obj.dom.style.top =o_y+y-o_m_y+"px";
			obj.dom.style.left =o_x+x-o_m_x+"px";
		}
		
		var md =function(){ 
			o_x =obj.dom.offsetLeft;
			o_y =obj.dom.offsetTop;
			o_m_x =Nino.mouseX;
			o_m_y =Nino.mouseY;
			moused =true;
			obj.dom.style.zIndex=9999;
			func1.call();
			};
		var mm =function(){ 
					if(moused==true){
						m();
						func2.call();
					}
				};
		var mu =function(){ 
					if(moused==true){
						m();
					}
					obj.dom.style.zIndex=o_z;
					moused =false;
					func3.call();
				}
		obj.removeListener("mousedown",md);
		obj.removeListener("mousemove",mm);
		obj.removeListener("mouseup",mu);
	},
	/*
	*function randColor(_start,_end)
	*@_start color begin in 16
	*@_end color end in 16
	*@return #NNNNNN rand color format
	*Add in 2013/7/8
	*/
	randColor :function(_start,_end){
		var start=0;
		var end =0;
		var length=0;
		if(!_start)
		{
			start =0;
		}
		else 
		{
			start =parseInt(_start);
		}
		if(!_end)
		{
			end =16;
		}
		else 
		{
			end =parseInt(_end );
		}
		if(start>end)
		{
			return null;
		}
		length =parseInt(end) - parseInt(start)-1;
		
		var vv=[0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
		var v =new Array();
		for(var i=start; i<=end; i++){
			v.push(vv[i]);
		}
		return "#"+v[Math.ceil(Math.random()*length%length)]+v[Math.ceil(Math.random()*length%length)]+v[Math.ceil(Math.random()*length%length)]+v[Math.ceil(Math.random()*length%length)]+v[Math.ceil(Math.random()*length%length)]+v[Math.ceil(Math.random()*length%length)];
	},

	/*
	 *function debug()
	 *Show a debug window 
	 *Add in 2013/7/8
	 */
	debug :function debug(){
		if(arguments.length==0)
		return;
		var d;
		var p = document.createElement("p");
		var pp;
		var ml = document.createElement("p");
		ml.style.margin="4px";
		ml.style.fontFamily="Arial";
		ml.style.fontSize="12px";
		ml.style.color="#888";
		ml.innerHTML = "X:"+Nino.mouseX+" Y:"+Nino.mouseY;
		p.appendChild(ml);
		for(var i in arguments){
			var a = document.createElement("a");
			a.style.margin="4px";
			a.style.fontFamily="Arial";
			a.style.color="#000";
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
			d.style.zIndex="99999";
			d.style.right="0";
			d.style.top="0";
			d.style.overflow="scroll";
			var h2 = document.createElement("h2");
			var h3 = document.createElement("h4");
			h2.innerHTML="DEBUG";
			h2.style.color="#AAA";
			h2.style.fontFamily="Arial";
			h3.innerHTML="<a onclick=\"javascript:document.getElementById('DEBUG').style.display='none';\">[Close]</a>";
			h3.style.color="#666";
			h3.style.fontFamily="Arial";
			d.appendChild(h2);
			d.appendChild(h3);
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
		d.style.display="block";
		d.style.opacity=0.8;
		p.setAttribute("id","debug_p");
		O(d).drag();
	},
	
	
	/*
	 *function tip(_content,_obj)
	 *Show a kindly tip,below _obj
	 *Add in 2013/7/8
	 *Update in 2013/7/17
	 */
	tip :function(_content,_obj){
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
		p.addListener("click",function(){ p.fade(1,0,1000,false);})
	},
	
	
	/*
	 *function ajax()
	 *@_method Post or get
	 *@_url  url address
	 *@_fun  's first variable is ajax return data
	 *Add in 2013/7/8
	 */
	ajax :function(_method,_url,_func){
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
	},
	/*
	 *function mouseCoordinate()
	 *return mouse x and y 
	 *Add in 2013/7/9
	 */
	mouseCoordinate:function(event){
		var x =event.x? event.x:event.clientX;
		var y =event.y ? event.y:event.clientY;
		Nino.mouseX = x;
		Nino.mouseY = y;
		
		return {"x":x,"y":y};

	},
	
	/*
	 *function showAlert(_content,_width,_height,_color)
	 *@_content the content of Alert
	 *@_width the Alert's width
	 *@_height the Alert's height
	 *@_color the Alert's background color
	 *Add in 2013/7/10
	 */
	showAlert : function(_content,_width,_height,_color){

		if(arguments.length==0)
		return;
		var w="200px";
		var h="auto";
		if(_width)
		{
			w =_width;
		}
		var d;
		var div_tmp = document.createElement("div");
		var body_tmp = document.getElementsByTagName("body")[0];
		body_tmp.appendChild(div_tmp);
		div_tmp.innerHTML = _content;
		div_tmp =O(div_tmp);
		h = div_tmp.cssStyle("height",1);
		if(_height)
		{
			h =_height;
		}
		div_tmp.dom.style.width =w;
		div_tmp.dom.style.height =h;
		div_tmp.dom.style.textAlign ="center";
		div_tmp.dom.style.position="fixed";
		div_tmp.dom.style.zIndex="999";
		div_tmp.dom.style.border="4px solid #EEE";
		
		div_tmp.dom.style.background=_color? _color:Nino.randColor();
		div_tmp.dom.style.top =window.screen.availHeight/2-50-h.substring(0,h.indexOf("px"))/2+"px";
		div_tmp.dom.style.left=window.screen.availWidth/2- w.substring(0,w.indexOf("px"))/2+"px";
		
		div_tmp.fade(0,1,1000);
		setTimeout(function(){
			div_tmp.fade(1,0,1000,false);
		},3000);
		return div_tmp;
	},
	
	/*
	 *function showWindow(_content,_width,_height,_color)
	 *@_content the content of window
	 *@_width the window's width
	 *@_height the window's height
	 #@_color the window's background color
	 *show a window 
	 *Add in 2013/7/10
	 *last Update in 2013/7/11
	 */
	showWindow : function(_content,_width,_height,_color){
		var windowCount=0;
		if(arguments.length==0)
		return;
		var w="500px";
		var h="400px";
		if(_width)
		{
			w =_width;
		}
		var d;
		var div_tmp = document.createElement("div");
		var div_header_tmp = document.createElement("div");
		var div_content_tmp = document.createElement("div");
		var body_tmp = document.getElementsByTagName("body")[0];
		//var date = new Date();
		var seed = Nino.windowId;
		Nino.windowId++;
		div_header_tmp.innerHTML = "[<a id='smaller_window"+seed+"' style=' color:#666; cursor:pointer;'>Small</a>][<a id='larger_window"+seed+"' style=' color:#666;cursor:pointer;'>Full</a>][<a id='close_window"+seed+"' style=' color:#666;cursor:pointer;'>Close</a>]";
		div_header_tmp.style.textAlign="right";
		div_tmp.appendChild(div_header_tmp);
		div_tmp.appendChild(div_content_tmp);
		body_tmp.appendChild(div_tmp);
		
		div_content_tmp.innerHTML = _content;
		div_tmp =O(div_tmp);
		h = div_tmp.cssStyle("height",1);
		if(_height)
		{
			h =_height;
		}
		div_tmp.dom.style.width =w;
		div_tmp.dom.style.height =h;
		div_tmp.dom.style.textAlign ="center";
		div_tmp.dom.style.position="fixed";
		div_tmp.dom.style.zIndex="999";
		div_tmp.dom.style.border="4px solid #EEE";
		
		div_tmp.dom.style.background=_color? _color:Nino.randColor();
		div_tmp.dom.style.top =window.screen.availHeight/2-50-h.substring(0,h.indexOf("px"))/2+"px";
		div_tmp.dom.style.left=window.screen.availWidth/2- w.substring(0,w.indexOf("px"))/2+"px";
		var l =O("larger_window"+seed);
		div_tmp.dom.setAttribute("o_w_mark","1");
		//div_tmp.dom.setAttribute("window_left",Nino.windowCount);
		var small = function(){
			var nino_small_windows=document.getElementById("nino_small_windows");
			if(!nino_small_windows)
			{
				nino_small_windows = document.createElement("div");
				nino_small_windows.setAttribute("id","nino_small_windows");
				nino_small_windows.style.width="100%";
				nino_small_windows.style.height="40px";
				nino_small_windows.style.position="fixed";
				nino_small_windows.style.left="0";
				nino_small_windows.style.bottom="0";
				document.getElementsByTagName("body")[0].appendChild(nino_small_windows);
			}
			div_tmp.dom.style.position="static";
			div_tmp.dom.style.bottom="0";
			div_tmp.dom.style.height="40px";
			div_tmp.dom.style.width="250px";
			div_tmp.dom.style.float="left";
			div_tmp.dom.style.left=Nino.windowCount*250+"px";
			l.dom.innerHTML="Back";
			var div_tmp_1 = div_tmp;
			div_tmp.dom.remove();
			nino_small_windows.appendChild(div_tmp_1.dom);
			div_tmp= div_tmp_1;
			Nino.windowCount++;
		}
		var full =function(){
			var div_tmp_1 = div_tmp;
			div_tmp.dom.remove();
			div_tmp_1.dom.style.position="fixed";
			div_tmp_1.dom.style.float="";
			body_tmp.appendChild(div_tmp_1.dom);
			div_tmp= div_tmp_1;
			
			div_tmp.dom.style.top="0";
			div_tmp.dom.style.left="0";
			div_tmp.dom.style.height=window.screen.availHeight+"px";
			div_tmp.dom.style.width= document.body.clientWidth+"px";
			div_tmp.dom.setAttribute("o_w_mark","2");
			l.dom.innerHTML="Original";
			//nino_small_windows.appendChild(div_tmp.dom);
		}
		var original = function(){
			var div_tmp_1 = div_tmp;
			div_tmp.dom.remove();
			div_tmp_1.dom.style.position="fixed";
			div_tmp_1.dom.style.float="";
			body_tmp.appendChild(div_tmp_1.dom);
			div_tmp= div_tmp_1;
			
			div_tmp.dom.style.top =window.screen.availHeight/2-50-h.substring(0,h.indexOf("px"))/2+"px";
			div_tmp.dom.style.left=window.screen.availWidth/2- w.substring(0,w.indexOf("px"))/2+"px";
			div_tmp.dom.style.width =w;
			div_tmp.dom.style.height =h;
			div_tmp.dom.setAttribute("o_w_mark","1");
			l.dom.innerHTML="Full";
		}
		O("smaller_window"+seed).addListener("click",function(){
			small();
		});
		O("larger_window"+seed).addListener("click",function(){
			if(l.dom.innerHTML=="Full"){ full(); }
			else if(l.dom.innerHTML=="Original"){ original(); }
			else if(l.dom.innerHTML=="Back"){
				Nino.windowCount--;
				if(div_tmp.dom.getAttribute("o_w_mark")==1){ original(); }
				else if(div_tmp.dom.getAttribute("o_w_mark")==2){ full(); }
			}
		});
		O("close_window"+seed).addListener("click",function(){
			div_tmp.fade(1,0,2000,false);
			
		});
		div_tmp.addListener("dblclick",function(){
			if(div_tmp.dom.getAttribute("o_w_mark")==1){full();  }
			else if(div_tmp.dom.getAttribute("o_w_mark")==2){  original();}
		});
		div_tmp.fade(0,1,1000);
		div_tmp.drag();
		return div_tmp;
	},
	/*
	 *function direct
	 *change global variable Nino.mouseXDisplacement Nino.mouseYDisplacement
	 *Add in 2013/7/18
	 */
	direct : function(){
		var o_x=0;
		var o_y=0;
		var go = function(){
			Nino.mouseXDisplacement= Nino.mouseX-o_x;
			Nino.mouseYDisplacement = Nino.mouseY-o_y;
			o_x = Nino.mouseX;
			o_y = Nino.mouseY;
		}
		var interval =setInterval(go,50);
	},
	init : function(){
		Nino.addListener("mousemove",Nino.mouseCoordinate,window.document);
	}
};
Nino.init();
