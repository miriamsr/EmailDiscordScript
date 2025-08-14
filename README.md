# EmailDiscordScript

Automatically posts emails in Discord for the entire team to access.

## Setup

**Important Note:** These instruction assume that you already have [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en) installed on your computer.

1. Create a webhook in your team's Discord server. This can be done from the Integrations tab of channel settings.
2. Using your team's google account, create a new [Google Apps Script](https://script.google.com/home).
3. Replace everything in Code.gs there with the contents of Code.gs here.
10. On line 2 replace `YOUR_WEBHOOK_URL` with the URL of the webhook you created earlier and save.
11. Run the `startTrigger` function and authorize it. If it gives you a prompt about verification, click advanced and proceed.

## Limitations

This is the best solution I could find given that Discord doesn't have an equivalent to Slack's email integration. There are some limitations to what we can do with a
webhook. This script will only run once every 5 minues so there may be some lag before the email gets posted on Discord. Additionally, if you recieve an email in more
than 20 threads during the 5 minute period, the script will only look at the 20 most recent threads. Finally, and probably the most annoying limit, is Discord's
character limits. If you recieve a long email, it will be cut off in the Discord post and you'll need to log in to see the full email.
