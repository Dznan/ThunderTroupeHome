const nodemailer = require('nodemailer');


let transporter = nodemailer.createTransport({
    service: 'Gmail', // 注意，host修改为service
    port: 465, // 端口
    sercure: true, // 是否使用TLS，true，端口为465，否则其他或者568
    auth: {
        user: 'thundertroupe@gmail.com', // 邮箱和密码
        pass: 'SWAHAswaha415'
    }
});

const sendMail = function (address,id,name) {
    let content 
    if(id === 1){
        content =  '<p>尊敬的'+ name + ':</p><p> 您已经成功报名了8月10日19:30，Fort Mason Center for Arts & Culture的演出，我们为您预留了前排座位。期待您的莅临。<p>雷音剧团敬上</p></p>'+'<p>Dear ' + name + ':</p><p>Thank you. You are successfully registered for the performance at 19:30 10th August in Fort Mason Center for Arts & Culture. Your seat is reserved in the front rows. We look forward to seeing you soon.</p><p>Our performance will be in Chinese with English subtitles.</p><p>Best Regards,<br>Thunder Troupe</p>'
    }else if(id === 2){
        content = '<p>尊敬的'+ name + ':</p><p> 您已经成功报名了8月14日19:30，Cubberley Community Center的演出，我们为您预留了前排座位。期待您的莅临。<p>雷音剧团敬上</p></p>'+'<p>Dear ' + name + ':</p><p>Thank you. You are successfully registered for the performance at 19:30 14th August in Cubberley Community Center. Your seat is reserved in the front rows. We look forward to seeing you soon.</p><p>Our performance will be in Chinese with English subtitles.</p><p>Best Regards,<br>Thunder Troupe</p>'
    }else if(id === 3){
        content = '<p>尊敬的'+ name + ':</p><p> 您已经成功报名了8月18日19:30，Jewish Community Center of the East Bay的演出，我们为您预留了前排座位。期待您的莅临。<p>雷音剧团敬上</p></p>' +'<p>Dear ' + name + ':</p><p>Thank you. You are successfully registered for the performance at 19:30 18th August in Jewish Community Center of the East Bay. Your seat is reserved in the front rows. We look forward to seeing you soon.</p><p>Our performance will be in Chinese with English subtitles.</p><p>Best Regards,<br>Thunder Troupe</p>'
    }

    let mailOptions = {
        from: '"thundertroupe" <thundertroupe@gmail.com>', // sender address
        to: address, // list of receivers
        subject: '雷音剧团演出报名确认/The confirmation of registration', // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: content // html body
    };
    return transporter.sendMail(mailOptions)

    // return new Promise((resolve, reject) => {
    //     // send mail with defined transport object
    //     transporter.sendMail(mailOptions, (error, info) => {
    //         if (error) {
    //             reject(error)
    //         } else {
    //             resolve(true)
    //         }
    //         // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    //     });
    // })

}

module.exports = sendMail




