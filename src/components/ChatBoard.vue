<template>
<div>
  <div class="totalBoard" id="totalBoard">
    <div v-for="(record,index) in chatRecords" :key="index" class="record">
        <span class="blue">{{record.username}}</span>:{{record.content}}
    </div>
    <div class="blank"></div>
  </div>
  <button class="clearScreen" @click="clearScreen">清屏</button>
</div>
</template>

<script>

export default {
  name: 'ChatBoard',
  data () {
    return {
        chatRecords:[
            {username:'haha',content:'大家好'},
            {username:'我是谁',content:'我是'},
            {username:'haha',content:'nihaoa'},
            {username:'我是谁',content:'haha'},
            {username:'haha',content:'nihaoa'},
            {username:'我是谁',content:'猜错了'},
        ],
    }
  },
  watch:{
      msg(newval,oldval){
        let record = {
            username: this.msg[1],
            content: this.msg[2]
        };
        this.chatRecords.push(record);
        let div = document.getElementById('totalBoard')
       // let div = document.getElementsByTagName('totalBoard')
        div.scrollTop = div.scrollHeight;
        console.log(div.scrollTop,div.scrollHeight+100)
      }
  },
  computed:{
		msg(){
			return this.$store.state.wsStore.chat;
		}
    },
    methods:{
        clearScreen(){
            this.chatRecords=[]
        }
    }
}
</script>

<style lang='less' scoped>
.totalBoard{
    width: 100%;
    height: 95%;
    text-align: left;
    overflow: auto;
    position: relative;
    .record{
        padding-top: 10px;
        padding-left: 20px;
    }
    .clearScreen{
        position: -webkit-sticky;
        position: sticky;
        bottom: 0;
    }
}
.blue{
    color: #409EFF;
}
.blank{
    height: 30px;;
}
</style>