function onIssueComment(github, event, cb) {
    const {
        number,
        state
    } = event.issue;
    const owner = event.repository.owner.login;
    const repo = event.repository.name;
    const author = event.comment.user.login;
    const msg = event.comment.body;

    if (msg.toLowerCase() !== 'lgtm') {
        console.log("message isn't lgtm");
        return cb();
    }
    if (state !== 'open') {
        console.log("issue isn't open");
        return cb();
    }

    github.repos.checkCollaborator({
        user: owner,
        repo: repo,
        collabuser: author
    }).then(() => github.pullRequests.get({
                    user: owner,
                    repo: repo,
                    number: number})
    ).then(
        res => {
            console.log(res)
            // Atempt to merge PR.
            return github.pullRequests.merge({
                user: owner,
                repo: repo,
                number: number,
                squash: true
            });
        },
        err => {
            console.log(JSON.stringify({
                "error": err
            }));
            throw new Error("author is not collaborator");
        }
    ).then(
        res => {
            console.log(JSON.stringify(res));
            return github.pullRequests.get({
                user: owner,
                repo: repo,
                number: number,
            });
        },
        err => {
            console.log(JSON.stringify({
                "error": err
            }));
            if (err.code == 405) {
                throw new Error("Pull Request is not mergeable");
            }
            if (err.code == 404) {
                throw new Error("PR for issue number not found");
            }
        }
    ).then(
      res => {
        console.log(JSON.stringify(res));
      }
    ).then(cb).catch(e => {
        console.log(e);
        cb();
    });
}

