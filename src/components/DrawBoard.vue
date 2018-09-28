<template>
  <div class="hello">
    <canvas id="tutorial" width="350" height="350"></canvas>
	<br/>
	<p class="guassWord">要猜的词是：pig</p>
	<button @click="clearDraw()">clear</button>

  </div>
</template>

<script>

export default {
  name: 'DrawBoard',
  props:['ws'],
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
	  x: 1,
	  y: 1,
	  draw: ''
    }
  },
  mounted: function(){
	this.draw = new canvasDraw("tutorial",this.ws);
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

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#tutorial { border: 1px solid black; }
.guassWord{
	float:left;
	margin: 0;
}
</style>
