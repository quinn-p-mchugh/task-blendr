/* This module defines functions related to syncing the tasklist with tasks in Google Tasks */

function syncGoogleTasksWithSheet() {
  checkOffCompletedSheetTasksInGoogleTasks(); // Sheet -> Google Tasks
  appendGoogleTasksToSheet();
  checkOffGoogleTasksInSheet(); // Google Tasks -> Sheet
}

function checkOffCompletedGoogleTasks() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let data = sheet.getDataRange().getValues();
  
  for (let i = 1; i < data.length; i++) {
    let row = data[i];
    let task = row[COL_NUM_TITLE - 1];
    let completed = row[COL_NUM_DATE_DONE - 1]
    if (task.includes("✅") && completed !== false) {
      let emailSubject = task.substring(3);
      let thread = GmailApp.search(`(${EMAIL_HAS_EXCLAMATION_QUERY}) subject:(${emailSubject})`);
      if (thread.length === 0) {
        sheet.getRange(i + 1, COL_NUM_DONE).setValue(true);
        sheet.getRange(i + 1, COL_NUM_DATE_DONE).setValue(new Date());
      }
    }
  }
}

function appendGoogleTasksToSheet() {
  let tasks = Tasks.Tasks.list("@default").items;
  let newTasks = tasks.map(task => SpreadsheetApp.newRichTextValue()
    .setText(`✅ ${task.title}`)
    .build());
  addTasks(newTasks);
}

/**
 * Check off any Google Tasks in the sheet
 */
function checkOffGoogleTasksInSheet() {
  var spreadsheet = SpreadsheetApp.getActiveSheet();
  let tasks = getTasks();
  
  for (var i = 1; i < data.length; i++) { // Start from row 2 to skip header
    var checkboxValue = data[i][0]; // Assuming checkbox column is A
    var taskId = data[i][1]; // Assuming Google Task ID column is B
    
    if (checkboxValue === true && taskId) {
      completeGoogleTask(taskId);
    }
  }
}

function completeGoogleTask(taskId) {
  var task = Tasks.Tasks.get(taskId, 'YOUR_TASK_LIST_ID'); // Replace with your actual task list ID
  task.status = 'completed';
  task.completed = new Date().toISOString();
  Tasks.Tasks.update(task, taskId, 'status,completed');
}
