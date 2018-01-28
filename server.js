var express=require('express');
var nodemailer = require("nodemailer");
var mailParser = require("body-parser");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'cwnodemailer@gmail.com',
    pass: 'weakPass1$'
  }
});

var app=express();
app.use(mailParser.json({extended : true}));
app.post('/',function(req,res){
    console.log(req.body);

    var mailOptions = {
        from: req.body[0].emailAddress,
        to: 'charleswymanprogramming@gmail.com',
        subject: req.body[0].subject,
        html: '<p>Message from: ' + req.body[0].firstName + ' ' + req.body[0].lastName+'</p><p>Email: ' + req.body[0].emailAddress +'</p><p>Subject: ' + req.body[0].subject +'</p><p>' + req.body[0].message +  '</p>' 
};

    res.send('success');
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.send('There was an error!');
        } 
        else {
            res.send('Email sent: ' + info.response);
        }
    });

});
app.listen(3000);