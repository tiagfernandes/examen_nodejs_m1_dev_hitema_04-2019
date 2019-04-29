const { digestAuth } = require('./basic-auth');
const HttpStatus = require('http-status-codes');

describe('Basic Auth Tests', () => {
    let request;
    const response = {
        sendStatus: jest.fn()
    }
    const next = jest.fn();

    beforeEach(() => {
        request = {
            headers: {
                authorization: 'Basic '
            }
        };
    });

    it('Should send status 401 if authentication fails', () => {
        request.headers.authorization += Buffer.from('Hello:World').toString('base64')
        digestAuth(request, response);
        expect(response.sendStatus).toBeCalledWith(HttpStatus.UNAUTHORIZED);
    });

    it('Should call next() if authentication success', () => {
        request.headers.authorization += Buffer.from('node:5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8', 'utf8').toString('base64')
        digestAuth(request, response, next);
        expect(response.sendStatus).not.toBeCalled();
        expect(next).toBeCalled();
    });
});
