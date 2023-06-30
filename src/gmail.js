/* This module defines functions related to syncing the tasklist with starred emails in GMail */

function clearFormattingOnEmailTaskDelete(e) {
  let range = e.range;
  if (e.oldValue && e.oldValue.includes("📧") && range.getValue() === "") {
    range.clearFormat();
  }
}

function syncTasksWithStarredEmails() {
  unstarCompletedSheetTasks();
  appendStarredEmailsToSheet();
  markUnstarredEmailsCompleted();
}

function unstarCompletedSheetTasks() {

}

/**
 * Add emails with red-bang or yellow-bang to task list.
 */
function appendStarredEmailsToSheet () {
  let sheet = SpreadsheetApp.getActiveSheet();
  let messages = getUnaddedEmailTasks();
  let newTasks = [];
  messages.map(message => newTasks.push({[COL_NUM_TITLE]: SpreadsheetApp.newRichTextValue()
    .setText(`📧 ${message.getSubject()}`)
    .setLinkUrl(`${message.getThread().getPermalink()}`)
    .build(),
    [COL_NUM_GMAIL_MSG_ID]: message.getId()}));
  addTasks(newTasks);
}



/**
 * Mark all emails that have been unstarred since the last sync as completed.
 */
function markUnstarredEmailsCompleted() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let tasks = getTasks(); 
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let completed = task[COL_NUM_DATE_DONE - 1];
    let messageId = task[COL_NUM_GMAIL_MSG_ID - 1];
    if (completed !== true && messageId !== "") {
      let emailSubject = GmailApp.getMessageById(messageId).getSubject();
      let thread = GmailApp.search(`(${EMAIL_HAS_EXCLAMATION_QUERY}) subject:(${emailSubject})`);
      if (thread.length === 0) {
        sheet.getRange(i + 2, COL_NUM_DONE).setValue(true);
        sheet.getRange(i + 2, COL_NUM_DATE_DONE).setValue(new Date());
      }
    }
  }
}

/**
 * Get starred emails that haven't already been added to the task list.
 */
function getUnaddedEmailTasks() {
  let messages = getGMailMessagesWithExclamation();
  let email_tasks = getEmailTasks();
  let gmailMessageIds = email_tasks.map(task => task[COL_NUM_GMAIL_MSG_ID - 1]);
  unaddedMessages = messages.filter(message => !gmailMessageIds.includes(message.getId()));
  return unaddedMessages;
}

/**
 * Get starred GMail messages from GMail thread.
 */
function getStarredMessagedFromThread(t) {
  let messages = t.getMessages();
  return messages.filter(message => message.isStarred());
}

/*
 * Get GMail message with red-bang or yellow-bang.
 */
function getGMailMessagesWithExclamation() {

  let threads = GmailApp.search(EMAIL_HAS_EXCLAMATION_QUERY);
  let messages = [];
  for (const thread of threads) {
    messages.push(...getStarredMessagedFromThread(thread));
  }
  return messages
}

function getEmailTasks() {
  const TASK_DESC_INDEX = COL_NUM_TITLE - 1;
  return getTasks()
    .filter(task => task[TASK_DESC_INDEX].includes("📧"));
}