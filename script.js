function onPush(github, event, cb) {
  console.log("Hello world");
  cb();
}

function isCollab(g,owner,repo, user) {
	return g.repos.checkCollaborator({
	    user: owner,
	    repo: repo,
	    collabuser: user
	}).then(function(a){
		return true
	}).catch(function(e) {
   	return false
  })
}
function onIssueComment(github, event, cb) {
	console.log(event.repository.owner.login)
	console.log(event.repository.name)
	console.log(event.issue.number)
	console.log(event.comment.body)
	console.log(event.comment.user.login)
	// console.log(JSON.stringify(event));
	
	console.log(isCollab(github,event.repository.owner.login,event.repository.name,event.comment.user.login))
	github.pullRequests.get({
    user: event.repository.owner.login,
    repo: event.repository.name,
    number: event.issue.number
  }).then(function(a,b){
		// console.log(JSON.stringify(a),JSON.stringify(b));
		cb();
	}).catch(function(e) {
    console.log(e);
    cb();
  })
}
