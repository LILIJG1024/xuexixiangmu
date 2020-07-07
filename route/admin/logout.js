module.exports = (req, res) => {
    //删除session  cookie
    req.session.destroy(function() {
        res.clearCookie("connect.sid");
        res.redirect("/admin/login");
        //清楚模板中的用户信息
        req.app.locals.userInfo = null;
    });
}