function createBotMsg(today, checkedItems) {

}

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

function getSlackReaction() {

}

function getSlackMsg() {

}