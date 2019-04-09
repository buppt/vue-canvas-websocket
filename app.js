class Dep{
    constructor(){
        this.subs = [];
    }
    addSub(data){
        this.subs.push(data);
    }
    notify(data){
        this.subs.forEach( sub => sub.send(data));
    }
}

const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3000
});

let seats=['空位','空位','空位','空位','空位','空位']
let dict=['老鼠','牛','老虎','兔子','龙','蛇','马','羊','猴子','鸡','狗','猪']

let gameBegin = false;
let guassWord = '';
let dep = new Dep();
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    dep.addSub(ws)
    ws.on('message', function (message) {
        let msg = message.split(',');
        if(msg[0]=="seats"&&msg.length==3){
            let i = seats.indexOf(msg[2])
            if(i>-1){
                seats[i]='空位';
            }
            seats[msg[1]]=msg[2];
            dep.notify(`seats,${seats}`)
            
        }else if(msg[0]=='begin'){
            function settime(){
                return new Promise((resolve)=>{
                    setTimeout(()=>{
                        resolve()
                    },10000)
                })
            }
            gameBegin=true;
            (async function(){
                for(let i in seats){
                    if(seats[i] != '空位'){
                        var index = Math.floor(Math.random()*dict.length);
                        guassWord=dict[index];
                        dep.notify(`begin,${seats[i]},${dict[index]}`)
                        await settime()
                    }
                }
                dep.notify(`end,`)
                gameBegin=false;
            })()
            
            
        }else if(gameBegin&&msg[0]=='chat'&&msg[2]==guassWord){
            dep.notify(`chat,${msg[1]},猜对啦！`)
        }else{
            dep.notify(message)
        }
		 
    })
});