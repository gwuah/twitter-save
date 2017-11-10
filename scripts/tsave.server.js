let dataBase;

/* HELPER FUNCTIONS */
var generateUrl = function(tweetObject) {
	return encodeURIComponent(`https://twitter.com${tweetObject.permalinkPath}`)
};

var genIframe = function(tweetObject) {
	return ($(`<iframe border=0 frameborder=0 height=250 width=550 src="https://twitframe.com/show?url=${generateUrl(tweetObject)}"></iframe>`)[0])
};

var appendBranches = function() {
	for (tweetObject of dataBase) {
		const twitframe = genIframe(tweetObject);
		$(document).find("body").append(twitframe)
	}
}

const main = function () {
	chrome.tabs.query({active : true, currentWindow : true}, tabs => {
		chrome.tabs.sendMessage(tabs[0].id, { command : "getStorage"}, response => {
			// parsing twice!! hack here!
			// check content-script line 76
			dataBase = JSON.parse(JSON.parse(response));
			console.log(dataBase);
			appendBranches();
		});
	});
};

main();