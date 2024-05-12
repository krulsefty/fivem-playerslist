// s
// e
// f
// t
// y

document.addEventListener("contextmenu", function (e) {
  e.preventDefault()
})

document.onkeydown = function (e) {
  if (event.keyCode == 123) {
    return false
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
    return false
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
    return false
  }

  if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
    return false
  }

  if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank")
    return false
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async function displayPlayers() {
  const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/y6kqk9')
  const data = await response.json()

  const playerNames = data.Data.players.map(player => player.name)

  document.getElementById("list").innerHTML = playerNames.join("<br>")
}

displayPlayers()
setInterval(displayPlayers, 1000)