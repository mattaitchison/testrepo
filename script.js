function onPush(github, event, cb) {
  console.log("Hello world");
  cb();
}


function onIssueComment(github, event, cb) {
	// console.log(JSON.stringify(event));
	github.pullRequests.checkMerged({
    user: event.repository.owner.login,
    repo: event.repository.name,
    number: event.issue.number
  }).then(function(a,b){
		console.log(JSON.stringify(a),JSON.stringify(b));
		cb();
	}).catch(function(e) {
    console.log(JSON.stringify(e));
    cb();
  })
}
