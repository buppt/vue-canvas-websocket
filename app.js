// 导入WebSocket模块:
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
wss.on('connection', function (ws) {
    console.log(`[SERVER] connection()`);
    ws.on('message', function (message) {
        console.log(`[SERVER] Received: ${message}`);
        let msg = message.split(',');
        if(msg[0]=="seats"&&msg.length==3){
            let i = seats.indexOf(msg[2])
            if(i>-1){
                seats[i]='空位';
            }
            seats[msg[1]]=msg[2];
            wss.clients.forEach((client) => {
                client.send(`seats,${seats}`)
            })
        }else if(msg[0]=='begin'){
            function settime(username,ms){
                let i = Math.floor(Math.random()*dict.length);
                setTimeout(()=>{
                    guassWord=dict[i];
                    wss.clients.forEach((client) => {
                        client.send(`begin,${username},${dict[i]}`)
                    })
                },ms)
            }
            gameBegin=true;
            let ms = 0;
            for(let username of seats){
                if(username!='空位'){
                    settime(username,ms)
                    ms+=4000;
                }
            }
            setTimeout(()=>{
                wss.clients.forEach((client) => {
                    client.send(`end,`)
                })
                gameBegin=false;
            },ms)
        }else if(gameBegin&&msg[0]=='chat'&&msg[2]==guassWord){
            wss.clients.forEach((client) => {
                client.send(`chat,${msg[1]},猜对啦！`)
            })
        }else{
            wss.clients.forEach((client) => {
                    client.send(message)
            })
        }
		 
    })
});