const assert = require('assert');
const fs = require('fs');
const domainCheck = require('../service/domain')

const resourcesDir = './test/resources';

describe('domainCheck', function() {
    const goodWhoisText = fs.readFileSync(`${resourcesDir}/goodWHOIS.txt`, 'utf-8');
    const badWhoisText = fs.readFileSync(`${resourcesDir}/badWHOIS.txt`, 'utf-8');
    describe('Convert found whois', function() {
        const whois = domainCheck.convertWhois(goodWhoisText);
        it('should say was found', function() {
            assert.ok(whois.found);
        });
        it('should have correct domain name', function() {
            assert.equal(whois.data.domainName, 'GOOGLE.COM');
        });
        it('should have correct expiry date', function() {
            assert.equal(whois.data.registryExpiryDate, '2020-09-14T04:00:00Z');
        });
    });
    describe('Convert not found whois', function() {
        const whois = domainCheck.convertWhois(badWhoisText);
        it('should say it was not found', function() {
            assert.ok(!whois.found);
        });
        it('should not have data', function() {
            assert.equal(whois.data, undefined);
        });
    });
});

