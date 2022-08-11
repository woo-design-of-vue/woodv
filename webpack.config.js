const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
//使用node的模块

module.exports = {
    entry: path.join(__dirname, "./src/index.js"),
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "[name].js"
    },
    resolve: {
        extensions: [".js", ".json", ".css"],
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: "css-loader"},
                    { loader: "less-loader" }
                ]
            }, {
                test: /\.(js|jsx)$/,
                loader: "babel-loader"
            }
        ],
    },
    devServer: {
        port: 8081,
        host: "0.0.0.0"
    },
    devtool: "source-map",
    optimization: {
        chunkIds: "named",
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html",
            scriptLoading:""
        }),
        new CleanWebpackPlugin(),
        new UglifyJSPlugin({
            sourceMap: true,
        }),
        new MiniCssExtractPlugin()
    ],
    mode: "production"
};
