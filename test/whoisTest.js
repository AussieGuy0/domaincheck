const assert = require('assert');
const fs = require('fs');
const domainCheck = require('../service/domain')

const resourcesDir = './test/resources';

describe('domainCheck', function() {
    const goodWhoisText = fs.readFileSync(`${resourcesDir}/goodWHOIS.txt`, 'utf-8');
    const badWhoisText = fs.readFileSync(`${resourcesDir}/badWHOIS.txt`, 'utf-8');
    describe('#convertWhoIs', function() {
        it('should say was found', function() {
            const obj = domainCheck.convertWhois(goodWhoisText);
            assert.ok(obj.found);
        });
        it('should say it was not found', function() {
            const obj = domainCheck.convertWhois(badWhoisText);
            assert.ok(!obj.found);
        });
    });
});

