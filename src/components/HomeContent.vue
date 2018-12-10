<template>
  <div class='homeContent'>
		<div class="boardleft">
			<div class="showBoard">
				<div v-if="beginGame">当前画家：{{drawuser}}  剩余时间：{{second}}</div>
				<div v-else>请等待一楼开始游戏</div>
				<show-board v-if="(beginGame&&drawuser!=username)"></show-board>
				<draw-board v-else></draw-board>
				<div v-show="beginGame&&drawuser==username" class="guassWord">要画的词是：{{guassWord}}</div>
			</div>
			<the-seats class="seat"></the-seats>
		</div>
		<div class="boardright">
			<chat-board class="chatBoard"></chat-board>
			<input-board class="inputBoard"></input-board>
		</div>
		<div class="clear"></div>
		<!-- <draw-board v-else class="showBoard" :ws="ws" ></draw-board>
		<TheSeats class="theSeats" :ws="ws" :username="username" :msg="msg" @event="beginGame"></TheSeats> -->
  </div>
</template>

<script>
import DrawBoard from './DrawBoard'
import ShowBoard from './ShowBoard'
import TheSeats from './TheSeats'
import ChatBoard from './ChatBoard'
import InputBoard from './InputBoard'
export default {
	name: 'HomeContent',
	components:{
		DrawBoard,
		ShowBoard,
		TheSeats,
		ChatBoard,
		InputBoard
	},
	data () {
		return {
			x: 1,
			second: 9,
		}
	},
	computed:{
		username(){
            return this.$store.state.username.username;
		},
		drawuser(){
			return this.$store.state.beginGame.drawUser;
		},
		beginGame(){
			return this.$store.state.beginGame.beginGame;
		},
        guassWord(){
		  return this.$store.state.beginGame.drawWord;
        }
	},
	watch:{
		drawuser(newval,oldval){
			console.log(newval)
			this.second=9;
			this.countDown();
		}
	},
	methods:{
		draw(){
			this.x=!this.x;
		},
		countDown(){
			if(this.second>0){
				let self = this;
				setTimeout(()=>{
					self.second--;
					self.countDown();
				},1000)
			}
		}
	}
}
</script>

<style lang='less' scoped>
.homeContent{
	position: absolute;
	//overflow: hidden;
	text-align: center;
	display: flex;
	flex-direction: row;
	align-items: stretch;
	bottom: 30px;
	top: 70px;
	right: 30px;
	left: 0;
	.boardleft{
		flex: 3;
		//border: 1px solid #e5e4e4;
		margin-left: 30px;
		.showBoard{
			height: 88%;
		}
		.seat{
			border: 1px solid #e5e4e4;
			height: 12%;				
		}
	}
	.boardright{
		margin-left: 30px;
		flex: 1;
		border: 1px solid #e5e4e4;
		border-radius: 5px;
		
		.chatBoard{
			height: 88%;
			background-color: #fff;
		}
		.inputBoard{
			border-top: 1px solid #e5e4e4;
			height: 12%;	
		}
	}
	
}
.clear{
	clear: both;
}

</style>
