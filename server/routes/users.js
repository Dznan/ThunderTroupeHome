const router = require('koa-router')()
const models = require('../src/controller/index');
const sendMail = require('../src/mail/mail')

const User = models.User
const Register = models.Register

router.prefix('/users')

router.get('/query', async function (ctx, next) {
  // ctx.body = 'this is a users response!'
  const res = await User.find()
  const register = await Register.find()
  ctx.body = {
    code: 'ok',
    data: {
      register: register,
      volunteer: res
    }
  }
})
router.get('/auth', function (ctx, next) {
  let req = ctx.query
  if (req.username === 'admin' && req.password === 'lyjt') {
    ctx.body = {
      code: 'ok',
      msg: '登录成功'
    }
  } else {
    ctx.body = {
      code: 'false',
      msg: '用户名或者密码不正确'
    }
  }
})

router.post('/sign', async function (ctx, next) {
  let req = ctx.request.body
  let reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
  if (reg.test(req.email)) {
    let data = {
      username: '',
      email: '',
      phone: '',
      reservation: [],
      create: new Date()
    }
    data.username = req.username
    data.reservation = data.reservation.push(Number(req.reservation))
    data.email = req.email
    data.phone = req.phone

    const check = await Register.find({ email: req.email })
    const checkR = await Register.find({ email: req.email, reservation: Number(req.reservation) })
    let res
    if (check.length === 0) {
      res = await new Register(data).save()
      if (res) {
        let address = req.email
        let sendResult = await sendMail(address,Number(req.reservation),req.username)
        if (sendResult) {
          ctx.body = {
            code: true,
            msg: '报名成功，请留意邮箱报名信息'
          }
        } else {
          ctx.body = {
            code: false,
            msg: '邮件发送失败，请稍后重试'
          }
        }
      } else {
        ctx.body = {
          code: false,
          msg: '未知错误'
        }
      }
    } else {
      if (checkR.length === 0) {
        let update = {
          reservation: Number(req.reservation)
        }
        res = await Register.update({ email: req.email }, { $addToSet: update })
        if (res) {
          let address = req.email
          let sendResult = await sendMail(address,Number(req.reservation),req.username)
          if (sendResult) {
            ctx.body = {
              code: true,
              msg: '报名成功，请留意邮箱报名信息'
            }
          } else {
            ctx.body = {
              code: false,
              msg: '邮件发送失败，请稍后重试'
            }
          }
        } else {
          ctx.body = {
            code: false,
            msg: '未知错误'
          }
        }
      } else {
        ctx.body = {
          code: false,
          msg: '您已经预约该时段。'
        }
      }
    }
  } else {
    ctx.body = {
      code: false,
      msg: '邮箱地址不合法'
    }
  }
})

router.post('/add', async function (ctx, next) {
  let req = ctx.request.body
  console.log(ctx.request)
  let data = {
    name: '',
    work: '',
    email: '',
    phone: '',
    create: new Date()
  }
  const check = await User.find({ email: req.email })
  if (req.email !== undefined && req.email !== '' && check.length !== 0) {
    ctx.body = {
      code: 'fail',
      msg: '该邮箱已经登记'
    }
  } else {
    if (req.username !== undefined && req.username !== '' && req.email !== undefined && req.email !== '' && req.work !== undefined && req.work !== '') {
      data.name = req.username
      data.work = req.work
      data.email = req.email
      if (req.phone) {
        data.phone = req.phone
      }
      const res = await new User(data).save()
      if (res) {
        ctx.body = {
          code: 'ok'
        }
      } else {
        ctx.body = {
          code: 'fail',
          msg: '未知错误'
        }
      }
    } else {
      ctx.body = {
        code: 'fail',
        msg: '输入信息缺失'
      }
    }
  }
})

module.exports = router
