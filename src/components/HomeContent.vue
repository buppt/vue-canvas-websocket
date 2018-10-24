<template>
  <div class='homeContent'>
		<div class="content">
			<div class="boardleft">
				<div class="showBoard">
					<draw-board v-if="x==0"></draw-board>
					<show-board v-else></show-board>
					<button v-show="x==1" class="testDraw" @click="draw">我要画</button>
					<button v-show="x==0" class="testDraw" @click="draw">我要猜</button>
				</div>
				<the-seats class="seat"></the-seats>
			</div>
			<div class="boardright">
				<chat-board class="chatBoard"></chat-board>
				<input-board class="inputBoard"></input-board>
			</div>
			<div class="clear"></div>
		</div>
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
			showLogin: 1,
		}
	},
	methods:{
		draw(){
			this.x=!this.x;
		},
	}
}
</script>

<style lang='less' scoped>
.homeContent{
	padding-top: 30px;
	text-align: center;
	.content{
		 width: 1010px;
		 height: 550px;
		 margin: 0 auto;
		.boardleft{
			float: left;
			border: 1px solid #000;
			height: 100%;
			width: 69%;
			.showBoard{
				height: 88%;
			}
			.seat{
				border-top: 1px solid #000;
				height: 12%;				
			}
		}
		.boardright{
			float: right;
			border: 1px solid #000;
			height: 100%;
			width: 29%;
			.chatBoard{
				height: 88%;
			}
			.inputBoard{
				border-top: 1px solid #000;
				height: 12%;	
			}
		}
	}
}
.clear{
	clear: both;
}

</style>
