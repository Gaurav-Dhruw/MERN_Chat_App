const auth  = require('./auth.middleware');
const oauth = require('./oauth.middleware');

module.exports = {
    auth,
    oauth
}