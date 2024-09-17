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
let currentSort = 'id'

async function displayPlayers() {
  try {
    const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/y5k9om')
    if (!response.ok) {
      throw new Error('Failed to fetch player data')
    }
    const data = await response.json()

    playersInfo = data.Data.players.map(player => ({
      name: `${player.name.replace(/exilerp(\.eu)?/gi, '')}`,
      id: `<span class="colored-text">${player.id}</span>`,
      identifiers: player.identifiers.map(identifier => identifier.toLowerCase())
    }))

    if (data.error) {
      document.getElementById("list").innerHTML = "Serwer jest wylaczony."
      document.getElementById("count").style.display = 'none'
      document.getElementById("sort").style.display = 'none'
      document.getElementById("dupa").style.display = 'none'
    } else {
      document.getElementById("count").style.display = 'block'
      document.getElementById("sort").style.display = 'block'
      document.getElementById("dupa").style.display = 'flex'
    }

    if (currentSort === 'name') {
      playersInfo.sort((a, b) => a.name.localeCompare(b.name))
    } else {
      playersInfo.sort((a, b) => a.id - b.id)
    }

    if (searchResults.length > 0) {
      updateDisplay(searchResults)
    } else {
      updateDisplay(playersInfo)
    }

  } catch (error) {
    console.error('Error fetching player data:', error)
    document.getElementById("list").innerHTML = "Nie udalo sie zaladowac listy gracz.<br>Sprobojemy ja wyswietlnic ponownie, moze to potrwac kilka sekund."
    document.getElementById("count").style.display = 'none'
    document.getElementById("sort").style.display = 'none'
    document.getElementById("dupa").style.display = 'none'
  }

  const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/y5k9om')
  const data = await response.json()

  const playersCount = data.Data.clients
  const maxPlayers = data.Data.sv_maxclients
  const queue = data.Data.vars.Kolejka

  document.getElementById("count").innerHTML = `Obecnie graczy: <span class="colored-text">${playersCount}</span> / ${maxPlayers} [+ ${queue}]`
}

function SortButtonAbc() {
  currentSort = 'name'
  playersInfo.sort((a, b) => a.name.localeCompare(b.name))
  updateDisplay(playersInfo)
}

function SortButtonId() {
  currentSort = 'id'
  playersInfo.sort((a, b) => a.id - b.id)
  updateDisplay(playersInfo)
}

function updateDisplay(players) {
  const playerListHTML = players.map(player => `${player.name} (ID: ${player.id})`)
  document.getElementById("list").innerHTML = playerListHTML.length ? playerListHTML.join("<br>") : "Nie znaleziono gracza."
}

document.getElementById("searchInput").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    searchPlayers()
  }
})

displayPlayers()
setInterval(displayPlayers, 1000)
