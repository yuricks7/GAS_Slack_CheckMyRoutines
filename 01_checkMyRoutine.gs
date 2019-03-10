//このスクリプトにバインドされているスプレッドシートを取得
var googleSpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
//今回のCk対象シート
var routineCheckSheet = googleSpreadSheet.getSheetByName('ルーティンCK');
var values = routineCheckSheet.getDataRange().getValues();  

/* ---------------------ここまでグローバル--------------------- */

//メイン
function CheckMyRoutines() {
  // 実行したら今回のトリガーは一旦消す（→02_setTriggerで夜に再設定）
  setNextTrigger
  
  var today = Moment.moment();
  var todayRowIndex = getExecutionDateRow(today, routineCheckSheet);  
  
  var currentInputTime = getInputTime(today, todayRowIndex);

  var inputTimeMessage = createInputTimeMessage(currentInputTime);

  var borderLine = '=============================================';
  Logger.log('\n' + borderLine + 
             '\n' + inputTimeMessage +
             '\n' + borderLine);
  
  var now = today.format('HH:mm');
  var currentTimeMessage = '【現在時刻】 ' + now;
  Logger.log(currentTimeMessage);

  var finishCheckReturnObject = isCorrectTime(
    now,
    currentInputTime,
    finishCheckReturnObject
  );
  
  var slackMessage = createSlackMessage(finishCheckReturnObject.isFinish, inputTimeMessage);
    
  postMessage(slackMessage);
}

/*
 ▼ドキュメンテーションコメントの書き方
 https://tonari-it.com/gas-documentation-comment/
*/

/**
 * 実行日が入力されている行を探す 
 * 
 * @param {MomentObject} 検索したい日付のMomentオブジェクト
 * @param {SpreadSheet} この関数で日付を検索したいシート
 * @return {number} 実行日が入力されている行数
 * @customfunction
 */
function getExecutionDateRow(dateMomentObject, targetSheet) {
  var formatToday = dateMomentObject.format('YYYY/MM/DD (ddd)');
  Logger.log('【実行日】 %s', formatToday);  

  //3行目から最終行まで走査
  const FIRST_DATA_ROW = 3
  var firstDateIndex = FIRST_DATA_ROW - 1;
  var lastDateIndex = values.length - 1;
  for (var i = firstDateIndex; i <= lastDateIndex; i++) {

    //処理対象の日付（1列目）をログで見やすいように変換しておく
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
 * @param {Object} 検索したい日付のMomentオブジェクト
 * @param {SpreadSheet} この関数で日付を検索したいシート
 * @return {number} 実行日が入力されている行数
 * @customfunction
 */
function getInputTime(dateMomentObject, targetIndex) {
  const FIRST_ROW = 1
  var targetRow   = FIRST_ROW + targetIndex;

  const HOUR_INPUT_COL = 5
  var hourColIndex     = HOUR_INPUT_COL - 1;
  var minuteColIndex   = hourColIndex   + 1;  

  var inputHourValue   = values[targetIndex][hourColIndex];
  var inputMinuteValue = values[targetIndex][minuteColIndex];

  var blankItem = getBlankItem(inputHourValue, inputMinuteValue);

  var curentInputTime = hasDoneInput(
    hasDoneInput(blankItem),
    dateMomentObject,
    inputHourValue,
    inputMinuteValue
  );
    
  return curentInputTime
};

/**
 * 指定の行に空欄があれば、空欄の要素を返す
 * 
 * @param {number} 時
 * @param {number} 分
 * @return {string} 空欄の要素
 * @customfunction
 */
function getBlankItem(inputHour, inputMinute) {
var blankItem =""

  switch (true) {
    case (inputHour === '' && inputMinute === ''):
      blankItem = '時刻';
      return blankItem;
      
    case (inputHour === ''):
      blankItem = '時';
      return blankItem;
      
    case (inputMinute === ''):
      blankItem = '分';
      return blankItem;

    default:
      blankItem ='';
      return blankItem;
  };
};

/**
 * 指定の行に、時・分が入力されているかチェックする
 * 
 * @param {string} 空欄の要素
 * @return {boolean} 入力できているかどうか
 * @customfunction
 */
function hasDoneInput(blankItem) {
  switch (blankItem) {
    case '':
      return true;
    default:
      return false;
  }
};

/**
 * 入力できていれば、連結してMomentオブジェクトに変換する
 * 
 * @param {boolean} 入力できているかどうか
 * @param {object} 実行日当日のMomentオブジェクト
 * @return {object} 'HH:mm'形式のMomentオブジェクト
 * @customfunction
 */
function getInputTime(isInput, dateMomentObject, hourValue, minuteValue) {
  switch (isInput === true) {
    case (true):
      return formatInputTime(dateMomentObject, hourValue, minuteValue);
    case (false):
      return '';
  };
};

/**
 * Momentオブジェクトを'HH:mm'形式に変換
 * 
 * @param {Object} Momentオブジェクト
 * @param {number} 時
 * @param {number} 分
 * @return {Object} 'HH:mm'形式のMomentオブジェクト
 * @customfunction
 */
function formatInputTime(dateMomentObject, hourValue, minuteValue) {
  var inputTimeObject = Moment.moment([
    dateMomentObject.format('YYYY'), /*年*/ 
    dateMomentObject.format('MM'),   /*月*/
    dateMomentObject.format('DD'),   /*日*/
    hourValue,   /*時*/ 
    minuteValue, /*分*/ 
    0            /*秒*/
  ]);
  
  return inputTimeObject.format('HH:mm');
};

/**
 * ●●する
 * 
 * @param {●●} ●●
 * @param {●●} ●●
 * @return {●●} ●●
 * @customfunction
 */
function createInputTimeMessage(inputTime, blankItem) { 
  var emptyAlert = createEmptyAlert(inputTime, blankItem);

  var inputTimeMessage = '【入力時刻】 ' + inputTime + '\n'
                       + emptyAlert;

  return inputTimeMessage;
};

/**
 * 空欄があるかどうかのメッセージを作成する
 * 
 * @param {Object} Momentオブジェクトの'HH:mm'形式
 * @param (String} 空欄の要素
 * @return {String} 作成したメッセージ
 * @customfunction
 */
function createEmptyAlert(inputTime, blankItem) {
  switch (inputTime === '') {
    case (true):
      return '▼注意！▼ 「' + blankItem + '」が空欄です。';
    case (false):
      return '▼OK!!▼ 「時・分」は共にちゃんと入力されてますね。';
  };
};

/**
 * 現在時刻より前で入力できているかチェックする
 * 
 * @param {number} 時
 * @param {number} 分
 * @return {Object} チェック結果（入力されているかどうか、空欄の項目）
 * @customfunction
 */
function isCorrectTime(timeMomentObject, inputTime, tmpReturns) {
  var ret = false
  
  switch (inputTime !== '' && inputTime <= timeMomentObject) {
    case (true):
      return true;

    case (false): //空欄アリなど
      return false;
  };
};