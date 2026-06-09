/**
 * Zendt website form handler
 *
 * Setup:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this file + appsscript.json, set NOTIFICATION_EMAIL, save
 * 3. Run testContactEmail() once from the editor and approve email permission
 * 4. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the /exec URL into assets/js/form-config.js
 */

const NOTIFICATION_EMAIL = 'zendtpayments@gmail.com';
const WAITLIST_SHEET = 'Waitlist';
const CONTACT_SHEET = 'Contact';
const ERROR_SHEET = 'Errors';

function doGet() {
  return ContentService.createTextOutput('Zendt form handler is live.').setMimeType(
    ContentService.MimeType.TEXT
  );
}

function doPost(e) {
  const params = e && e.parameter ? e.parameter : {};
  const source = (params.source || '').toLowerCase();

  try {
    if (source === 'waitlist') {
      appendWaitlist(params);
      return ok();
    }

    if (source === 'contact') {
      appendContact(params);
      sendContactEmail(params);
      return ok();
    }

    return error('Unknown source');
  } catch (err) {
    logError(source || 'unknown', err);
    return error(String(err));
  }
}

/**
 * Run this once from the Apps Script editor (Run ▶ testContactEmail).
 * Approve the email permission prompt, then redeploy the web app.
 *
 * Important: run testContactEmail — NOT sendContactEmail (that one needs form data).
 */
function testContactEmail() {
  sendContactEmail({
    name: 'Apps Script test',
    email: 'test@example.com',
    topic: 'Authorization test',
    message:
      'If you received this, contact form emails are authorized. Redeploy the web app, then try the contact form again.',
  });
}

function appendWaitlist(params) {
  const email = trim(params.email).toLowerCase();
  if (!email || !isValidEmail(email)) {
    throw new Error('Invalid email');
  }

  const sheet = getSheet(WAITLIST_SHEET, ['Timestamp', 'Email', 'Source', 'Submitted at']);
  const rows = sheet.getDataRange().getValues();

  for (var i = 1; i < rows.length; i++) {
    if (String(rows[i][1]).toLowerCase() === email) {
      return;
    }
  }

  sheet.appendRow([new Date(), email, 'waitlist', trim(params.submitted_at)]);
}

function appendContact(params) {
  params = params || {};
  const name = trim(params.name);
  const email = trim(params.email);
  const topic = trim(params.topic) || 'General';
  const message = trim(params.message);

  if (!name) throw new Error('Name required');
  if (!email || !isValidEmail(email)) throw new Error('Invalid email');
  if (!message) throw new Error('Message required');

  const sheet = getSheet(CONTACT_SHEET, ['Timestamp', 'Name', 'Email', 'Topic', 'Message', 'Submitted at']);
  sheet.appendRow([new Date(), name, email, topic, message, trim(params.submitted_at)]);
}

function sendContactEmail(params) {
  params = params || {};
  const name = trim(params.name);
  const email = trim(params.email);
  const topic = trim(params.topic) || 'General';
  const message = trim(params.message);

  const subject = '[Zendt Contact] ' + topic + ' — ' + name;
  const body =
    'New message from zendtpayments.com/contact.html\n\n' +
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n' +
    'Topic: ' + topic + '\n\n' +
    'Message:\n' +
    message;

  MailApp.sendEmail({
    to: NOTIFICATION_EMAIL,
    subject: subject,
    body: body,
    replyTo: email,
  });
}

function logError(context, err) {
  try {
    const sheet = getSheet(ERROR_SHEET, ['Timestamp', 'Context', 'Error']);
    sheet.appendRow([new Date(), context, String(err && err.message ? err.message : err)]);
  } catch (ignore) {}
}

function getSheet(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);

  if (!sheet) {
    sheet = ss.insertSheet(name);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function trim(value) {
  return String(value || '').trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function ok() {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}

function error(message) {
  return ContentService.createTextOutput('error: ' + message).setMimeType(
    ContentService.MimeType.TEXT
  );
}
