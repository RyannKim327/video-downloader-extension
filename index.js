const url = "https://avd.vercel.app/convert"
let converting = true

const urls = [
	"9gag.com",
	"www.9gag.com",
	"douyin.com",
	"www.douyin.com",
	"facebook.com",
	"www.facebook.com",
	"instagram.com",
	"www.instagram.com",
	"linkedin.com",
	"www.linkedin.com",
	"reddit.com",
	"www.reddit.com",
	"tiktok.com",
	"www.tiktok.com",
	"tumblr.com",
	"www.tumblr.com",
	"youtube.com",
	"www.youtube.com",
	"youtu.be",
	"www.youtu.be",
]

window.onfocus = async () => {
	navigator.permissions.query({name: "clipboard-read"})
	await navigator.clipboard.readText().then(c => {
		let data = "this is just a dummy text"
		const url = /https:\/\/(.*?)\/([\w\W]+)/
		if(url.test(c)){
			data = urlData.match(url)[1]
		}

		if(urls.includes(data)){
			document.getElementById("title").textContent = "Auto fetch data using clipboard onload"
			requestDownload(c)
			document.getElementById("url").value = c
		}
	})
}

document.getElementById("url").onchange = () => {
	const urlData = document.getElementById("url").value
	const url = /https:\/\/(.*?)\/([\w\W]+)/
	let data = "this is just a dummy text"
	
	if(url.test(urlData)){
		data = urlData.match(url)[1]
	}

	if(urls.includes(data)){
		document.getElementById("title").textContent = `Please Wait...`
		document.getElementById("source").textContent = ``
		document.getElementById("duration").textContent = ``
		document.getElementById("links").innerHTML = ""
		requestDownload(urlData)
	}else{
		document.getElementById("title").textContent = `Audio Video Downloader`
		document.getElementById("source").textContent = ``
		document.getElementById("duration").textContent = ``
		document.getElementById("links").innerHTML = ""
	}
}

function requestDownload(videoURL){
	if(converting){
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
				a.download = ``
				a.href = data[d].url
				a.download = ""
				a.innerHTML = `Download ${data[d].extension}<br>(<b>${data[d].quality}</b> - ${data[d].formattedSize})`
				window.URL.revokeObjectURL(data[d].url)
				lists.appendChild(a)
			}
			converting = false
		}).catch(error => {
			alert(error)
			converting = false
		})
	}
}
