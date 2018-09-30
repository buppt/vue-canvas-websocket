# draw

<img src="./GIF.gif" />

## Build Setup

```
npm install

node app.js
//another terminal
npm run dev
```


## canvas+websocket+vue做一个你画我猜小游戏
你画我猜大家应该都玩过，一个人画，其他人猜。现在刚刚实现了最基本的功能，以后还会慢慢修改的。


先安装node的ws模块，然后使用node做一个简单的后端，作用就是接受websocket连接，将收到的一个用户发过来的数据发送给所有用户。

```javascript
// 导入WebSocket模块:
const WebSocket = require('ws');
// 引用Server类:
const WebSocketServer = WebSocket.Server;
// 实例化:
const wss = new WebSocketServer({
    port: 3000
});
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        wss.clients.forEach((client) => {
                client.send(message)
         })
		 
    })
});
```
后端写好了，前端先进行ws连接，然后将ws和msg传给后面的模块。
```javascript
this.ws = new WebSocket('ws://localhost:3000/');
this.ws.onmessage = (message)=>{
	console.log(message)
	this.msg = message.data.split(',')
}
```
前端分为画和猜两个模块，画的模块关键代码如下，我们构建了一个canvasDraw类，检测鼠标的down、up和move事件，进行画图，并且将此时鼠标的坐标发送给服务器。
```javascript
<canvas id="drawBoard" width="350" height="350"></canvas>
<button @click="clearDraw()">clear</button>
export default {
  mounted: function(){
		this.draw = new canvasDraw("drawBoard",this.ws);
		this.draw.draw();
  },
  methods:{
		clearDraw:function(){
			this.draw.clearCanvas();
		}
  }
}
class canvasDraw{
	constructor(id,ws){
		this.ws= ws;
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext('2d');
		this.stage_info = this.canvas.getBoundingClientRect()
		this.path = {
			beginX: 0,
			beginY: 0,
			endX: 0,
			endY: 0
		}
		this.isDraw=false
	}
	draw(){
		let that = this
		this.canvas.onmousedown = () => {
			that.ctx.strokeStyle = "#000"
			that.ctx.beginPath()
			that.path.beginX = event.pageX - that.stage_info.left
			that.path.beginY = event.pageY - that.stage_info.top
			that.ctx.moveTo(
				that.path.beginX,
				that.path.beginY
			)
			that.isDraw=true
		}
		this.canvas.onmousemove = () => {
			if(that.isDraw){
				that.drawing(event)
			}
		}
		this.canvas.onmouseup = () => {
			that.isDraw=false
			that.ws.send('stop,')
		}
	}
	drawing(e) {
		this.path.endX = e.pageX - this.stage_info.left
		this.path.endY = e.pageY - this.stage_info.top
		this.ctx.lineTo(
			this.path.endX,
			this.path.endY
		)
		this.ctx.stroke()
		this.ws.send("draw"+','+this.path.beginX+','+this.path.beginY+','+this.path.endX+','+this.path.endY)

	}
	clearCanvas(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); 
		this.ws.send('clear,')
	}
}
```
然后是接受部分，接受部分就把服务器发过来的坐标解析出来，安装顺序画在canvas上即可。关键代码如下。
```javascript
<canvas id="showing" width="350" height="350"></canvas>
export default {
	mounted: function(){
		this.canvas = document.getElementById('showing')
		this.ctx = this.canvas.getContext('2d')
		this.ctx.strokeStyle = "#000"
	},
	watch:{
		msg(newval,oldval){
			if(this.msg[0]=="draw"||this.msg[0]=="stop"){
				if(this.isDraw==1&&this.msg[0]!='stop'){
					this.ctx.beginPath()
					this.ctx.moveTo(this.msg[1],this.msg[2])
					this.isDraw=0
				}else if(this.isDraw==0&&this.msg[0]=='stop'){
					this.isDraw=1
				}
				this.ctx.lineTo(this.msg[3],this.msg[4])
				this.ctx.stroke()
			}else if(this.msg[0]=='clear'){
				this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
			}
		}
	},
	methods:{
		clearDraw:function(){
			this.draw.clearCanvas();
		}
	}
}
```
最后是一个座位和打字的模块，比较简单，看一下源码就懂了，以后还会慢慢修改的。
