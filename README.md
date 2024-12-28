# EmailDiscordScript

Automatically posts emails in Discord for the entire team to access.

## Setup

**Important Note:** These instruction assume that you already have [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en) installed on your computer.

1. Create a webhook in your team's Discord server. This can be done from the Integrations tab of channel settings.
2. Enable the [Google Apps Script API](https://script.google.com/home/usersettings) for your team account.
3. Open a terminal window in the directory you want to use for the setup. Nothing saved there will need to be accessed once these steps are complete.
4. Clone this repository.
```bash
git clone https://github.com/miriamsr/EmailDiscordScript.git
```
5. Install clasp.
```bash
npm install -g @google/clasp
```
6. Login to clasp. It will open a browser window and prompt you to login. Grant the permissions.
```bash
clasp login
```
7. Create a new project.
```bash
clasp create --type standalone
```
8. Push the code in this repo to your new project.
```bash
clasp push
```
9. Open your project in the browser.
```bash
clasp open
```
10. On line 2 replace `YOUR_WEBHOOK_URL` with the URL of the webhook you created earlier and save.
11. Run the `startTrigger` function and authorize it. If it gives you a prompt about verification, click advanced and proceed.

## Limitations

This is the best solution I could find given that Discord doesn't have an equivalent to Slack's email integration. There are some limitations to what we can do with a
webhook. This script will only run once every 5 minues so there may be some lag before the email gets posted on Discord. Additionally, if you recieve an email in more
than 20 threads during the 5 minute period, the script will only look at the 20 most recent threads. Finally, and probably the most annoying limit, is Discord's
character limits. If you recieve a long email, it will be cut off in the Discord post and you'll need to log in to see the full email.
