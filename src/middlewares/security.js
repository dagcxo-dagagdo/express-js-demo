const modifyHeaders = app => {
    app.use((req, res, next) => {
        res.setHeader('X-Powered-By', 'PHP/5.6')

        next()
    })
}

const addSlashes = app => {
    app.use((req, res, next) => {
        const test = /\?[^]*\//.test(req.url);
        if (req.url.substr(-1) !== '/' && req.url.length > 1 && !test)
            res.redirect(301, req.url + "/")
        else
            next();
    });
}


module.exports = {
    modifyHeaders,
    addSlashes
}