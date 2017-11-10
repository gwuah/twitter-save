$(document).ready(function () {

	/*------------------------------( TSAVE )-------------------------------*/
	/* chrome extension that enables you to save tweets for later reference */
	/* Built by (https://twitter.com/gwuah_)[ Griffith Asare Awuah ]        */
	/* Frontend (https://twitter.com/assempah)[ Casprine Assempah ]         */
	/* November, 2017  -----------------------------------------------------*/

	/* necessary variable declarations */
	const DATABASE = Storage("twitterSave");

	const saveTweet = function(tweet) {
		const dataset = tweet.prop("dataset");
		const keys = Object.keys(dataset);
		const payLoad = {};

		keys.forEach(key=> {
			payLoad[key] = dataset[key];
		});

		DATABASE.save(payLoad);
		
		return true
	}

	const createSaveComponent = function(tweet) {
		const div = $("<div></div>").addClass("twitterSave-component");
		div.html(`<svg class="tSave-svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" version="1.1"><g id="surface1"><path style=" " d="M 29 4.53125 C 23.785156 4.53125 19.371094 7.652344 17.25 12.0625 C 16.121094 11.285156 14.8125 10.71875 13.34375 10.71875 C 9.617188 10.71875 6.644531 13.667969 6.4375 17.34375 C 2.710938 18.6875 0 22.164063 0 26.34375 C 0 31.671875 4.328125 36 9.65625 36 L 18 36 C 18.359375 36.003906 18.695313 35.816406 18.878906 35.503906 C 19.058594 35.191406 19.058594 34.808594 18.878906 34.496094 C 18.695313 34.183594 18.359375 33.996094 18 34 L 9.65625 34 C 5.40625 34 2 30.589844 2 26.34375 C 2 22.808594 4.382813 19.832031 7.625 18.9375 C 8.066406 18.808594 8.363281 18.394531 8.34375 17.9375 C 8.339844 17.796875 8.34375 17.726563 8.34375 17.71875 C 8.34375 14.941406 10.566406 12.71875 13.34375 12.71875 C 14.734375 12.71875 16 13.277344 16.90625 14.1875 C 17.144531 14.417969 17.484375 14.519531 17.808594 14.449219 C 18.136719 14.378906 18.40625 14.152344 18.53125 13.84375 C 20.105469 9.59375 24.191406 6.53125 29 6.53125 C 35.171875 6.53125 40.15625 11.519531 40.15625 17.6875 C 40.15625 18.144531 40.121094 18.59375 40.0625 19.0625 C 40.027344 19.34375 40.113281 19.625 40.296875 19.839844 C 40.480469 20.054688 40.75 20.179688 41.03125 20.1875 L 41.09375 20.1875 C 44.917969 20.1875 48 23.269531 48 27.09375 C 48 30.917969 44.917969 34 41.09375 34 L 32 34 C 31.640625 33.996094 31.304688 34.183594 31.121094 34.496094 C 30.941406 34.808594 30.941406 35.191406 31.121094 35.503906 C 31.304688 35.816406 31.640625 36.003906 32 36 L 41.09375 36 C 46 36 50 32 50 27.09375 C 50 22.542969 46.507813 18.925781 42.09375 18.40625 C 42.109375 18.164063 42.15625 17.9375 42.15625 17.6875 C 42.15625 10.4375 36.25 4.53125 29 4.53125 Z M 24.90625 24.96875 C 24.863281 24.976563 24.820313 24.988281 24.78125 25 C 24.316406 25.105469 23.988281 25.523438 24 26 L 24 43.5625 L 20.71875 40.28125 C 20.476563 40.03125 20.121094 39.925781 19.78125 40 C 19.40625 40.066406 19.105469 40.339844 19 40.703125 C 18.894531 41.070313 19.003906 41.460938 19.28125 41.71875 L 24.28125 46.71875 L 25 47.40625 L 25.71875 46.71875 L 30.71875 41.71875 C 31.117188 41.320313 31.117188 40.679688 30.71875 40.28125 C 30.320313 39.882813 29.679688 39.882813 29.28125 40.28125 L 26 43.5625 L 26 26 C 26.011719 25.710938 25.894531 25.433594 25.6875 25.238281 C 25.476563 25.039063 25.191406 24.941406 24.90625 24.96875 Z "></path></g></svg>`);
		div.css({
			"position": "relative",
			"width": "17px",
			"left": "310px",
			"bottom": "17px",
			"lineHeight":"17px"
		})

		// bind click event to the svg!
		const svg = div.find("svg");
		svg.on("click", function(e) {
			e.stopPropagation();
			saveTweet(tweet);
			alert("tweet saved!!");
		})

		return div
	}

	const twitterSave = function twitterSave() {
		const tweets = $(".tweet");
		tweets.each(function(e) {
			// if tweet has already been tagged, ignore
			if (this.classList.contains("tSave")){
				return;
			}

			const tweet = $(this);
			const footer = tweet.find(".stream-item-footer");
			// add save button to the footer
			footer.append(createSaveComponent(tweet));

			// tag the tweet element!
			this.classList.add("tSave");
		})
	}

	// run script every 2.5 seconds!
	window.setInterval(twitterSave, 2500);

	console.log("twitter save extension running");
	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
		if (request.command == "getStorage") {
			let database = localStorage["twitterSave"];
			sendResponse(JSON.stringify(database))
		}
	})

})
