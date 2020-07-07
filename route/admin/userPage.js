const { User } = require("../../model/user");
module.exports = async(req, res) => {
    //标识  表示当前访问的是用户管理页面
    req.app.locals.currentLink = "user";
    //接受客户端传递的当前页参数
    let page = req.query.page || 1;
    //每一页显示的数据条数
    let pagesize = 4;
    //查询用户数据的条数
    const count = await User.countDocuments({});
    //总页数
    let total = Math.ceil(count / pagesize);
    //页码对应数据查询开始位置
    let start = (page - 1) * pagesize;
    //查询用户信息 限制查询页面  跳过一部分数据
    let users = await User.find({}).limit(pagesize).skip(start);
    res.render("admin/user", {
        users: users,
        page: page,
        total: total,
        count: count
    });
}