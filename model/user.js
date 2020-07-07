//创建用户集合规则
const mongoose = require("mongoose");
//导入bcrypt
const bcrypt = require("bcrypt");
const Joi = require("joi");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 16
    },
    email: {
        type: String,
        required: true,
        //设置独一无二
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    //0为启动状态 1为禁用状态
    state: {
        type: Number,
        default: 0
    }
});
const User = mongoose.model("User", userSchema);
async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash("123456", salt);
    const user = await User.create({
        username: "itheima",
        email: "itheima@qq.com",
        password: password,
        role: "admin",
        state: 0
    })
}
//验证用户信息
const validatauser = async(user) => {
        const schema = {
            username: Joi.string().min(4).max(16).required().error(new Error("用户名不符合要求")),
            email: Joi.string().email().required().error(new Error("邮箱格式不符合")),
            password: Joi.string().regex(/^[a-zA-Z0-9_!]{6,16}$/).required().error(new Error("密码不符合格式")),
            role: Joi.string().valid("normal", "admin").required().error(new Error("角色不合法")),
            state: Joi.number().valid(0, 1).required().error(new Error("用户状态不合法")),
        };
        return await Joi.validate(user, schema);
    }
    //createUser();
module.exports = {
    User: User,
    validatauser: validatauser
};