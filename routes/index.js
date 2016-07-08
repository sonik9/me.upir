var express = require('express');
var router = express.Router();
var mailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index', { title: 'UPIR.ME' , name:'Vitalii Upir Page'});

});
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'upir.me@gmail.com',
        pass: 'bridg01QU'
    }
};
var smtpTransport = mailer.createTransport(smtpConfig);

router.post('/mailer', function(req, res, next) {

  console.log(req.body);
    var mailOptions={
        from:"My own site",
        to : "upirvo@gmail.com",
        subject : "upir.me",
        text : req.body.name+" \n"+req.body.email+" \n"+req.body.msg,
        // html: '<b>Hello world 🐴</b>' // html body
    }
    var mailOptionsSender={
        from:"upir.me",
        to : req.body.email,
        subject : "upir.me",
        text : "I have received yor message! \nI will answer you soon. \nThanks ",
        // html: '<b>Hello world 🐴</b>' // html body
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptionsSender, function(error, response){
        if(error){
            return console.log(error);

        }else{
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    res.send('msg send error');
                    return console.log(error);

                }else{
                    res.send('it was sended');
                    return console.log("Message sent: " + response.message);
                }
            });
        }
    });
  
});
module.exports = router;
