// Verbindung zum Online-WebSocket-Server
const socket = new WebSocket("wss://ttrpg-server.onrender.com");

socket.addEventListener("open", function () {
    console.log("Connected to TTRPG server");
});

socket.addEventListener("message", function (event) {
    console.log("Server:", event.data);
});

socket.addEventListener("close", function () {
    console.log("Disconnected from TTRPG server");
});

socket.addEventListener("error", function (error) {
    console.log("WebSocket error:", error);
});


// Charakterauswahl
const characterButtons = document.querySelectorAll(".characterButton");

const characterSelection = document.getElementById("characterSelection");
const actionSelection = document.getElementById("actionSelection");

const selectedCharacter = document.getElementById("selectedCharacter");

const attackButton = document.getElementById("attackButton");
const skipButton = document.getElementById("skipButton");

const emoteButtons = document.querySelectorAll(".emoteButton");

let playerCharacter = null;


// Charakter auswählen
characterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        playerCharacter = button.dataset.character;

        selectedCharacter.textContent =
            "Selected: " + playerCharacter;

        characterSelection.classList.add("hidden");
        actionSelection.classList.remove("hidden");

    });

});


// ATTACK
attackButton.addEventListener("click", function() {

    const message = {
        character: playerCharacter,
        action: "ATTACK"
    };

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));

        console.log("Sent:", message);

        alert(playerCharacter + " attacks!");
    }
    else {
        alert("Not connected to server.");
    }

});


// SKIP
skipButton.addEventListener("click", function() {

    const message = {
        character: playerCharacter,
        action: "SKIP"
    };

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));

        console.log("Sent:", message);

        alert(playerCharacter + " skips the turn.");
    }
    else {
        alert("Not connected to server.");
    }

});


// Emotes
emoteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const emote = button.dataset.emote;

        const message = {
            character: playerCharacter,
            action: "EMOTE",
            emote: emote
        };

        if (socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));

            console.log("Sent:", message);

            alert(playerCharacter + ": " + emote);
        }
        else {
            alert("Not connected to server.");
        }

    });

});
