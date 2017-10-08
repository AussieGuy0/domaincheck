
module.exports = {
    level: {
        DEBUG: "debug",
        TRACE: "trace"
    },
    log: function (level, message) {
        console.log(`[${level}] ${new Date()} ${message}`)
    },
    debug: function (message) {
       this.log(this.level.DEBUG, message);
    },
    trace: function (message) {
       this.log(this.level.TRACE, message);
    }
};