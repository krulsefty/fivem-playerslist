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

let playersInfo = []
let searchResults = []

async function displayPlayers() {
  try {
    const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/y6kqk9')
    if (!response.ok) {
      throw new Error('Failed to fetch player data')
    }
    const data = await response.json()

    playersInfo = data.Data.players.map(player => ({
      name: player.name.replace(/exilerp(\.eu)?/gi, ''),
      id: player.id,
      identifiers: player.identifiers.map(identifier => identifier.toLowerCase())
    }))

    playersInfo.sort((a, b) => a.id - b.id)

    if (searchResults.length > 0) {
      updateDisplay(searchResults)
    } else {
      updateDisplay(playersInfo)
    }
  } catch (error) {
    console.error('Error fetching player data:', error)
    document.getElementById("list").innerHTML = "Nie udalo sie zaladowac listy gracz.<br>Sprobojemy ja wyswietlnic ponownie, moze to potrwac kilka sekund."
  }

  const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/y6kqk9')
  const data = await response.json()

  const playersCount = data.Data.clients
  const maxPlayers = data.Data.sv_maxclients
  const queue = data.Data.vars.Kolejka
  document.getElementById("count").innerHTML = `Obecnie graczy: <span class="colored-text">${playersCount}</span> / ${maxPlayers} [+ ${queue}]`
}

function searchPlayers() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim()
  searchResults = playersInfo.filter(player =>
    player.name.toLowerCase().includes(searchTerm) ||
    player.id.toString().includes(searchTerm) ||
    player.identifiers.some(identifier => identifier.includes(searchTerm))
  )

  updateDisplay(searchResults)
}

function updateDisplay(players) {
  const playerListHTML = players.map(player => `${player.name} (ID: ${player.id})`)
  document.getElementById("list").innerHTML = playerListHTML.length ? playerListHTML.join("<br>") : "Nie znaleziono gracza."
}

document.getElementById("searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchPlayers()
  }

if (data.error) {
  document.getElementById("list").innerHTML = "Serwer jest wylaczony."
}
})

displayPlayers()
setInterval(displayPlayers, 1000)
