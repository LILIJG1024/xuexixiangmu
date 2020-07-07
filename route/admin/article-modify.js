const { Article } = require("../../model/article");
module.exports = async(req, res) => {
    const id = req.query.id;
    const { title, author, publishDate, cover, content } = req.body;
    let article = await Article.findOne({ _id: id });
    await Article.updateOne({ _id: id }, {
        titie: title,
        publishDate: publishDate,
        cover: cover,
        content: content
    });
    res.redirect("/admin/article")
}