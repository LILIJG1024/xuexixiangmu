const guard = (req, res, next) => {
    //判断用户访问的是否是登录页面
    if (req.url != "/login" && !req.session.username) {
        res.redirect("/admin/login");
    } else {
        //判断登入角色
        if (req.session.role == "normal") {
            return res.redirect("/home/")
        }
        next();
    }
}
module.exports = guard;