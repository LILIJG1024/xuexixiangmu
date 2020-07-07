//引入formidable
const formidable = require("formidable");
const path = require("path");
const { Article } = require("../../model/article");
module.exports = (req, res) => {
    //创建表单解析对象
    const obj = new formidable.IncomingForm();
    //创建文件上传文件夹 并配置文件存放于新建文件夹
    obj.uploadDir = path.join(__dirname, "../", "../", "public", "uploads");
    obj.keepExtensions = true;
    obj.parse(req, async(err, fields, files) => {
        //1.err是错误对象
        //2.fields是对象类型，保存普通表单数据
        //3.files是对象类型，保存和上传文件相关的数据
        // res.send(files.cover.path.split("public")[1]);
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split("public")[1],
            content: fields.content
        });
        res.redirect("/admin/article");
    })
}