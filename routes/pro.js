var express = require('express');
var router = express.Router();
var Mock = require("mockjs")
/* GET home page. */
// 商品购买历史的接口
router.get('/history', function (req, res, next) {
    // 拓展mockjs
    Mock.Random.extend({
        phone: function () {
            var phonePrefixs = ['132', '135', '189','153','199'] // 自己写前缀哈
            return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
        }
    })
    console.log(Mock.Random.phone())
// 生成 1 - 10 个 随机手机号码
    let { phone } = Mock.mock({
        'phone|5-10': [{
            phone: '@phone',
            number: 1,
            time: 1
        }],

    })
    res.json({
        status: 200,
        message: '获取数据成功',
        data: {
            phone
        }
    });
});
// 商品详情的接口
router.get('/details', function (req, res, next) {
    if (req.query.id === '1') {
        let data = Mock.mock({
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                list: {
                    id: 1,
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    InstantDeath: '1:38:29',
                    OriginalPrice: 3999,
                    CurrentPrice: 2000,
                    total: 2500,
                    SoldOut: 1258,
                    title: '锦鲤AI算力机-K1'
                }
            }
        );
        res.json({
            status: 200,
            message: '获取数据成功',
            query: req.query,
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
            data: {
                data
            }
        });
    } else {
        res.json({
            status: 300,
            message: '没有的对应的商品数据',
            // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
        });
    }
});
// router.get('/RewardPool', function (req, res, next) {
//     let data = Mock.mock({
//             status: 200,
//             message: '获取数据成功',
//             'data': [{
//                 'total': 200000000,
//                 'Remaining': 133495454
//             }]
//         }
//     );
//     res.json(data);
// });
module.exports = router;
