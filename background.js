chrome.commands.onCommand.addListener((command) => {
	switch(command){
		case "avdownloader":
			let w = 1000;
			let h = 500;

			chrome.windows.create({
				'url': 'index.html',
				'type': 'popup',
				'width': w,
				'height': h,
				'left': 100,
				'top': 100
			} , (window) => {})
		break
	}
})