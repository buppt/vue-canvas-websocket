<template>

  <div class="seatContent">
	<div class="startButton">
	  	<button v-if="seats[0]==username" @click="begin()" component='seat'>开始游戏</button>
		<button v-else component='seat'>一楼房主</button>
		<div class="clear"></div>
	</div>
    <div v-for="(seat,index) in seats" :key="index" class="seats-block">
		<button type="primary" plain class="seat-num" :class="seat=='空位'?'blue':'green'" @click="seatDown(index)" component='seat'>{{seat}}</button>
	</div>
  </div>

</template>

<script>

export default {
  name: 'TheSeats',
  data () {
    return {
      buttonShow: '空位',
	  //seats:['空位','空位','空位','空位','空位','空位'],
    }
  },
  mounted(){
	  
  },
  computed:{
        username(){
            return this.$store.state.username.username;
		},
		seats(){
			return this.$store.state.wsStore.seats;
		},
		beginGame(){
			return this.$store.state.beginGame.beginGame;
		}
	},
	watch:{
		beginGame(newval,oldval){
			if(this.beginGame){
				let button = document.getElementsByTagName('button');
				for(let bt of button){
					if(bt.getAttribute("component")){
						bt.setAttribute('disabled','disabled');
					}
				}
			}else{
				let button = document.getElementsByTagName('button');
				for(let bt of button){
					if(bt.getAttribute("component")){
						bt.removeAttribute('disabled');
					}
				}
			}
		}
	},
  methods:{
	seatDown(index){
		if(this.username==null||this.username==''){
			this.$message('请登陆');
		}else if(this.seats[index]=='空位'){
			this.$store.state.wsStore.ws.send(`seats,${index},${this.username}`);
		}else{
			this.$message('此位置有人');
		}
	},
	begin(){
		this.$store.state.wsStore.ws.send(`begin,`);
	},
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>

.seatContent { 
	width: 100%;
	height: 100%;
	text-align: center;
	display: inline-flex;
	justify-content: space-around;
	align-items: center; 

	.seats-block{
		width: 15%;
		.seat-num{
			color: #fff;
			border: 0;
			border-radius: 20px;
			padding: 12px 23px;
			line-height: 1;
			white-space: nowrap;
		}
	}
}
.blue{
	background-color: #409eff;
}
.green{
	background-color: #67c23a;
}
button[disabled]{
    cursor: not-allowed; 
}
button{
	cursor: pointer;
}
</style>
