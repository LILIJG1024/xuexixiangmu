const { User, validatauser } = require("../../model/user");
const bcrypt = require("bcrypt");
module.exports = async(req, res, next) => {
    //实施验证
    try {
        await validatauser(req.body);
    } catch (ex) {
        return next(JSON.stringify({ path: "/admin/user-edit", message: ex.message }))
    }
    //根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return next(JSON.stringify({ path: "/admin/user-edit", message: "邮箱地址被占用 " }))
    }
    //对密码进行加密处理
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    //替换
    req.body.password = password;
    await User.create(req.body);
    res.redirect("/admin/user");
};