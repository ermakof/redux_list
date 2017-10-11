/**
 * Created by ermakof on 30.09.17.
 */
const http = require('http');

const express = require('express');

const app = express();

app.use(require('morgan')('short'));

(function() {

    const webpack = require('webpack');
    const webpackConfig = require(process.env.WEBPACK_CONFIG ? process.env.WEBPACK_CONFIG : './webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(require("webpack-dev-middleware")(compiler, {
        publicPath: webpackConfig.output.publicPath,
        watchOptions: {poll: true}  , stats: {colors: true}
    }));

    app.use(require("webpack-hot-middleware")(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 3 * 1000, reload: true
    }));

    app.use(express.static(__dirname + '/assets'));
})();


app.get("/", function(req, res) {
    res.sendFile(__dirname + '/assets/index.html');
});

if (require.main === module) {
    const server = http.createServer(app);
    server.listen(process.env.PORT || 8080, function() {
        console.log("Listening on %j", server.address());
    });
}