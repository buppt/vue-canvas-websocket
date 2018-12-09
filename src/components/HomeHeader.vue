<template>
    <div>
        <div v-if="showLogin==1" class="loginTotal">
            <div class="loginHold" @click="hideLogin"></div>
            <div class="loginBlock">
                <p>请输入你的用户名</p>
                <input type="text" v-model="inputName" @keydown.enter="saveName" v-focus/>
                <br/>
                <button class="loginButton" @click="saveName">确认</button>
            </div>
        </div>
        <div class="header">
            <div class="header-content">
                <div class="header-left">你画我猜</div>
                <div class='header-right'>
                    <ul>
                        <li>
                            <a v-if="username==''" @click='login'>登录</a>
                            <a v-else @click='login'>欢迎 {{username}}</a>
                        </li>
                        <li>
                            <a href="https://github.com/buppt" target="_blank">Github</a>
                        </li>
                        <li>
                            <a href="https://github.com/buppt/canvas-websocket-learn" target="_blank">Star</a>
                        </li>
                        <li>
                            <a>多语言</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>   
</template>
<script>
export default {
    name:'PageHeader',
    data () {
		return {
            showLogin: false,
            inputName:'',
            username: '',
		}
    },
    mounted(){
        if(!window.sessionStorage){
            alert("浏览器不支持sessionStorage!");
        }else{
            let storage = window.sessionStorage;
            let username=storage.getItem("username");
            if(username!=null&&username!=''){
                this.username=username;
                this.inputName=username;
                this.showLogin=false;
                this.$store.commit('username/setUsername',username)
            }
        }
    },
    methods:{
        login(){
            this.showLogin=true;            
        },
        hideLogin(){
            this.showLogin=false;
        },
        saveName(){
            if(!window.sessionStorage){
                alert("浏览器不支持sessionStorage!");
            }else{
                let storage = window.sessionStorage;
                storage.setItem("username",this.inputName);
            }
            this.username=this.inputName;
            this.showLogin=0;
            this.$store.commit('username/setUsername',this.inputName)
        }
    },
    directives: {
        focus: {
            // 指令的定义
            inserted: function (el) {
            el.focus()
            }
        }
    }
}
</script>
<style lang='less' scoped>
.header{
    position: relative;
    height: 50px;
    line-height: 50px;
    color: #222;
    width: 100%;
    text-align: center;
    font-size: 17px;
    background-color: rgba(255,255,255,1);
    -webkit-box-shadow: rgba(0,0,0,.1) 0 1px 2px;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    .header-content{
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 980px;
        text-align: center;
        .header-left{
            float: left;
            cursor: pointer;
            font-size: 20px;
        }
        .header-right{
            float: right;
            ul{
                list-style: none;
                position: relative;
                display: flex;
                margin: 0;
                padding: 0;
                li{
                    position: relative;
                    color: #000;
                    transition: 0.2s all linear;
                    cursor: pointer;
                    margin-right: 15px;
                    padding: 0 2px;
                    a{
                        text-decoration:none;
                        color:#333;
                    }
                }
                li::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 100%;
                    width: 0;
                    height: 90%;
                    border-bottom: 2px solid #000;
                    transition: 0.2s all linear;
                }
                li:hover::before {
                    width: 100%;
                    top: 0;
                    left: 0;
                    transition-delay: 0.1s;
                    border-bottom-color: #000;
                    z-index: -1;
                }
                li:hover ~ li::before {
                    left: 0;
                }
                li:active {
                    background: #eee;
                    color: #fff;
                }
            }
        }
    }
    
}
.loginTotal{
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    .loginHold{
        background-color: rgba(0,0,0,0.7);
        position: absolute;
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
        z-index: 101;
        .loginButton{
            margin-top: 15px;
        }
    }
    
    
}

</style>
