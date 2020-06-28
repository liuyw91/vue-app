let proxyObj = {};
// proxyObj['/ws'] = {
//     ws: true,
//     target: "ws://localhost:8081"
// };
proxyObj['/'] = {
    ws: false,
    target: 'http://localhost:8083',
    changeOrigin: true,
    pathRewrite: {
        '^/': ''
    }
}
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8082,
        proxy: proxyObj
    }
}