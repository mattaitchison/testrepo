function onPush(github, event, cb) {
  console.log("Hello world");
  cb();
}


function onIssueComment(github, event, cb) {
	console.log(event);
	cb();
}
