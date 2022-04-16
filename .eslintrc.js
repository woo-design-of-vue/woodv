module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "eslint:recommended"
    ],
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        parser: "babel-eslint"
    },
    rules: {
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "semi": 1,
        "eqeqeq": 2,
        "space-before-function-paren": 0,
        "quotes": 1, // 字符使用双引号
        "indent": 1, //缩进4个单位
        "comma-spacing": 1, //逗号前后的空格
        "id-match": 2, //命名检测
        "prefer-const": 1, //优选const
        "camelcase": 1, //强制驼峰法命名
        "newline-after-var": 1, //变量声明后是否需要空一行
    }
};
