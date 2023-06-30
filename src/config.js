// SETTINGS
const TASK_START_ROW = 4;
const COL_ID_ROW = 1;

const EMAIL_HAS_EXCLAMATION_QUERY = 'l:^ss_cr OR l:^ss_cy'; // Thread has red-bang or yellow-bang - Source: https://stackoverflow.com/a/72698848


// SHEET NAMES
const SHEET_NAME_TASKS = "📝 Tasks"; // The name of the sheet where archived tasks are displayed.
const SHEET_NAME_TASKS_ARCHIVED = "📦 Archived"; // The name of the sheet where tasks are archived.
const SHEET_NAME_TASKS_DONE = "✅ Done"; // The name of the sheet where done tasks are displayed.
const SHEET_NAME_SCRATCHPAD = "✍️ Quick Capture"; // The name of the sheet for quickly marking down tasks.


// COLUMN IDS - Must be unique. Used to ensure moving columns does not cause issues with spreadsheet logic.
const COL_ID_TASK_ID = 1;
const COL_ID_AGE_RESET = 2;
const COL_ID_AGE = 3;
const COL_ID_DONE = 4;
const COL_ID_SCRATCHPAD = 5;
const COL_ID_PRIORITY = 6;
const COL_ID_TYPE = 7;
const COL_ID_TITLE = 8;
const COL_ID_PROJECT = 9;
const COL_ID_NOTES = 10;
const COL_ID_EFFORT = 11;
const COL_ID_VALUE = 12;
const COL_ID_PRIORITY_MOSCOW = 13;
const COL_ID_DATE_SCHEDULED = 14;
const COL_ID_DATE_DUE = 15;
const COL_ID_DATE_UPDATED = 16;
const COL_ID_DATE_ADDED = 17;
const COL_ID_DATE_DONE = 18;
const COL_ID_GOOGLE_TASK = 19;
const COL_ID_GMAIL_MSG = 20;
const COL_ID_STATUS = 21;


// COLUMN NUMBERS - Calculated based on IDs above.
const COL_NUM_DONE = getColNumById(COL_ID_DONE);
const COL_NUM_TITLE = getColNumById(COL_ID_TITLE);
const COL_NUM_DATE_DONE = getColNumById(COL_ID_DATE_DONE);
const COL_NUM_DATE_ADDED = getColNumById(COL_ID_DATE_ADDED);
const COL_NUM_DATE_UPDATED = getColNumById(COL_ID_DATE_UPDATED);
const COL_NUM_GMAIL_MSG_ID = getColNumById(COL_ID_GMAIL_MSG);
const COL_NUM_GOOGLE_TASK_ID = getColNumById(COL_ID_GOOGLE_TASK);