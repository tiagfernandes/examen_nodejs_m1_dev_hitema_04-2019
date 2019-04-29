const { decodeHexFileContent } = require('./io');

describe('IO Tests', () => {
    describe('decodeHexFileContent', () => {
        it('Should decode hex file content', async () => {
            const decodedContent = await decodeHexFileContent(__dirname + '/input');
            expect(decodedContent).toEqual('Si vous arrivez à lire ceci, c\'est que l\'exercice est réussi !')
        });
    });
});
