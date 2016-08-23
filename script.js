function onPush(github, event, cb) {
  console.log("Hello world");
  cb();
}


function onPullRequestReviewComment(github, event, cb) {
	console.log(event.comment.path);
	console.log('test');
	cb();
}
