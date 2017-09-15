const path = require('path')
const fs = require('fs')

const dir_source = path.resolve(__dirname + '/source')
const dir_build = path.resolve(__dirname + '/build')

if ( ! process.env.TARGET) throw new ReferenceError("Missing build env\n ENV = {\n\tTARGET=node/web/webworker/electron-main\n}\n\n https://webpack.js.org/configuration/target/")



let externals = {}
if (process.env.TARGET === "node") {
    fs.readdirSync('node_modules').filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    }).forEach(function(mod) {
        externals[mod] = 'commonjs ' + mod;
    })
}

module.exports = {
    entry: path.resolve(dir_source, 'stdlib.js'),
    target: process.env.TARGET,
    output: {
        filename: `stdlib-${process.env.TARGET}.js`,
        path: dir_build,
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                'env'
                            ],
                        },
                    }
                ]
            }
        ]
    },
};