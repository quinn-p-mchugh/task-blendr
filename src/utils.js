/**
 * Converts a spreadsheet column number to its corresponding column letter.
 *
 * @param {int} colNum The column number to be converted
 * @return The corresponding column letter.
 */
function colNum2Letter(colNum) {
  var temp = '';
  var colLetter = '';
  while (colNum > 0) {
    temp = (colNum - 1) % 26;
    colLetter = String.fromCharCode(temp + 65) + colLetter;
    colNum = (colNum - temp - 1) / 26;
  }
  return colLetter;
}

/**
 * Converts a spreadsheet column letter to its corresponding column number.
 *
 * @param {char} colLetter The column letter to be converted.
 * @return colNum The corresponding column number.
 */
function letter2ColNum(colLetter) {
  var colNum = 0;
  var length = colLetter.length;
  for (var i = 0; i < length; i++) {
    colNum += (letter.charCodeAt(i) - 64) * Math.pow(26, length - i - 1);
  }
  return colNum;
}

/**
 * Check if a given value is a RichTextValue
 * 
 * @param {string, RichTextValue} The value to test.
 * @return True if
 */
function isRichTextValue(value) {
  if (value && typeof value.getRuns === 'function') {
    return true;
  }
  return false;
}

