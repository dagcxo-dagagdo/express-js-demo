const { modifyHeaders, addSlashes } = require("./security")

const configMiddlewares = app => {
    addSlashes(app)
    modifyHeaders(app);
}

module.exports = configMiddlewares