const db = require('./db.json');
const jsonServer = require('json-server');
const _ = require('lodash');

module.exports = {
    runServer: null,
    start(cb) {
        const server = jsonServer.create();
        const router = jsonServer.router(_.cloneDeep(db));
        const middlewares = jsonServer.defaults();
        server.use(middlewares);
        server.use(router);

        this.runServer = server.listen(3000, () => {
            console.log('JSON Server is running');
            cb();
        });
    },
    stop(cb) {
        if (this.runServer) {
            this.runServer.close(() => {
                console.log('JSON Server is stopped');
                cb();
            });
        }
    }
};


