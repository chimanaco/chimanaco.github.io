/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var app = express();

// add start
var twitter = require('ntwitter');
var io = require('socket.io').listen(app);
// Twitter APIを使うためのおまじない
var twitter = new twitter({
  consumer_key: 'LJOtcBVoW94vUjPjaLQckg',
  consumer_secret: 'pUOh0AjV2TxflvwWq9EKh0i0MheujZDZFqPYEdtg',
  access_token_key: '5825042-OSx27QFZ043NictCjgKcY4yZ7y3RRds9DQqjDooS9Y',
  access_token_secret: 'LwhELSkDGgGFHvqRqWsCRud7SPdHeixyGCQuBDvKdU'
});
// add end

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// del start
//app.get('/', routes.index);
// del end
app.get('/users', user.list);

// update start
//http.createServer(app).listen(app.get('port'), function(){
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
// update end

// add start
var io = require('socket.io').listen(server);
var keyword = "AKB48";
app.get('/', function(req, res){
  // リクエストからキーワードを取得する
  if (req.query.keyword) {
    keyword = req.query.keyword;
  }
  res.render('index', {
    keyword: keyword
  });
  
  // Twitter Streaming APIを呼び出す
  twitter.stream('statuses/filter', {'track': keyword},function(stream) {
    stream.on('data', function (data) {
      io.sockets.emit('message',data.text);
    });
    stream.on('end', function (response) {
      // 切断された場合の処理
    });
    stream.on('destroy', function (response) {
      // 接続が破棄された場合の処理
    });
  });
});
// add end