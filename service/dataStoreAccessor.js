const firebase = require('firebase-admin');


const userPath = 'users/';
const domainPath = 'domains/';

class DataStoreAccessor {

    constructor() {
        const firebaseConfig = process.env.FIREBASE_CONFIG;
        const serviceAccount = firebaseConfig !== undefined ? require(firebaseConfig) : null;
        if (serviceAccount !== null) {
            this.database = firebase.initializeApp(
                {
                    credential: firebase.credential.cert(serviceAccount),
                    databaseURL: process.env.FIREBASE_URL
                }
            ).database();
        }
    }

    /**
     * Creates a user with the given email.
     * @param email {string}
     */
    createUser(email) {
        const encodedEmail = fixedEncodeURIComponent(email);
        return this.database.ref(userPath + encodedEmail).set({
            email: email
        })
    };

    /**
     * Removes the user that has the given email.
     * @param email {string}
     */
    removeUser(email) {
        const encodedEmail = fixedEncodeURIComponent(email);
        return this.database.ref(userPath + encodedEmail).remove();
    };

    /**
     * Returns the user that has the given email.
     * @param email {string}
     */
    getUser(email) {
        const encodedEmail = fixedEncodeURIComponent(email);
        return this.database.ref(userPath + encodedEmail).once('value');
    };

    /**
     * Adds a domain to the datastore
     * @param domain {string}
     * @param isTaken {boolean}
     */
    addDomain(domain, isTaken) {
        return this.database.ref(domainPath + domain).set({
            isTaken: isTaken
        });
    };

    /**
     * Returns a domain object with the given domain url
     * @param domain {string}
     */
    getDomain(domain) {
        return this.database.ref(domainPath + domain).once('value');
    };

    /**
     * Updates a domain entry with the given domainObject
     * @param domain {string}
     * @param domainObject {object}
     */
    editDomain(domain, domainObject) {
        return this.database.ref(domainPath + domain).update(domainObject);
    };

    /**
     * Removes a domain entry
     * @param domain {string}
     */
    removeDomain(domain) {
        return this.database.ref(domainPath + domain).remove();
    };
}

function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*.]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
    });
}

module.exports = DataStoreAccessor;
