const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
require("./model/connect");
const bodyparser = require("body-parser");
const template = require("art-template");
const dateFormat = require("dateformat");
const morgan = require("morgan");
const config = require("config");
app.use(bodyparser.urlencoded({ extended: false }));
//require("./model/user");
app.engine("art", require("express-art-template"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "art");
app.use(express.static(path.join(__dirname, "public")));
console.log(config.get("title"));
//获取系统环境变量  返回值是对象
if (process.env.NODE_ENV == "development") {
    console.log("当前是开发环境");
    //在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan("dev"));
} else {
    console.log("当前是生产环境");
}
app.use(session({
    secret: "secret key",
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))
const home = require("./route/home");
const admin = require("./route/admin");
app.use("/admin", require("./middleware/loginGuard"));
//为路由匹配请求路径
app.use("/home", home);
app.use("/admin", admin);
template.defaults.imports.dateFormat = dateFormat;
app.use((err, req, res, next) => {
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != "path") {
            params.push(attr + "=" + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join("&")}`)
})
app.listen(80);
console.log("网站服务器启动成功");