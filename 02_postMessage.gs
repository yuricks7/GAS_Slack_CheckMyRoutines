/**
 * ●●する
 * 
 * @param {●●} ●●
 * @param {●●} ●●
 * @return {●●} ●●
 * @customfunction
 */
function createSlackMessage(isFinish, inputTimeMsg) {  
  var m = ''
  
  switch (isFinish === true) {
    case (true):
      m = '*' + inputTimeMsg + '*' + '\n'
      + 'おはようございます！' + '\n'
      + '本日の出勤時刻は入力完了しています。';
      break;
      
    case (false):
      m = '*' + inputTimeMsg + '*' + '\n'
        + 'う～ん、、、' + '\n'
        + '出勤時刻が正しく入力できていないかもしれませんね…？';
      break
  };
  
  var doubleLine = '=============================================';
  Logger.log('\n' + doubleLine + 
             '\n' + 'for Slack' + 
             '\n' + doubleLine + 
             '\n' + m +
             '\n' + doubleLine);
  
  return m;
};

/**
 * ●●する
 * 
 * @param {●●} ●●
 * @param {●●} ●●
 * @return {●●} ●●
 * @customfunction
 */
function postMessage(m) {
  var token = PropertiesService.getScriptProperties().getProperty('SLACK_ACCESS_TOKEN');

 //SlackApp インスタンスの取得
  var slackApp = SlackApp.create(token);
  
//  var options = {
//    channelId:   '#practice',
//    userName:    'SlackBot練習さん',
//    message:     m,
//    botIcon:     ':sunglasses:',
//    isSlackUser: false 
//  }; // 絵文字を付けるときはfalseにして(by Slack API)

//  SlackApp.postMessage(channelId, text, option)

  var targetChannelId = '#practice'

  slackApp.postMessage(
    targetChannelId, 
    m, 
    {username: 'SlackBot練習さん'}
  );
  
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
function getSlackReaction() {

}

/**
 * ●●する
 * 
 * @param {●●} ●●
 * @param {●●} ●●
 * @return {●●} ●●
 * @customfunction
 */
function getSlackMsg() {

}