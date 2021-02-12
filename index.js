const core = require('@actions/core');
const github = require('@actions/github');
const childProcess = require('child_process')

try {
    const nextTagLabel = core.getInput('new-version-label')
    console.log(`Preparing to create new release with tag ${nextTagLabel}`)

    childProcess.exec('sh getcommits.sh', function(err, stdout, stderr) {
        console.log(stdout)
    })

    // Get the JSON webhook payload for the event that triggered the workflow
    // const payload = JSON.stringify(github.context.payload, undefined, 2)
    // console.log(`The event payload: ${payload}`);
} catch (error) {
    core.setFailed(error.message);
}