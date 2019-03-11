# Welcome to My Routine Check Script.

## What is 'My Routine Check Script'?
It works on Google Spreadsheet and posts messages to your Slack workspace via Google Apps Script.

## How to Use it?
1. Set on Google Spreadsheet as Container bound Script.

2. Set your Slack Access Token on Propety Service in your script.

3. Input Dates into Column A.

4. Input Hour and Minutes of Routine Time into Column C and D every day.  
*| Date | Days for Week | Hour | Minute |*

5. If it's 10:25, 10:55 or 11:55, it checks your input whether finished or not.  
(You can change the Triggers as you like.)

6. It is depend on the situation.  
(It is made in Japanese at first but You can change the messages as you like.)

- If you've NOT finished or it is INCORRECT, it creates an alert.
- If you've done, it creates a praise message.

7. Then, it posts the message to your Slack workspace.

### Enjoy Your Routines!👋
