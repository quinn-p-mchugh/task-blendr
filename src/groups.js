const TREE_SYMBOL = "└─"

function indentAllTasksByGroupDepth() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let tasks = getTasks();
  let newTaskTitles = [];
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i]
    let taskDepth = sheet.getRowGroupDepth(i + TASK_START_ROW);
    let taskName = task[COL_NUM_TASK_TITLE - 1]
    if (taskDepth > 0) {
      
      taskName.setValue("       ".repeat(taskDepth - 1) + TREE_SYMBOL + "" + taskName.getValue().toString().replace('─', '').replace('└','').trim());
    }
    newTaskTitles.push()
  }
}

function generateTaskTree() {
  // TODO
  let rowGroupArr = getRowGroups();

  if (task_depth > 0) {
    let task_depth_preceding = sheet.getRowDepth(i-1);
    let task_depth_succeeding = sheet.getRowDepth(i+1);
    let task_name = sheet.getRange(i, COL_NUM_TASK_TITLE);
    let treeArr = new Set();
    for (let j=task_depth; j>0; j--) {}
      if (task_depth_preceding < task_depth-1) {
        treeArr.unshift("──");
      }
      else if (task_depth_preceding === task_depth && task_depth_succeeding === task_depth) {
        treeArr.unshift("├─");
      }
      task_name.setValue("       ".repeat(task_depth - 1) + TREE_SYMBOL + "" + task_name.getValue().toString().replace('─', '').replace('└','').trim());
  }
}

/*
 * Finds all row groups in a specified spreadsheet and returns them as an array of Group objects.
 * 
 * @param sheet A Sheet object indicating the sheet who's row groups will be returned.
 * @returns An array containing each row group in the specified spreadsheet.
 */
function getRowGroups() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let numRows = sheet.getMaxRows();
  let rowGroupsArr = [];
  for (let i=1; i<=numRows; i++) {
    try {
      let rowGroup = sheet.getRowGroup(i, sheet.getRowGroupDepth(i));
      rowGroupsArr.push(rowGroup);
      console.log(rowGroup.getRange().getA1Notation());
    } catch(e) {
      console.log(e);
    }
  }
  rowGroupsArr = removeDuplicateRowGroups(rowGroupsArr);
  return rowGroupsArr;
}

function removeDuplicateRowGroups() {
  // TODO
}

/*
 * Indents the a single task according to its row group depth.
 * 
 * @param {Sheet} sheetEdited A Sheet object indicating the sheet containing the specified task to indent.
 * @param {int} rowEdited An integer indicating the row on which the task is located.
 */
function indentTaskByGroupDepth(sheetEdited, rowEdited) {
  let task_depth = sheetEdited.getRowGroupDepth(rowEdited);
  if (task_depth > 0) {
      let task_name = sheetEdited.getRange(tasksColLetter + rowEdited);
      task_name.setValue("       ".repeat(task_depth - 1) + TREE_SYMBOL + "" + task_name.getValue().toString().replace('─', '').replace('└','').trim());
  }
}
