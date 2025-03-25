let players = JSON.parse(localStorage.getItem("players")) || [];
let gameName = localStorage.getItem("gameName") || "";

document.getElementById("gameName").value = gameName;
document.getElementById("displayGameName").innerText = gameName;
document.getElementById("gameName").addEventListener("input", function() {
    localStorage.setItem("gameName", this.value);
    document.getElementById("displayGameName").innerText = this.value;
});

function addPlayer() {
    const playerName = document.getElementById("playerName").value.trim();
    if (playerName === "") return;
    
    players.push({ name: playerName, score: 0 });
    localStorage.setItem("players", JSON.stringify(players));
    document.getElementById("playerName").value = "";
    updatePlayersList();
}

function updatePlayersList() {
    players.sort((a, b) => b.score - a.score);
    const list = document.getElementById("playersList");
    list.innerHTML = "";
    players.forEach((player, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${player.name}</td>
            <td><span class="badge bg-primary">${player.score}</span></td>
            <td>
                <button class="btn btn-success btn-sm" onclick="increaseScore(${index})">+1</button>
                <button class="btn btn-danger btn-sm" onclick="decreaseScore(${index})">-1</button>
                <button class="btn btn-warning btn-sm" onclick="removePlayer(${index})">Remover</button>
            </td>
        `;
        list.appendChild(row);
    });
}

function increaseScore(index) {
    players[index].score += 1;
    localStorage.setItem("players", JSON.stringify(players));
    updatePlayersList();
}

function decreaseScore(index) {
    if (players[index].score > 0) {
        players[index].score -= 1;
        localStorage.setItem("players", JSON.stringify(players));
        updatePlayersList();
    }
}

function removePlayer(index) {
    players.splice(index, 1);
    localStorage.setItem("players", JSON.stringify(players));
    updatePlayersList();
}

function endGame() {
    localStorage.removeItem("players");
    localStorage.removeItem("gameName");
    players = [];
    document.getElementById("gameName").value = "";
    document.getElementById("displayGameName").innerText = "";
    updatePlayersList();
}

updatePlayersList();