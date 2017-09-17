const assert = require('assert');
const http = require('http')

const server = require('../server');
const port = 3001;

describe('serverTest', function() {

    before(function() {
        server.listen(port);
    });

    after(function() {
        server.close();
    });

    describe('homePage', function() {
        it('should return something', function(done) {
            createGetRequest('/', (data) => {
                assert.ok(data.length > 0);
                done();
            }).end();
        });
    });

    describe('checkDomain', function() {
        it('should return something', function(done) {
            createGetRequest('/checkDomain?domain=google.com', (data) => {
                assert.ok(data.length > 0);
                done();
            }).end();
        });
    });
});


function createGetRequest(path, callback) {
    const url = `http://localhost:${port}${path}`

    var data = "";
    return http.get(url, (res) => {
        if (res.statusCode !== 200) {
            throw Error(`Request failed ${res}`);
        }
        res.setEncoding('utf-8');

        res.on('data', (chunk) => {
            data += chunk;
        })

        res.on('end', () => {
            callback(data);
        })
    });

}

function createOptions(hostName, port, path, method, headers) {
    return {
        hostName: hostName,
        port: port,
        path: path,
        method: method, 
        headers: headers
    };
}
