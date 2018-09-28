<template>
<div class="seatVue">
  <div class="seatContent">
    <div v-for="(seat,index) in seats" :key="index" class="seats-block">
		<p  class="guassWord">{{guassWord[index]}}</p>
		<button  class="seat-num" @click="seatDown(index)" @mouseover="toggleShow(index)" @mouseout="toggleShow(index)">{{seat}}</button>
		
	</div>
	<br/>
  </div>
  <button v-if="seats[0]==username" class="startButton" @click="beginGame()">开始游戏</button>
  <button v-else class="startButton">一楼房主</button>
  <div class="clear"></div>
	<input type="text" class="guassInput" v-model="inputWord"/>
	<button @click="submitInput()">发送</button>
</div>
</template>

<script>

export default {
  name: 'TheSeats',
  props:['username','ws','msg'],
  data () {
    return {
      buttonShow: '空位',
	  seats:['空位','空位','空位','空位','空位','空位'],
	  mySeat: -1,
	  guassWord: ['','','','','',''],
	  inputWord: '',
    }
  },
  mounted: function(){
	
  },
  watch:{
	msg(newval,oldval){
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
  },
  methods:{
	seatDown:function(index){
		if(this.seats[index]=='坐下'){
			for(let i=0;i<this.seats.length;i++){
				if(this.seats[i]==this.username){
					this.seats[i]='空位';
				}
			}
			this.seats.splice(index,1,this.username);
			this.mySeat=index;
			this.ws.send("seats"+','+index+','+this.username);
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
<style scoped>
.seatVue{
	text-align: left;
}
.seatContent { 
	float:left;
	border: 1px solid black; 
	width: 100px;
	height: 350px;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	}
.seats-block{
	border: 1px solid black; 
	height: 10%;
	position: relative;
}

.seat-num:hover{
	cursor: pointer;
}
.guassWord{
	position: absolute;
	left: -50px;
	margin: 0;
}
.startButton{
	float: right;
}
.clear{
	clear: both;
}
.guassInput{
	margin:0;
	width: 100px;
}
</style>
