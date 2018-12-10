<template>
  <div class = 'homePage'>
	<home-header></home-header>
	<home-content></home-content>
  </div>
</template>

<script>
import HomeHeader from '../components/HomeHeader'
import HomeContent from '../components/HomeContent'
export default {
	name: 'HomePage',
	components:{
		HomeHeader,
		HomeContent,
	},
	data () {
		return {
		}
	},
	mounted(){
		let ws = new WebSocket('ws://localhost:3000/');
		this.$store.commit('wsStore/connect',ws);
		let self=this;
		ws.onmessage = (message)=>{
			let msg = message.data.split(',')
			if(msg[0]=="seats"){
				self.$store.commit('wsStore/changeSeats',msg.slice(1,7));
			}else if(msg[0]=='chat'&&msg.length==3) {
				self.$store.commit('wsStore/acceptChat',msg);
			}else if(msg[0]=='draw'||msg[0]=='stop'||msg[0]=='clear') {
				self.$store.commit('wsStore/acceptDraw',msg);
			}else if(msg[0]=='begin'||msg[0]=='end'){
				self.$store.commit('beginGame/countDown',msg)
			}
		}
	},
	destroyed(){
		this.$store.state.wsStore.ws.onclose();
	}
}
</script>

<style scoped>
.homePage{
	height: 100%;
	/* background-image: url('/static/background.jpg') */
	background-color: #fff;
	position: relative;
}
</style>
