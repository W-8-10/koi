var express = require('express');
var router = express.Router();
// 引入token的插件
const jwt = require('jsonwebtoken')
/* GET users listing. */
router.post('/', function (req, res, next) {
    console.log(req.body)
    if(req.body.username === 'admin'&& req.body.password === '123'){
        // 参数第一个是用户名代表token值指向，第二个代表直接token值生成的密钥，第三个参数就代表expiresIn表示时间，algorithm代表生产方式。
        const token= jwt.sign({username: 'admin'},'ws20040810',{expiresIn: '1d',algorithm: 'HS256'})
        res.json({
            code: 0,
            msg: '登录成功',
            token
        });
    }else{
        res.json({
            code: 400,
            msg: '登录失败'
        });
    }
});

module.exports = router;
