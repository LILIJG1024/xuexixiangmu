const { User } = require("../../model/user");
module.exports = async(req, res) => {
    //获取要删除的用户id
    const id = req.query.id;
    await User.findOneAndDelete({ _id: id });
    res.redirect("/admin/user");
}