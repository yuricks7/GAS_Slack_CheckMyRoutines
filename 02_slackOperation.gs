/**
 * メッセージをSlackに投稿する
 * 
 * @param {string} 作成したSlackメッセージ
 */
function postMessage(m) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');

 //SlackApp インスタンスの取得
  var slackApp = SlackApp.create(token);
  var targetChannelId = '#practice';

  slackApp.postMessage(
    targetChannelId, 
    m, 
    {username: 'SlackBot練習さん'}
  );
}

/* -----------------------------編集中----------------------------- */

///**
// * ●●する
// * 
// * @param {●●} ●●
// * @param {●●} ●●
// * 
// * @return {●●} ●●
// * 
// * @customfunction
// */
//var getSlackReaction = function() {
//
//}
//
///**
// * ●●する
// * 
// * @param {●●} ●●
// * @param {●●} ●●
// * 
// * @return {●●} ●●
// * 
// * @customfunction
// */
//var getSlackMsg = function() {
//
//}

/* -----------------------------編集中----------------------------- */