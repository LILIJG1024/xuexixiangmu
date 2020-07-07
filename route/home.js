//创建展示页面
const express = require("express");
const home = express.Router();
home.get("/", require("./home/index"));
home.get("/article", require("./home/article"));
//文章评论路由
home.post("/comment", require("./home/comment"));
module.exports = home;