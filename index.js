const core = require('@actions/core');
const github = require('@actions/github');
const childProcess = require('child_process')

try {
    const nextTagLabel = core.getInput('new-version-label')
    console.log(`Preparing to create new release with tag ${nextTagLabel}`)

    childProcess.exec('sh getcommits.sh', function(err, stdout, stderr) {
        console.log(stdout)
        const commitMessages = stdout.split(/\r?\n/)

        commitMessages.forEach(msg => {
            console.log(`Commit Message: ${msg}`)

            if (msg.includes(':')) {
                const commitDetails = msg.split(':')

                // Split Meta Information
                const metadata = commitDetails[0]
                const type = ""
                const category = ""
                if (metadata.includes('(') && metadata.includes(')')) {
                    type = metadata.split('(')[0]
                    category = metadata.split('(')[1].replace(')', '')
                } else {
                    type = metadata
                }

                // Split Message
                const message = commitDetails[1].trim()
                console.log(type, category, message)

            } else {
                console.log(`Skipping: invalid commit message`)
            }
        });
    })

    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}