const { User } = require("../../model/user")
const bcrypt = require("bcrypt");
const login = async(req, res) => {
    const { email, password } = req.body;
    if (email.trim().length == 0 || email.trim().length == 0) {
        return res.status(400).render("admin/error", { msg: "电子邮件或者密码错误" })
    };
    let user = await User.findOne({ email: email });
    if (user) {
        const re = await bcrypt.compare(password, user.password)
        if (re) {
            //将用户名存储在session对象中
            req.session.username = user.username;
            //将角色存储在session对象中
            req.session.role = user.role;
            req.app.locals.userInfo = user;
            //判断角色
            if (user.role == "admin") {
                //重定向
                res.redirect("/admin/user")
            } else {
                res.redirect("/home/")
            }
        } else {
            res.status(400).render("admin/error", { msg: "电子邮件或者密码错误" })
        }
    } else {
        res.status(400).render("admin/error", { msg: "电子邮件或者密码错误" })
    }
};
module.exports = login;