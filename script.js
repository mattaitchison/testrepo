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
    }).then(
        res => {
          return github.pullRequests.get({
                        user: owner,
                        repo: repo,
                        number: number})
            // console.log(JSON.stringify(res))
        },
        err => {
            console.log(JSON.stringify({
                "error": err
            }));
            throw new Error("author is not collaborator");
        }
    ).then(
      res => {
        const ref = res.head.ref;
        return github.pullRequests.merge({
            user: owner,
            repo: repo,
            number: number,
            squash: true
        }).then(github.gitdata.deleteReference({user: owner, repo: repo, ref: 'heads/'+ref}));
      }
    ).then(
      cb,
      err => {console.log(err)}
    ).catch(e => {
        console.log(e);
        cb();
    });
}
