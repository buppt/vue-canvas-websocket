<template>
  <div class="hello">
    <canvas id="showing" width="350" height="350"></canvas>
	
	<button @click="clearDraw()">clear</button>
	<p>{{x}},{{y}}</p>
  </div>
</template>

<script>

export default {
  name: 'ShowBoard',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
	  x: 1,
	  y: 1,
	  draw: ''
    }
  },
  mounted: function(){
	const ws = new WebSocket('ws://localhost:3000');
	const canvas = document.getElementById('showing')
	const ctx = canvas.getContext('2d')
	let isDraw = 1
	ws.onmessage = (message)=>{
		console.log(message)
		ctx.strokeStyle = "#000"
		let msg = message.data.split(',')
		console.log(msg[0])
		if(isDraw==1&&message.data!='stop'){
			ctx.beginPath()
			ctx.moveTo(msg[0],msg[1])
			isDraw=0
		}else if(isDraw==0&&message.data=='stop'){
			isDraw=1
		}
		ctx.lineTo(msg[2],msg[3])
		ctx.stroke()
	}
  },
  methods:{
	clearDraw:function(){
		this.draw.clearCanvas();
	}
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#showing { border: 1px solid black; }
</style>
