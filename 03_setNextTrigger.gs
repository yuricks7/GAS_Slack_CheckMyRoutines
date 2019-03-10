/**
 * ●●する
 * 
 * @param {●●} ●●
 * @param {●●} ●●
 * @return {●●} ●●
 * @customfunction
 */
function setNextTrigger() {
  Logger.log('次のトリガーを設定しました。')
     
  const TARGET_FUNCTION = 'CheckMyRoutines';

  // いったん全部消す
  deleteTriggers(TARGET_FUNCTION);
  
  // 現在時刻を取得
  var date       = new Date();
  var hour       = date.getHours();
  var minminute  = date.getMinutes();
  
  // 設定時刻を取得
  var targetDate = setNextTime(date, hour, minminute);

  // トリガーをセット
  ScriptApp.newTrigger(TARGET_FUNCTION).timeBased().at(targetDate).create();
}

/* 全部消すやつ */

/**
 * ●●する
 * 
 * @param {●●} ●●
 * @param {●●} ●●
 * @return {●●} ●●
 * @customfunction
 */
function deleteTriggers(functionName) {

  var triggers = ScriptApp.getProjectTriggers();
  
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() !== functionName) continue;
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

/* 10:25 か 11:25 か 11:55 にセット */

/**
 * ●●する
 * 
 * @param {●●} ●●
 * @param {●●} ●●
 * @return {●●} ●●
 * @customfunction
 */
function setNextTime(date, hour, minute) {
  
  // 現在10:25なら11:25にセット
  if (hour === 10) {
    hour = 11;
    date.setHours(hour);
    
  // 現在11:15なら11:55にセット
  } else if (hour === 11 && minute === 25) {
    minute = 55;
    date.setMinutes(minute);
    
  // 現在11:55（もしくは初回）なら翌日の10:25にセット
  } else {
    date.setDate(date.getDate() + 1);
    hour   = 10;
    minute = 25;
    date.setHours(hour);
    date.setMinutes(minute);
  }
  
  // 代入した日時を返す
  return date;
}