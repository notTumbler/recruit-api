const express = require('express')
const router = express.Router()
const Resume = require('../models/resume')

const filter = { __v: 0 }

let resData = {};
router.use((req, res, next) => {
  resData = {
    code: 0,
    msg: ''
  };
  next();
});
//上传简历
postResume = (req, res) => {
  // name:'',
  // workWill:'',
  // jiaoYu:'',
  // shiXi:'',
  // skills:''
  const { userId, name, workWill, jiaoYu, shiXi, skills } = req.body
  // console.log(name,workWill,jiaoYu,shiXi,skills)
  console.log(userId)
  Resume.findOneAndUpdate({ userId },{userId, name, workWill, jiaoYu, shiXi, skills}).then((item, err) => {
    if (item) {
      console.log('已经有了,将修改这条信息')
      const data = { userId, name, workWill, jiaoYu, shiXi, skills }
      resData.code = 200
      resData.msg = '修改成功'
      resData.data = data
      res.send(resData)
      return false
    } else {
      new Resume({ userId, name, workWill, jiaoYu, shiXi, skills }).save((err, item) => {
        console.log(item)
        resData.code = 200
        resData.msg = '上传成功'
        resData.data = item
        res.send(resData)
      })
    }
  })


}

//获取简历
getResume = (req, res) => {
  const { userId } = req.body
  console.log(userId)
  Resume.findOne({userId})
  .then((item,err) => {
    // const {name} = item
    resData.code = 200
    resData.msg = `获取用户简历信息成功`
    resData.data = item
    res.send(resData)
  })
}
module.exports = {
  getResume,
  postResume
}
