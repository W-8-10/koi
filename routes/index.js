var express = require('express');
var router = express.Router();
var Mock = require("mockjs")
/* GET home page. */
router.get('/assets', function(req, res, next) {
    res.json({
        status: 200,
        message: '获取数据成功',
        data: {
            TotalAssets: 1580.0154,
            maitake: 3.2154,
            Compare: '4.02%'
        }
    });
});
router.get('/announcement', function (req, res, next) {
  let data = Mock.mock({
      status: 200,
      message: '获取数据成功',
      Tips: '内容可以先用溢出部分隐藏起来',
        // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
      'list|3-5': [{
          // 属性 id 是一个自增数，起始值为 1，每次增 1
          'id|+1': 1,
          'content': '@cparagraph'
      }]
      }
  );
  res.json(data);
});
router.get('/RewardPool', function (req, res, next) {
    let data = Mock.mock({
            status: 200,
            message: '获取数据成功',
            'data': [{
                'total': 200000000,
                'Remaining': 133495454
            }]
        }
    );
    res.json(data);
});
module.exports = router;
