<template>
<div>
  <div class="totalBoard">
    <input class='inputContent' type="text" v-model="guassWord" placeholder="这里输入内容" @keydown.enter="submitWord" component="inputBoard"/>
    <el-button type="primary" class="submitButton" @click="submitWord" component="inputBoard" >发送</el-button>
  </div>
</div>
</template>

<script>

export default {
    name: 'ChatBoard',
    data () {
        return {
            guassWord: '',
        }
    },
    computed:{
        username(){
            return this.$store.state.username.username;
        },
        drawuser(){
            return this.$store.state.beginGame.drawUser;
        },
    },
    watch:{
        drawuser(newval,oldval){
            let inputEle = document.querySelector('input[component="inputBoard"]');
            let buttonEle = document.querySelector('button[component="inputBoard"]');
            if(this.drawuser==this.username){
                inputEle.setAttribute('disabled','disabled')
                buttonEle.setAttribute('disabled','disabled');
            }else{
                inputEle.removeAttribute('disabled');
                buttonEle.removeAttribute('disabled');
            }
        }
    },
    methods:{
        submitWord(){
            if(this.$store.state.wsStore.ws.readyState==3){
                this.$message('服务器未连接');
                return ;
            }
            if(this.username==null||this.username==''){
                this.$message('请登陆');
                return ;
            }
            if(this.guassWord!=''){
                this.$store.state.wsStore.ws.send(`chat,${this.username},${this.guassWord}`);
                this.guassWord='';
            }
        }
    }
}
</script>

<style lang='less' scoped>
.totalBoard{
    margin: 10px auto;
    width: 90%;
    height: 70%;
    border: 1px solid #000;
    border-radius: 6px;
    overflow: hidden;
    .inputContent{
        height: 90%;
        width: 65%;
        border: 0px;
        outline:none;
		background-color:transparent;
    }
    .submitButton{
        height: 100%;
        width: 26%;
        float: right;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
}

</style>