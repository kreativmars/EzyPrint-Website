# Receive EzyPrint form orders in Google Sheets (and by email)

Every order idea lands as a new row in your Google Sheet, and you get an email each time. Free, no extra apps.

## Step 1: Make the sheet
1. Go to sheets.google.com and create a blank spreadsheet. Name it **EzyPrint Orders**.
2. Leave it empty. The script adds the column headings itself.

## Step 2: Add the script
1. In the sheet, click **Extensions > Apps Script**.
2. Delete everything in the editor, then paste all of `Code.gs`.
3. At the top, check `NOTIFY_EMAIL` is the Gmail where you want order emails.
4. Click the save icon, then choose **testRow** in the function dropdown and click **Run**.
5. Google asks you to allow access. Click **Review permissions**, pick your account, then **Advanced > Go to project (unsafe) > Allow**. It says "unsafe" only because you wrote the script yourself.
6. Check: an **Orders** tab appears with a test row, and a test email arrives. If both happen, it works.

## Step 3: Publish it as a web address
1. Click **Deploy > New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**.
4. Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).

## Step 4: Connect the form
Send me the Web app URL and I'll put it into the order form on the website. If you build the form yourself, use `form-snippet.html` and replace `PASTE_YOUR_WEB_APP_URL_HERE`.

## Good to know
- **Changing the script later:** Deploy > Manage deployments > edit (pencil) > Version: New version > Deploy. The URL stays the same.
- **Photos and files:** this form sends text only. Ask customers to send their design on Messenger or WhatsApp, or add a link field to a Google Drive folder.
- **Spam:** the form has a hidden trap field that blocks most bots.
- **Privacy:** the sheet holds customers' contact details. Keep it private (don't share the link publicly).
- **Limits:** Gmail lets a free account send about 100 script emails a day, far more than you'll need.
- **Previews:** preview frames that block outside requests (such as Claude previews) cannot send the form. It works on a real website or on localhost.
