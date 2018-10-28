// 导入WebSocket模块:
const WebSocket = require('ws');

// 引用Server类:
const WebSocketServer = WebSocket.Server;

// 实例化:
const wss = new WebSocketServer({
    port: 3000
});

let seats=['空位','空位','空位','空位','空位','空位']
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
                setTimeout(()=>{
                    wss.clients.forEach((client) => {
                        client.send(`begin,${username},${ms}`)
                    })
                },ms)
            }
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
            },ms)
        }else{
            wss.clients.forEach((client) => {
                    client.send(message)
            })
        }
		 
    })
});