function onPush(github, event, cb) {
  console.log("Hello world");
  cb();
}


function onIssueComment(github, event, cb) {
	console.log(event.repository.owner.login)
	console.log(event.repository.name)
	console.log(event.issue.number)
	console.log(event.comment.body)
	console.log(event.comment.author)
	// console.log(JSON.stringify(event));
	
	github.repos.checkCollaborator({
	    user: event.repository.owner.login,
	    repo: event.repository.name,
	    collabuser: event.comment.author
	}).then(function(a,b){
		console.log(JSON.stringify(a),JSON.stringify(b));
		cb();
	}).catch(function(e) {
    console.log(e);
    cb();
  })
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
