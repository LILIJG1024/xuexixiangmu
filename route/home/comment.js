const { Comment } = require("../../model/comment")
module.exports = async(req, res) => {
    const { uid, aid, content } = req.body;
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });
    //重定向
    res.redirect("/home/article?id=" + aid);
}