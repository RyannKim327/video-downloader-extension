const url = "ttps://fbdown.online/wp-json/aio-dl/video-data/"

document.getElementById("url").onchange = () => {
	console.log("Started")
	requestDownload(document.getElementById("url").value)
}

function requestDownload(videoURL){
	console.log("Fetch")
	fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			url: encodeURI(videoURL),
			token: "d212c03880b50913395c866b2c3c6138c6d5a35454624e278676aa97b96e95b7"
		})
	}).then(response => {
		return response.json()
	}).then(response => {
		console.log("done")
		const lists = document.getElementById("links")
		const data = response.medias
		for(let d in data){
			const a = document.createElement("a")
			a.download = "download"
			a.href = data[d].url
			a.textContent = `Download ${data[d].extension} ${data[d].quality} (${data[d].formattedSize})`
			lists.appendChild(a)
		}
	}).catch(error => {
		alert(error)
	})
}