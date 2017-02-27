const environment = process.env.NODE_ENV;

if (typeof environment === 'undefined') {
    throw "An environment must be set. Please change the NODE_ENV environment variable prior to building.";
}

try {
    module.exports = require('../config/env/' + environment + '.json');
} catch (e) {
    if (e.code !==  'MODULE_NOT_FOUND') {
        throw e;
    }

    throw "Missing environment config for :env (config/env/:env.json)".replace(/:env/g, environment);
}