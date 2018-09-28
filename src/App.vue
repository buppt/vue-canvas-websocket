<template>
  <div id="app">
	<div v-if="showLogin==1" class="loginTotal">
		<div class="loginBlock">
			<p>请输入你的用户名</p>
			<input type="text" v-model="username" />
			<br/>
			<button class="loginButton" @click="login">确认</button>
		</div>
	</div>
	<div>
		<show-board v-if="x==1" class="showBoard" :ws="ws" :msg="msg"></show-board>
		<draw-board v-else class="showBoard" :ws="ws" ></draw-board>
		<TheSeats class="theSeats" :ws="ws" :username="username" :msg="msg" @event="beginGame"></TheSeats>
	</div>
  </div>
</template>

<script>
import DrawBoard from './components/DrawBoard'
import ShowBoard from './components/ShowBoard'
import TheSeats from './components/TheSeats'
export default {
  name: 'App',
  components:{
	DrawBoard,
	ShowBoard,
	TheSeats
  },
  data () {
    return {
	  x: 1,
	  showLogin: 1,
	  username: '',
	  ws: '',
	  msg:[],
    }
  },
  mounted:function(){
	if(!window.sessionStorage){
		alert("浏览器不支持sessionStorage!");
	}else{
		let storage = window.sessionStorage;
		let drawUsername=storage.getItem("drawUsername");
		if(drawUsername!=null&&drawUsername!=''){
				this.username=drawUsername;
				this.showLogin=0;
		}
	}
	this.ws = new WebSocket('ws://localhost:3000/test');
	this.ws.onmessage = (message)=>{
		console.log(message)
		this.msg = message.data.split(',')
	}
  },
  methods:{
	beginGame(msg){
		if(msg=="beginGame"){
			this.x=0;
		}
	},
	login(){
		this.showLogin=0;
		if(!window.sessionStorage){
			alert("浏览器不支持sessionStorage!");
		}else{
			var storage = window.sessionStorage;
			storage.setItem("drawUsername",this.username);
		}
	}
  }
}
</script>

<style>
body{
	margin: 0;
	padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
.loginTotal{
	background-color: rgba(0,0,0,0.7);
	position: fixed;
	width: 100%;
	height: 100%;
	z-index: 100;
}
.loginBlock{
	position: relative;
	width: 300px;
	height: 150px;
	background-color: #fff;
	top: 50%;
	left: 50%;
	margin: -75px 0 0 -150px;
	padding-top: 30px;
}
.loginButton{
	margin-top: 15px;
}
.showBoard{
	display: inline-block;
}
.theSeats{
	display: inline-block;
	vertical-align: top;
}
</style>
