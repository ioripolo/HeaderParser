var express = require('express');
var app = express();

app.set('view engine', 'pug');
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname +'/views');

app.get("/", function(req, res) {
  res.render('index', {
    title: 'HeaderParser',
    abstract: '基本API使用：HeaderParser微服务',
    stories: {
      0: '用户在浏览器输入该地址后，返回用户的 IP 地址，语言，操作系统等信息。'
    },
    usage: {
      0: '',
    },
    result: '{"ipaddress":"220.181.171.93","language":"zh-CN","software":"Windows NT 6.1; Win64; x64"}'
  });
});

app.get('/whoami', function(req, res) {
  var parsedInfo = {
    ipaddress: req.headers['x-forwarded-for'],
    language: req.headers['accept-language'].split(',')[0],
    software: req.headers['user-agent'].split('(')[1].split(')')[0]
  };
  res.end(JSON.stringify(parsedInfo));
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});