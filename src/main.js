function onEdit(e) {
  let sheet = SpreadsheetApp.getActiveSheet();
  let rowEdited = e.range.getRow();
  if (sheet.getName() === SHEET_NAME_TASKS && rowEdited >= TASK_START_ROW) {
    addTaskDateAdded(e);
    addTaskUpdatedDate(e);
    updateTaskCompletionDate(e);
    clearFormattingOnEmailTaskDelete(e);
  }
}


/**
 * Get the column number of the column based on its ID.
 * 
 * @param {int} The ID of the column.
 */
function getColNumById(id) {
  let sheet = SpreadsheetApp.getActiveSheet();
  let colIds = sheet.getRange(COL_ID_ROW, 1, 1, sheet.getLastColumn()).getValues()[0];
  for (let i = 0; i < colIds.length; i++) {
    if (colIds[i] === id) {
      return i + 1;
    }
  }
}

function addTaskUpdatedDate(e) {
  let sheet = e.source.getActiveSheet();
  let editedCell = e.range;

  let row = editedCell.getRow();
  let dateUpdatedCell = sheet.getRange(row, COL_NUM_DATE_UPDATED);

  dateUpdatedCell.setValue(new Date());
}

function addTaskDateAdded(e) {
  let sheet = e.source.getActiveSheet();
  let editedCell = e.range;

  if (editedCell.getColumn() === COL_NUM_TITLE && editedCell.getValue() !== "") {
    let row = editedCell.getRow();
    let dateAddedCell = sheet.getRange(row, COL_NUM_DATE_ADDED);
    
    dateAddedCell.setValue(new Date());
  }
}

/**
  * If checkbox was checked, update the "Date Completed" column with the current date.
  */
function updateTaskCompletionDate(e) {
  let range=e.range;
  let activeRow = range.getRow();
  let activeColumn = range.getColumn();
  let cellValue = range.getValue();
  let sheet = SpreadsheetApp.getActiveSheet();

  if (activeColumn === COL_NUM_DONE) {
    if (cellValue === false) {
        sheet.getRange(activeRow, COL_NUM_DATE_DONE).clearContent();
    } else {
        sheet.getRange(activeRow, COL_NUM_DATE_DONE).setValue(new Date());
    }
  }
}

function getTasks() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const numRows = sheet.getLastRow() - TASK_START_ROW + 1;
  const numCols = sheet.getLastColumn();
  const data = sheet.getRange(TASK_START_ROW, 1, numRows, numCols).getValues();
  return data;
}

function getLastRowWithTask() {
  let tasks = getTasks();
  return tasks.map(task => task[COL_NUM_TITLE - 1]).filter(String).length + 1;
}

/**
 * Adds tasks the end of the task list. Each task is a dictionary that maps the column num to its intended value.
 */
function addTasks(newTasks) {
  if (newTasks.length === 0) {
    return;
  };

  let startRow = getLastRowWithTask() + 1;
  let sheet = SpreadsheetApp.getActiveSheet();
  for (let i = 0; i < newTasks.length; i++) {
    Object.entries(newTasks[i]).forEach(([k,v]) => {
      let cell = sheet.getRange(startRow + i, Number(k));
      if (isRichTextValue(v)) {
        cell.setRichTextValue(v);
      } else {
        cell.setValue(v);
      }
    });
  }
}


// BELOW ARE UNUSED

/* 
 * Represents a tabular spreadsheet containing a list of tasks.
 */
var TaskSheet = function(sheetName, headerRow, colNameTaskDesc="Tasks", colNameLastUpdated="Last Updated") {
  /* 
   * @param {str}   sheetName           The name of the sheet.
   * @param {int}   headerRow           A number indicating on which row the table headers are located.
   * @param {char}  colNameTaskDesc     The name of the column containing task descriptions.
   * @param {char}  colNameLastUpdated  The name of the column containing last updated data.
   */
  this.sheet = SpreadsheetApp.getActive().getSheetByName(sheetName)
  this.headerRow = headerRow;
  this.colNameTaskDesc = colNameTaskDesc;
  this.colNameLastUpdated = colNameLastUpdated;
}


/*
 * @param {String} The name of the header to search for.
 */
TaskSheet.prototype.getColLetterOfHeader = function(headerName) {
  let headerRng = this.sheet.getRange(this.headerRow, 1, 1, this.sheet.getMaxColumns());
  let headerCell = searchRangeForValue(headerRng, headerName);
  return col2Letter(headerCell.getColumn());
}; 



