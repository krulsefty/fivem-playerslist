let playersInfo = []
let searchResults = []
let currentSort = 'id'
let lastSuccessfulData = []

async function displayPlayers() {
  try {
    const response = await fetch(`https://servers-frontend.fivem.net/api/servers/single/d79pvj`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })

    const data = await response.json()

    playersInfo = data.Data.players.map(player => ({
      name: player.name,
      id: player.id,
      identifiers: formatIdentifiers(player.identifiers)
    }))

    lastSuccessfulData = playersInfo

    if (data.response) {
      document.getElementById("list").innerHTML = "Failed to load players list. We will try loading it in few seconds."
      document.getElementById("count").style.display = 'none'
      document.getElementById("sort").style.display = 'none'
      document.getElementById("navbar").style.display = 'none'
    } else {
      document.getElementById("count").style.display = 'block'
      document.getElementById("sort").style.display = 'flex'
      document.getElementById("navbar").style.display = 'flex'
    }

    sortPlayers()
    updateDisplay(playersInfo)

    const playersCount = data.Data.clients
    const serverName = data.Data.gametype
    const maxPlayers = data.Data.sv_maxclients
    const queue = data.Data.vars.Kolejka || 0
    document.getElementById("count").innerHTML = `Obecnie graczy: <span class="colored-text">${playersCount}</span> / ${maxPlayers} [+ ${queue}]`
    document.getElementById("title").innerHTML = `<span class="colored-text">${serverName}</span> Players List`
  } catch (error) {
    if (lastSuccessfulData.length > 0) {
      updateDisplay(lastSuccessfulData)
    } else {
      document.getElementById("list").innerHTML = "Waiting for the list to load. This may take few seconds.<br>(it always takes some time on first load)"
      document.getElementById("count").style.display = 'none'
      document.getElementById("sort").style.display = 'none'
      document.getElementById("navbar").style.display = 'none'
    }
  }
}

function sortPlayers() {
  if (currentSort === 'name') {
    playersInfo.sort((a, b) => a.name.localeCompare(b.name))
  } else {
    playersInfo.sort((a, b) => a.id - b.id)
  }
}

function SortButtonAbc() {
  currentSort = 'name'
  sortPlayers()
  updateDisplay(playersInfo)
}

function SortButtonId() {
  currentSort = 'id'
  sortPlayers()
  updateDisplay(playersInfo)
}

function searchPlayers() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim()
  if (searchTerm === "") {
    updateDisplay(playersInfo)
    return
  }
  searchResults = playersInfo.filter(player =>
    player.name.toLowerCase().includes(searchTerm) ||
    player.id.toString().includes(searchTerm) ||
    player.identifiers.toLowerCase().includes(searchTerm)
  )
  updateDisplay(searchResults)
}

document.getElementById("searchInput").addEventListener("input", searchPlayers)

document.getElementById("searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchPlayers()
  }
})

function updateDisplay(players) {
  const playerListHTML = players.map(player => `
    <div id="player-card">
      <div id="player-info">
        <p id="player-title">${player.name}</p>
        <p id="player-id">[${player.id}]</p>
      </div>
      <div id="player-identifiers">${player.identifiers}</div>
    </div>
  `).join("")

  document.getElementById("list").innerHTML = playerListHTML || "Nie znaleziono gracza."
}

function formatIdentifiers(identifiers) {
  let discord = identifiers.find(id => id.startsWith("discord:"))?.replace("discord:", "") || "Brak ID"
  let steam = identifiers.find(id => id.startsWith("steam:"))?.replace("steam:", "") || "Brak HEX"
  let license = identifiers.find(id => id.startsWith("license:"))?.replace("license:", "") || "Brak Licencji"

  return `
    <div id="top">
      <div class="identifier" id="discord">
        <p class="name">Discord ID:</p>
        <p class="value">${discord}</p>
      </div>
      <div class="identifier" id="steam">
        <p class="name">Steam HEX:</p>
        <p class="value">${steam}</p>
      </div>
    </div>
    <div class="identifier" id="license">
      <p class="name">Rockstar License:</p>
      <p class="value">${license}</p>
    </div>
  `
}

displayPlayers()
setInterval(displayPlayers, 7000)
