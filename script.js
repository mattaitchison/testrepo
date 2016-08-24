function onPush(github, event, cb) {
    console.log('Hello world');
    cb();
}
function onIssueComment(github, event, cb) {
    var owner = event.repository.owner.login;
    var repo = event.repository.name;
    var author = event.comment.user.login;
    var msg = event.comment.body;
    if (msg.toLowerCase() !== 'lgtm' || event.issue.state !== 'open') {
        console.log("nothing to do");
        return cb();
    }
    github.repos.checkCollaborator({
        user: owner,
        repo: repo,
        collabuser: "progirum"
    }).then(function (res) {
        return github.pullRequests.merge({
            user: owner,
            repo: repo,
            number: event.issue.number,
            squash: true
        });
    }, function (err) {
        console.log(JSON.stringify({ "error": err }));
    }).then(function (res) {
        console.log(JSON.stringify(res));
    }, function (err) {
        console.log(JSON.stringify({ "error": err }));
    }).then(cb);
}
