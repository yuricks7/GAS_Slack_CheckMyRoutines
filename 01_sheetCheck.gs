//このスクリプトにバインドされているスプレッドシートを取得
var googleSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
//今回のCk対象シート
var routineCheckSheet = googleSpreadSheet.getSheetByName('ルーティンCK');
var values            = routineCheckSheet.getDataRange().getValues();  

/* ---------------------ここまでグローバル--------------------- */

//メイン
function Main() {
  // 実行したら今回のトリガーは一旦消す（→'03_triggerOperation.gs'で夜に再設定）
  const TARGET_FUNCTION_NAME = 'Main';
  setNextTrigger(TARGET_FUNCTION_NAME);
  
  var today         = Moment.moment();
  var todayRowIndex = getExecutionDateRow(today, routineCheckSheet);  

  var now = today.format('HH:mm');

  // ログ取り用
  var currentTimeMessage = '【実行時刻】 ' + now;
  Logger.log(currentTimeMessage);

  var inputTimeObject  = getInputTime(today, todayRowIndex);  
  var inputTime        = inputTimeObject.inputTime;
  var blankItem        = inputTimeObject.blankItem;
  
  var slackMessage = joinMessages(
    isCorrectInput(inputTime, now),
    createInputTimeMessage(inputTime),
    createEmptyAlert(blankItem)
  );
    
  postMessage(slackMessage);
}

/*
 ▼ドキュメンテーションコメントの書き方
 https://tonari-it.com/gas-documentation-comment/
*/

/**
 * 実行日が入力されている行を探す 
 * 
 * @param {object} 検索したい日付のMomentオブジェクト
 * @param {object} この関数で日付を検索したいシート
 * @return {number} 実行日が入力されている行数
 * @customfunction
 */
var getExecutionDateRow = function(dateMomentObject, targetSheet) {
  //処理対象の日付（1列目）をログで見やすいように変換しておく  
  var formatToday = dateMomentObject.format('YYYY/MM/DD (ddd)');
  Logger.log('【実行日】 %s', formatToday);  
  
  //3行目から最終行まで走査
  const FIRST_DATA_ROW = 3
  var firstDateIndex   = FIRST_DATA_ROW - 1;
  var lastDateIndex    = values.length - 1;
  for (var i = firstDateIndex; i <= lastDateIndex; i++) {

    var executionDate = Moment.moment(values[i][0]).format('YYYY/MM/DD (ddd)');
    if (formatToday === executionDate) {
      var todayRow = i + 1;
      Logger.log('本日の処理対象は【' + todayRow + '行目】です。');
      break;
    };
  }
  return i;
}

/**
 * 指定の行に入力された時刻を取得する 
 * 
 * @param {object} 検索したい日付のMomentオブジェクト
 * @param {spreadSheet} この関数で日付を検索したいシート
 * @return {number} 実行日が入力されている行数
 * @customfunction
 */
var getInputTime = function(dateMomentObject, targetIndex) {
  const FIRST_ROW = 1
  var targetRow   = FIRST_ROW + targetIndex;

  const HOUR_INPUT_COL = 5
  var hourColIndex     = HOUR_INPUT_COL - 1;
  var minuteColIndex   = hourColIndex   + 1;  

  var inputHourValue   = values[targetIndex][hourColIndex];
  var inputMinuteValue = values[targetIndex][minuteColIndex];

  var curentInputTime = convertIntoTime(
    getBlankItem(inputHourValue, inputMinuteValue),
    dateMomentObject,
    inputHourValue,
    inputMinuteValue
  );
  
  var inputTimeReturnObject = {
    inputTime: curentInputTime,
    blankItem: getBlankItem(inputHourValue, inputMinuteValue)
  }

  return inputTimeReturnObject;
};

/**
 * 指定の行に空欄があれば、空欄の要素を返す
 * 
 * @param {number} 時
 * @param {number} 分
 * @return {string} 空欄の要素
 * @customfunction
 */
var getBlankItem = function(inputHour, inputMinute) {
  switch (true) {
    case (inputHour === '' && inputMinute === ''):
      return '時刻';      

    case (inputHour === ''):
      return '時';

    case (inputMinute === ''):
      return '分';

    default:
      return '';
  };
};

/**
 * 入力できていれば、連結してMomentオブジェクトに変換する
 * 
 * @param {boolean} 入力できているかどうか
 * @param {object} 実行日当日のMomentオブジェクト
 * @return {object} 'HH:mm'形式のMomentオブジェクト
 * @customfunction
 */
var convertIntoTime = function(blankItem, dateMomentObject, hourValue, minuteValue) {
  switch (blankItem) {
    case (''):
      var returnTimeMomentObject = formatInputTime(
        dateMomentObject,
        hourValue,
        minuteValue);
      return returnTimeMomentObject;
      
    default:
      return 'XX:XX';    
  };
};

/**
 * Momentオブジェクトを'HH:mm'形式に変換
 * 
 * @param oObject} Momentオブジェクト
 * @param {number} 時
 * @param {number} 分
 * @return {object} 'HH:mm'形式のMomentオブジェクト
 * @customfunction
 */
var formatInputTime = function(dateMomentObject, hourValue, minuteValue) {
  var inputDateObject = Moment.moment([
    dateMomentObject.format('YYYY'), /*年*/ 
    dateMomentObject.format('MM'),   /*月*/
    dateMomentObject.format('DD'),   /*日*/
    hourValue,   /*時*/
    minuteValue, /*分*/
    0            /*秒*/
  ]);
  
  return inputDateObject.format('HH:mm');
};

/**
 * 入力した時刻を表示するメッセージを作成する
 * 
 * @param {object} Momentオブジェクトの'HH:mm'形式
 * @param (string} 空欄の要素
 * @return {string} 作成したメッセージ
 */
var createInputTimeMessage = function(targetTime, blankItem) {
  var inputTimeMessage = '【入力時刻】 ' + targetTime

  return inputTimeMessage;
};

/**
 * 空欄があるかどうかのメッセージを作成する
 * 
 * @param {object} Momentオブジェクトの'HH:mm'形式
 * @param (string} 空欄の要素
 * @return {string} 作成したメッセージ
 */
var createEmptyAlert = function(blankItem) {
  switch (blankItem === '') {
    case (false):
      return ':woman-facepalming: <*「' + blankItem + '」* が空欄です。。。';
    case (true):
      return ':woman-gesturing-ok: <OK！空欄はありません！';
  };
};

/**
 * 現在時刻より前で入力できているかチェックする
 * 
 * @param {object} 入力した時刻のMomentオブジェクト（'HH:mm'形式）
 * @param {object} 基準時刻のMomentオブジェクト（'HH:mm'形式）
 * @return {boolean} チェック結果
 */
var isCorrectInput = function(targetTimeObject, comparisonTimeObject) {
  switch (targetTimeObject !== ''
       && targetTimeObject <= comparisonTimeObject) {
    case (true):
      return true;

    case (false): //空欄アリなど
      return false;
  };
};

/**
 * 作成したメッセージをSlack用にまとめる
 * 
 * @param {boolean} 入力が完了しているかどうか
 * @param {string} 入力時刻のメッセージ
 * @param {string} 空白があった場合のメッセージ
 * @return {string} 作成したSlackメッセージ
 */
var joinMessages = function(hasFinishedInput, 
                                inputTimeMsg,
                                emptyMsg) {
  var m = ''
  switch (hasFinishedInput) {
    case (true):
      m = '*' + inputTimeMsg + '*' + '\n'
        + ':woman-tipping-hand:おはようございます！' + '\n'
        + '本日の出勤時刻は入力完了しています。';
      break;
      
    case (false):
      m = '*'  + inputTimeMsg + '*'
        + '\n' + emptyMsg
        + '\n' + ':thinking_face: <う～ん、時刻は正しくないかもしれませんね…？';
      break
  };
  
  // ログ取り用
  var borderLine = '■■■■■■■■■■■■■■■■■■■■■■■■■';
  Logger.log('\n' + borderLine + borderLine
           + '\n' + '↓↓Expected Slack Message↓↓'
           + '\n' + borderLine + borderLine
           + '\n' + m
           + '\n' + borderLine + borderLine);

  return m;
};