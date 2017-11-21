/*
ファイル=>プロジェクトのプロパティ
スクリプトのプロパティ　に以下の2つを設定
SLACK_WEBHOOK_TOKEN:incoming webhookのトークン
POST_URL:outgoing webhookのURL
*/

var SLACK_WEBHOOK_TOKEN = PropertiesService.getScriptProperties().getProperty('SLACK_WEBHOOK_TOKEN');
var POST_URL = PropertiesService.getScriptProperties().getProperty('POST_URL');

function doPost(e) {
    var webhook_token = SLACK_WEBHOOK_TOKEN;
    if (e.parameter.token == webhook_token ) return slack_post_message (e);
    else return 0;
}



function slack_post_message (e){
    var postUrl   = POST_URL
    var jsonData =
    {
      "channel" : e.parameter.channel_name,
      "username" : "tex",
      "text" : "",
      "attachments": [
      {
        "color": "#ff8e2b",
        "image_url": "https://chart.googleapis.com/chart?cht=tx&chl=" + encodeURIComponent(e.parameter.text.substr(3)),
      }
    ]
    };
    var payload = JSON.stringify(jsonData);
    var options =
  {
    "method" : "post",
    "contentType" : "application/json",
    "payload" : payload
  };
  UrlFetchApp.fetch(postUrl, options);
}