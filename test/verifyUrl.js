const assert = require('assert');
const domainService = require('../service/domain');

describe('verifyDomain', function() {

    const validUrls = ["google.com", "abc-123.com"];
    const invalidUrls = ["go<ogle.com", "com", "abc..com", ".com", ""];

    describe('valid domains', function() {
        validUrls.forEach(function(sUrl) {
            it(`'${sUrl}' is a valid url`, function () {
                assert.ok(domainService.verifyDomain(sUrl));
            })
        })
    });

    describe('invalid domains', function() {
        invalidUrls.forEach(function(sUrl) {
            it(`'${sUrl}' is invalid url`, function () {
                assert.equal(domainService.verifyDomain(sUrl), false);
            })
        })
    });
});

