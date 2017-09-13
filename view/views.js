const fs = require('fs');
const viewDir = 'view/'

class View {
    constructor(view, data) {
        this.title = view;
        this.data = data;

        this.template = readTemplate(view);
    }

    render() {
        return evalTemplate(this.template, this.data);
    }
}

function readTemplate(title) {
    return '`' + fs.readFileSync(`${viewDir}${title}.html`, 'utf-8') + '`';
}


/**
 * Takes an string and evaluates it like a template literal.
 * Kind of hacky but works as a barebones templating engine.
 **/
function evalTemplate(s, params) {
    return Function(...Object.keys(params), "return " + s)
    (...Object.values(params));
}

module.exports = View;
