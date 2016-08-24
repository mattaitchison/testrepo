function onPush(github, event, cb) {
    console.log('Hello world');
    cb();
}
function onIssueComment(github, event, cb) {
    var owner = event.repository.owner.login;
    var repo = event.repository.name;
    var author = event.comment.user.login;
    var msg = event.comment.body;
    if (msg.toLowerCase() !== 'lgtm') {
        console.log("nothing to do");
        return cb();
    }
    github.repos.checkCollaborator({
        user: owner,
        repo: repo,
        collabuser: author
    }).then(function (res) {
        return github.pullRequests.get({
            user: owner,
            repo: repo,
            number: event.issue.number,
        });
    }, function (err) {
        console.log(err);
    }).then(function (res) {
        console.log(res);
    }, function (err) {
        console.log(err);
    }).then(cb);
}
