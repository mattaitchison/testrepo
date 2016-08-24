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
        console.log("message isn't lgtm");
        return cb();
    }
    if (event.issue.state !== 'open') {
        console.log("issue isn't open");
        return cb();
    }
    github.repos.checkCollaborator({
        user: owner,
        repo: repo,
        collabuser: author
    }).then(function (res) {
        return github.pullRequests.merge({
            user: owner,
            repo: repo,
            number: event.issue.number,
            squash: true
        });
    }, function (err) {
        console.log(JSON.stringify({ "error": err }));
        throw new Error("author should be collaborator to merge pr");
    }).then(function (res) {
        console.log(JSON.stringify(res));
    }, function (err) {
        console.log(JSON.stringify({ "error": err }));
        if (err.code == 405) {
            throw new Error("Pull Request is not mergeable");
        }
        if (err.code == 404) {
            throw new Error("PR for issue number not found");
        }
    }).then(cb).catch(function (e) {
        console.log("caught err", e);
        cb();
    });
}
