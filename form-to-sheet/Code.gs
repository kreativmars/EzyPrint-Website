// EzyPrint order form -> Google Sheet + email notification.
// Paste this whole file into Extensions > Apps Script in your Google Sheet.

var NOTIFY_EMAIL = 'you@example.com'; // CHANGE THIS to the Gmail where new-order emails should go
var SHEET_NAME = 'Orders';
var HEADERS = ['Received', 'Name', 'Contact (Messenger / WhatsApp / email)', 'Product', 'Quantity', 'Needed by', 'Pick-up or delivery', 'Idea / notes', 'Status'];

function doPost(e) {
  try {
    var p = e.parameter || {};
    if (p.website) return json({ ok: true }); // hidden spam trap: bots fill it, people don't

    var sheet = getSheet();
    var row = [
      new Date(),
      clean(p.name), clean(p.contact), clean(p.product), clean(p.quantity),
      clean(p.deadline), clean(p.delivery), clean(p.idea), 'New'
    ];
    sheet.appendRow(row.map(safeCell));

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New EzyPrint order idea from ' + (clean(p.name) || 'a customer'),
      htmlBody:
        '<p><b>Name:</b> ' + esc(row[1]) + '</p>' +
        '<p><b>Contact:</b> ' + esc(row[2]) + '</p>' +
        '<p><b>Product:</b> ' + esc(row[3]) + ' &times; ' + esc(row[4]) + '</p>' +
        '<p><b>Needed by:</b> ' + esc(row[5]) + '</p>' +
        '<p><b>Pick-up or delivery:</b> ' + esc(row[6]) + '</p>' +
        '<p><b>Idea / notes:</b><br>' + esc(row[7]).replace(/\n/g, '<br>') + '</p>' +
        '<p><a href="' + SpreadsheetApp.getActiveSpreadsheet().getUrl() + '">Open the Orders sheet</a></p>'
    });
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function getSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}
function clean(v) { return String(v || '').trim().slice(0, 2000); }
// A leading ' makes Sheets store the text as-is, so "=..." from the form can't run as a formula.
function safeCell(v) { return typeof v === 'string' && /^[=+\-@\t\r]/.test(v) ? "'" + v : v; }
function esc(v) { return String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function json(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

// Run this once from the editor (Run > testRow) to check the sheet and email work.
function testRow() {
  doPost({ parameter: { name: 'Test Customer', contact: 'test@example.com', product: 'Mugs', quantity: '1', deadline: 'Next week', delivery: 'Pick-up', idea: 'Test order from the script editor' } });
}
