const { CleanWebpackPlugin }  = require("clean-webpack-plugin");
const path = require("path");
//使用node的模块

module.exports = {
    //这就是我们项目编译的入口文件
    entry: "./src/index.js",
    output: {
        filename: "[name].chunkhash.bundle.js",
        chunkFilename: "[name]/[name].chunkhash.bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    resolve: {
        extensions: [".js"]
    },
    module:{
        rules: [{
            test: /\.less$/,
            use: ["style-loader", "css-loader", "less-loader"]
        }],
    },
    devServer:{
        static:"./dist",
        port: 8081
    },
    //这里就是一些插件
    plugins:[
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["./dist"]
        })
    ],
    mode: "production"
};