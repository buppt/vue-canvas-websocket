<template>

  <div class="seatContent">
    <div v-for="(seat,index) in seats" :key="index" class="seats-block">
		<button type="primary" plain class="seat-num" :class="seat=='空位'?'blue':'green'" @click="seatDown(index)" @mouseover="toggleShow(index)" @mouseout="toggleShow(index)">{{seat}}</button>
	</div>
  </div>
  <!-- <button v-if="seats[0]==username" class="startButton" @click="beginGame()">开始游戏</button>
  <button v-else class="startButton">一楼房主</button>
  <div class="clear"></div>
	<input type="text" class="guassInput" v-model="inputWord" @keydown.enter="submitInput"/>
	<button @click="submitInput()">发送</button> -->

</template>

<script>

export default {
  name: 'TheSeats',
  data () {
    return {
      buttonShow: '空位',
	  seats:['空位','空位','空位','空位','空位','空位'],
    }
  },
  mounted: function(){

  },
  watch:{
		msg(newval,oldval){
			for(let i=0;i<this.seats.length;i++){
				if(this.seats[i]==this.msg[2]){
					this.seats[i]='空位';
				}
			}
			this.seats.splice(this.msg[1],1,this.msg[2]);
			// }else if(this.msg[0]=="input"&&this.msg.length==3){
			// 	this.guassWord.splice(this.msg[1],1,this.msg[2]);
			// 	setTimeout(()=>{
			// 		this.guassWord.splice(this.msg[1],1,'');
			// 	},2000);
			// }
		}
  },
  computed:{
        username(){
            return this.$store.state.username.username;
		},
		msg(){
			return this.$store.state.wsStore.seats;
		},
    },
  methods:{
	seatDown(index){
		if(this.username==null||this.username==''){
			this.$message('请登陆');
			return
		}
		if(this.seats[index]=='坐下'){
			for(let i=0;i<this.seats.length;i++){
				if(this.seats[i]==this.username){
					this.seats[i]='空位';
				}
			}
			this.seats.splice(index,1,this.username);
			//console.log(ws)
			this.$store.state.wsStore.ws.send(`seats,${index},${this.username}`);
		}else{
			this.$message('此位置有人');
		}		
	},
	toggleShow(index){
		if(this.seats[index]=="空位"){
			this.seats.splice(index,1,"坐下");
		}else if(this.seats[index]=="坐下"){
			this.seats.splice(index,1,"空位");
		}
	},
	beginGame(){
		this.$emit("event","beginGame");
	},
	submitInput(){
		this.guassWord.splice(this.mySeat,1,this.inputWord);
		this.ws.send("input"+','+this.mySeat+','+this.inputWord);
		setTimeout(()=>{
			this.guassWord.splice(this.mySeat,1,'');
		},2000);
	},
	msgChange(){
		if(this.msg[0]=="seats"&&this.msg.length==3){
			for(let i=0;i<this.seats.length;i++){
				if(this.seats[i]==this.msg[2]){
					this.seats[i]='空位';
				}
			}
			this.seats.splice(this.msg[1],1,this.msg[2]);
		}else if(this.msg[0]=="input"&&this.msg.length==3){
			this.guassWord.splice(this.msg[1],1,this.msg[2]);
			setTimeout(()=>{
				this.guassWord.splice(this.msg[1],1,'');
			},2000);
		}
	}
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
			cursor: pointer;
		}
	}
}
.blue{
	background-color: #409eff;
}
.green{
	background-color: #67c23a;
}

// .seat-num:hover{
// 	cursor: pointer;
// }
// .guassWord{
// 	position: absolute;
// 	left: -50px;
// 	margin: 0;
// }
// .startButton{
// 	float: right;
// }
// .clear{
// 	clear: both;
// }
// .guassInput{
// 	margin:0;
// 	width: 100px;
// }
</style>
