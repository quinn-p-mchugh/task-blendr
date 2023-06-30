function displayUncompletedTasks() {
  // Applying Filtered Views via Google Apps Script is currently not possible :(
  let filterView = SpreadsheetApp.getActiveSheet().getFilter('Uncompleted Tasks')[0];

  if (filterView) {
    sheet.updateFilter(filterView); 
  } else {
    Logger.log('Filter view not found.');
  }
}