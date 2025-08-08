const url: string = "YOUR_WEBHOOK_URL";

function startTrigger() {
    ScriptApp.newTrigger('checkEmails').timeBased().everyMinutes(5).create();
    resetLastRun();
}

function checkEmails() {
    const lastRun = +PropertiesService.getUserProperties().getProperty('lastRun')!;
    const threads = GmailApp.getInboxThreads(0, 20);
    const teamEmail = Session.getActiveUser().getEmail();
    for (const thread of threads) {
        const messages = thread.getMessages();
        for (const message of messages) {
            if (message.getDate().getTime() > lastRun) {
                const from = message.getFrom();
                if (!from.includes(teamEmail)) {
                    const date = message.getDate();

                    let subject = message.getSubject();
                    if (subject.length > 256) {
                        subject = subject.substring(0, 253) + "...";
                    }

                    let body = message.getPlainBody();
                    body = body.replace("\r\n\r\n", "");
                    if (body.length > 4096) {
                        body = body.substring(0, 4050) + "\n\n**email has been truncated due to length**";
                    }

                    const fields: object[] = [];
                    fields.push({'name': "From", 'value': from, 'inline': true});
                    fields.push({'name': "Date", 'value': date, 'inline': true});
                    announceEmbed(subject, body, fields, 16088613);
                }
            }
        }
    }
    resetLastRun()
}

function resetLastRun() {
    PropertiesService.getUserProperties().setProperty('lastRun', ""+new Date().getTime());
}

function announceEmbed(title: string, description: string, fields: object, color: number) {
    const data: object = {
        "embeds": [{
        "title": title,
        "description": description,
        "color": color,
        "fields": fields
        }]
    };
    const options: object = {
        method: "post",
        payload: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(url, options);
    Logger.log(response);
}