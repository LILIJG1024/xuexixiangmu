const { Article } = require("../../model/article");
const pagination = require("mongoose-sex-page");

module.exports = async(req, res) => {
    const page = req.query.page;
    //标识  表示当前访问的是用户管理页面 并且开放
    const count = await Article.countDocuments({});
    req.app.locals.currentLink = "article";
    //查询所有文章的数据
    //page  当前页
    //size  指定每页显示的数据条数
    //display  指定客户端要显示的页码数量
    //exec  向数据库中发送查询请求
    let articles = await pagination(Article).find().page(page).size(4).display(3).populate("author").exec();
    res.render("admin/article", {
        articles: articles,
        count: count
    });
}