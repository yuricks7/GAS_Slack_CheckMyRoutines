/**
 * メッセージをSlackに投稿する
 * 
 * @param {string} 作成したSlackメッセージ
 */
function postMessage(m) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');

 //SlackApp インスタンスの取得
  var slackApp = SlackApp.create(token);

/* -----------------------------編集中----------------------------- */
//  var options = {
//    channelId:   '#practice',
//    userName:    'SlackBot練習さん',
//    message:     m,
//    botIcon:     ':sunglasses:',
//    isSlackUser: false // 絵文字を付けるときはfalseにして(by Slack API)
//  };

//  SlackApp.postMessage(channelId, text, option)
/* -----------------------------編集中----------------------------- */

  var targetChannelId = '#practice'

  slackApp.postMessage(
    targetChannelId, 
    m, 
    {username: 'SlackBot練習さん'}
  );

/* -----------------------------編集中----------------------------- */
//  SlackApp.postMessage(
//    options.channelId, 
//    options.message, 
//    {/* as_user: options.isSlackUser, */
//     /* icon_emoji: options.botIcon, */ 
//     username: options.userName}
//  );
}

/**
 * ●●する
 * 
 * @param {●●} ●●
 * @param {●●} ●●
 * @return {●●} ●●
 * @customfunction
 */
var getSlackReaction = function() {

}

/**
 * ●●する
 * 
 * @param {●●} ●●
 * @param {●●} ●●
 * @return {●●} ●●
 * @customfunction
 */
var getSlackMsg = function() {

}
/* -----------------------------編集中----------------------------- */