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
        return cb();
    }
    github.repos.checkCollaborator({
        user: owner,
        repo: repo,
        collabuser: author
    }).then(function (res) {
        console.log(res);
    }, function (err) {
        console.error(err);
        return cb();
    });
    github.pullRequests.get({
        user: event.repository.owner.login,
        repo: event.repository.name,
        number: event.issue.number,
    }).then(function () {
        cb();
    }).catch(function (e) {
        console.log(e);
        cb();
    });
    return cb();
}
