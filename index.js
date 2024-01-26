const url = "https://projectcloudbased.vercel.app/convert"

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
			url: encodeURI(videoURL)
		})
	}).then(response => {
		return response.json()
	}).then(response => {
		const lists = document.getElementById("links")
		document.getElementById("title").textContent = `${response.title}`
		document.getElementById("source").textContent = `Source: ${response.source}`
		document.getElementById("duration").textContent = `${response.duration}`
		const data = response.medias
		for(let d in data){
			const a = document.createElement("a")
			a.download = "download"
			a.target = "_blank"
			a.href = data[d].url
			a.textContent = `Download ${data[d].extension} ${data[d].quality} (${data[d].formattedSize})`
			window.URL.revokeObjectURL(data[d].url)
			lists.appendChild(a)
		}
	}).catch(error => {
		alert(error)
	})
}