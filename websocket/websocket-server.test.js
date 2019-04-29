const WebSocket = require('ws');

describe('Websocket Tests', () => {
    const fakeURL = 'ws://localhost:3001';
    let webSocketServer;

    beforeAll(() => {
        webSocketServer = require('./websocket-server');
    });

    afterAll(() => {
        webSocketServer.close();
    });

    it('Should send messages history to newly connected client', (done) => {
        const webSocketClient = new WebSocket(fakeURL);
        let webSocketClient2;
        const message1 = 'message1';
        const message2 = 'message2';

        webSocketClient.onopen = () => {
            webSocketClient.send(message1);
            webSocketClient.send(message2);

            webSocketClient2 = new WebSocket(fakeURL);
            webSocketClient2.onopen = () => {
                webSocketClient2.onmessage = (event) => {
                    expect(event.data).toEqual('["message1","message2"]');
                    webSocketClient.terminate();
                    webSocketClient2.terminate();
                    done();
                };
            };
        };

        webSocketServer.on('error', (error) => {
            done(error);
        });
    });

    it('Should have launch command configured', () => {
        const packageJson = require('../package.json');
        expect(packageJson.scripts['start:websocket']).toEqual('node ./websocket/index.js');
    });
});
