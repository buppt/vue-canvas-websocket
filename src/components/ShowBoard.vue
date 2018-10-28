<template>
  <div>
    <canvas id="showing" width="650" height="400"></canvas>
  </div>
</template>

<script>

export default {
	name: 'ShowBoard',
	data () {
		return {
			canvas: '',
			ctx:'',
			draw: '',
			isDraw :1,
		}
	},
	mounted: function(){
		this.canvas = document.getElementById('showing')
		this.ctx = this.canvas.getContext('2d')
		this.ctx.strokeStyle = "#000";
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
	computed:{
		msg(){
			return this.$store.state.wsStore.draw;
		},
    },
	methods:{
		clearDraw:function(){
			this.draw.clearCanvas();
		},
		
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* #showing { border: 1px solid black; } */
</style>
