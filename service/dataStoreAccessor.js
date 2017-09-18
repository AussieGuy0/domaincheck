
class DataStoreAccessor {

    constructor(dao) {
        this.dao = dao;
    }

    /**
     * Creates a user with the given email.
     * @param email {string}
     */
    createUser = function(email) {
        return this.dao.createUser(email);
    };

    /**
     * Removes the user that has the given email.
     * @param email {string}
     */
    removeUser = function(email) {
        return this.dao.removeUser(email);
    };

    /**
     * Returns the user that has the given email.
     * @param email {string}
     */
    getUser = function(email) {
        return this.dao.getUser(email);
    };

    /**
     * Adds a domain to the datastore
     * @param domain {string}
     * @param isTaken {boolean}
     */
    addDomain = function(domain, isTaken) {
        return this.dao.addDomain(domain, isTaken);
    };

    /**
     * Returns a domain object with the given domain url
     * @param domain {string}
     */
    getDomain = function(domain) {
        return this.dao.getDomain(domain);
    };

    /**
     * Updates a domain entry with the given domainObject
     * @param domain {string}
     * @param domainObject {object}
     */
    editDomain = function(domain, domainObject) {
        return this.dao.editDomain(domain, domainObject);
    };

    /**
     * Removes a domain entry
     * @param domain {string}
     */
    removeDomain = function(domain) {
        return this.dao.removeDomain(domain);
    };
}

module.exports = DataStoreAccessor;
