<template>
  <div>
    <canvas id="drawBoard" width="650" height="400"></canvas>
	<br/>
	<div class="guassWord">要画的词是：{{guassWord}}</div>
	<button class="clearButton" @click="clearDraw()">clear</button>
	<div class="clear"></div>
  </div>
</template>

<script>

export default {
  name: 'DrawBoard',
  data () {
    return {
		//guassWord: 'pig',
		draw: null,
    }
  },
  mounted: function(){
		this.draw = new canvasDraw("drawBoard",this.$store.state.wsStore.ws);
		this.draw.draw();
  },
  computed:{
	  guassWord(){
		  return this.$store.state.beginGame.drawWord;
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
/* #drawBoard { 
	border: 1px solid black; 
} */
.guassWord{
	float: left;
	margin-left: 20px;
}
.clearButton{
	margin-right: 20px;
	float: right;
}
.clear{
	clear:both;
}
</style>
