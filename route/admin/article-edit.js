const { Article } = require("../../model/article");
module.exports = async(req, res) => {
    //标识  表示当前访问的是用户管理页面
    req.app.locals.currentLink = "article";
    const { id } = req.query
    if (id) {
        let article = await Article.findOne({ _id: id });
        res.render("admin/article-edit", {
            article: article,
            link: "/admin/article-modify?id=" + id,
            button: "修改"
        })
    } else {
        res.render("admin/article-edit", {
            link: "/admin/article-add",
            button: "添加"
        });
    }
}