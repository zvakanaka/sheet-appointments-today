# sheet-appointments-today
Get times and names of appointments today from a Google Sheet (sheet must be formatted a certain way).

## Format of Sheet (with example)
Tables can be anywhere. The layout of each little table has to line up with the example here.

Cell | Formula
-|-
C3 | `October 30` (`fx` shows `10/30/2023`)
B4 | `=VALUE(MONTH(C3)&" "&DAY(C3)& ", 2023 3:00:00 PM")`
B5-B12 | `=INDIRECT(ADDRESS(ROW()-1,COLUMN()))+TIME(0,(15),0)`

![example-sheet](https://github.com/zvakanaka/sheet-appointments-today/assets/8365885/4d35689f-188f-472d-88e4-ac677bbd206a)

## Deploy App Script
See [instructions 3-9 here](https://github.com/StorageB/Google-Sheets-Logging#instructions-for-google-sheets).

Example script:
```js
var SS = SpreadsheetApp.openById('<spreadsheet-id-here>');
var timezone = 'America/Denver';

function doGet(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet1 = ss.getSheetByName('Sheet1');
  //                            row, col, numRows, numCols
  var arrData = sheet1.getRange(1,   1,   200,     50).getValues(); // returns a 2d array

  var params = JSON.stringify(arrData);
  return ContentService.createTextOutput(params).setMimeType(ContentService.MimeType.JSON);
}
```

## Environment Variable
Place a file named `.env` in this project directory with your Google App Script's ID (not the sheet id):
```ini
SHEET_ID="<your-id-here>"
```
