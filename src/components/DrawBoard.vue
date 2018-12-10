<template>
	<div>
  	<div class="drawBoard">
		<div class="canvasSetting">
			<label><input name="drawType" type="radio" value="画笔" v-model="drawType"/>画笔 </label> 
			<br/>
			<label><input name="drawType" type="radio" value="直线" v-model="drawType"/>直线 </label> 
			<br/>
			<label><input name="drawType" type="radio" value="矩形" v-model="drawType"/>矩形 </label> 
			<br/>
			<label><input name="drawType" type="radio" value="圆" v-model="drawType"/>圆 </label> 
			<br/>
			填充颜色：
			<input type="color" v-model="fillColor"/> 
			<br/>
			选择颜色：
			<input type="color" v-model="drawColor"/> 
			<br/>
			笔粗细
			<input type="range" v-model="drawLineWidth" min="1" max="10" />{{drawLineWidth}}
            <br/>
			线端点类型
			<select v-model="lineEndType">
				<option>默认</option>
				<option>半圆</option>
				<option>矩形</option>
			</select>
            <br/>
			矩形角类型
			<select v-model="lineNodeType">
				<option>默认</option>
				<option>半圆</option>
				<option>斜角</option>
			</select>

		</div>
		<canvas id="drawBoard" width="700" height="400"></canvas>
        <button class="clearButton" @click="clearDraw()">clear</button>
	</div>
	<br/>
	
  </div>
</template>

<script>

export default {
  name: 'DrawBoard',
  data () {
    return {
		//guassWord: 'pig',
		draw: null,
		drawColor: '#000000',
		fillColor:'#000000',
		drawLineWidth: 1,
		drawType: '画笔',
		lineEndType: '默认',
		lineNodeType: '默认',
    }
  },
  mounted: function(){
		this.draw = new canvasDraw("drawBoard",this.$store.state.wsStore.ws);
		this.draw.draw();
  },
  watch:{
	  drawColor(){
		  this.draw.changeColor(this.drawColor);
	  },
	  drawLineWidth(){
		  this.draw.changeLineWidth(this.drawLineWidth)
	  },
	  fillColor(){
		  this.draw.changeFillColor(this.fillColor)
	  },
	  drawType(){
		  if(this.drawType=='直线'){
			  this.draw.drawLine();
		  }else if(this.drawType=='矩形'){
			  this.draw.drawRect();
		  }else if(this.drawType=='圆'){
			  this.draw.drawRound();
		  }else{
			  this.draw.draw();
		  }
	  },
	  lineEndType(){
		  let lineEndType={
			  '默认': 'butt',
			  '半圆': 'round',
			  '矩形': 'square'
		  }
		  this.draw.changeLineEnd(lineEndType[this.lineEndType]);
	  },
	  lineNodeType(){
		  let lineNodeType={
			  '默认': 'miter',
			  '半圆': 'round',
			  '斜角': 'bevel'
		  }
		  this.draw.changeLineNode(lineNodeType[this.lineNodeType]);
	  }
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
	changeColor(color){
		this.ctx.strokeStyle = color;
	}
	changeLineWidth(lineWidth){
		this.ctx.lineWidth = lineWidth;
	}
	changeFillColor(color){
		this.ctx.fillStyle = color;
	}
	changeLineEnd(lineEndtype){
		this.ctx.lineCap = lineEndtype;
	}
	changeLineNode(lineNode){
		this.ctx.lineJoin = lineNode;
	}
	drawLine(){
		this.canvas.onmousedown=()=>{
			this.ctx.beginPath()
			this.path.beginX = event.pageX - this.stage_info.left
			this.path.beginY = event.pageY - this.stage_info.top
			this.ctx.moveTo(
				this.path.beginX,
				this.path.beginY
			)
		}
		this.canvas.onmouseup=()=>{
			this.path.endX = event.pageX - this.stage_info.left
			this.path.endY = event.pageY - this.stage_info.top
			this.ctx.lineTo(
				this.path.endX,
				this.path.endY
			)
			this.ctx.stroke();
		}
	}
	drawRect(){
		this.canvas.onmousedown=()=>{
			this.ctx.beginPath()
			this.path.beginX = event.pageX - this.stage_info.left
			this.path.beginY = event.pageY - this.stage_info.top
		}
		this.canvas.onmouseup=()=>{
			this.path.endX = event.pageX - this.stage_info.left
			this.path.endY = event.pageY - this.stage_info.top
			this.ctx.rect(this.path.beginX, this.path.beginY, this.path.endX-this.path.beginX, this.path.endY-this.path.beginY);
			this.ctx.fill();
			this.ctx.stroke();
		}
	}
	drawRound(){
		this.canvas.onmousedown=()=>{
			this.ctx.beginPath()
			this.path.beginX = event.pageX - this.stage_info.left
			this.path.beginY = event.pageY - this.stage_info.top
		}
		this.canvas.onmouseup=()=>{
			this.path.endX = event.pageX - this.stage_info.left
			this.path.endY = event.pageY - this.stage_info.top
			let width = this.path.endX-this.path.beginX;
			let height = this.path.endY-this.path.beginY;
			this.ctx.arc(this.path.beginX+width/2, this.path.beginY+height/2,Math.sqrt(width*width+height*height)/2,0, Math.PI *2);
			this.ctx.fill();
			this.ctx.stroke();
		}
	}
	draw(){
		let that = this
		this.canvas.onmousedown = () => {
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
		this.ws.send(`draw,${this.path.beginX},${this.path.beginY},${this.path.endX},${this.path.endY}`)

	}
	clearCanvas(){
		this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height); 
		this.ws.send('clear,')
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.drawBoard{
	text-align: center;
	margin-top: 10px;
    white-space: nowrap;
}
.canvasSetting{
    vertical-align:top;
    text-align: left;
	width: 150px;
    display: inline-block;
}
input[type="range"]{
	width: 45%;
}
#drawBoard { 
	border: 1px solid black; 
}
.guassWord{
	float: left;
	margin-left: 20px;
}
.clearButton{
	vertical-align: bottom;
}
.clear{
	clear:both;
}
</style>
