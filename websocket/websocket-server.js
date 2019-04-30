const WebSocket = require('ws')
const webSocketServer = new WebSocket.Server({ port: 3001 });

let messages = [];
webSocketServer.on('connection', webSocket => {
    webSocket.send(JSON.stringify(messages));

    webSocket.onmessage = messageEvent => {
        const message = messageEvent.data;
        webSocketServer.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                messages.push(message);
                console.log(message);
                console.log(messages);
                client.send(message);
            }
        });
    };
});

module.exports = webSocketServer;
