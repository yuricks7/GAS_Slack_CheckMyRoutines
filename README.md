# Welcome to 'My Routine Check Script' pages.

## What is 'My Routine Check Script'?
It works on Google Spreadsheet and posts messages to your Slack workspace via Google Apps Script.

## Who wrote it?
It is written by yuricks7. I'm in Japan.  
Please Check it below.  
Twitter: [@yuricks7_nonpro](https://twitter.com/yuricks7_nonpro)  
my Blog: https://yuru-wota.hateblo.jp/

## How to Use it?
### 1. Create a New Worksheet on Google Spreadsheet.

### 2. Create a Project file as Container Bound Script.

### 3. Install the Slack App Library into the project.

ref.) SlackAppLibrary  
https://qiita.com/soundTricker/items/43267609a870fc9c7453  

[Notice] It's Written by Japanese.

### 4. Input your Slack Access Token into Propety Service in the project.
 
### 5. Input your Work Shift in Column C and D on your sheet.

|       |      A     |          B          |  C  |  D  |  E  |  F  |
| ----: | :--------: | :-----------------: | --: | :-- | --: | :-- |
| **1** |  **Date**  |  **Days for Week**  | **Start**<br/>(h) | **Time**<br/>(min.) | **Attendance**<br/>(h) | **Time**<br/>(min.) |
| **2** | yyyy/mm/dd | `=TEXT($a1, "ddd")` |  10 | 00  |  09 | 50  |
| **3** | yyyy/mm/dd | `=TEXT($a2, "ddd")` |  10 | 00  |  09 | 48  |
| **4** | yyyy/mm/dd | `=TEXT($a3, "ddd")` |  10 | 00  |  09 | 58  |
| **5** | yyyy/mm/dd | `=TEXT($a4, "ddd")` |  10 | 00  |  09 | 53  |

- You can use a worksheet function on Column B.  
`=TEXT($a1, "ddd")`
- You can change the routine name on Column E and F.

### 6. Input your Hour and Minutes of Routine Time into Column E and F every day.

### 7. If it's 10:25, 11:25 or 11:55, it checks your input whether finished or not.  
You can change the Trigger Times in the script as you like.

### 8. It'll create a Message every day.
It depend on the situation.  
- If you've NOT finished or it is INCORRECT data, it creates an alert message.  
- If you've done, it creates a praise message.

[Notice] You can change the messages in the script as you like.  

### 9. Then, it will post the messages to your Slack Workspace and makes you HAPPY to perform routines.

### Enjoy Your Routines!👋
