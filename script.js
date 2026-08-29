// ========================================
// WebSocket connection
// ========================================

const socket = new WebSocket(
    "wss://ttrpg-server.onrender.com"
);

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


// ========================================
// Elements
// ========================================

const characterButtons =
    document.querySelectorAll(".characterButton");

const characterSelection =
    document.getElementById("characterSelection");

const actionSelection =
    document.getElementById("actionSelection");

const selectedCharacter =
    document.getElementById("selectedCharacter");

const attackButton =
    document.getElementById("attackButton");

const blockButton =
    document.getElementById("blockButton");

const leftButton =
    document.getElementById("leftButton");

const rightButton =
    document.getElementById("rightButton");

const skipButton =
    document.getElementById("skipButton");

const enterButton =
    document.getElementById("enterButton");

const emoteButtons =
    document.querySelectorAll(".emoteButton");


// ========================================
// Player
// ========================================

let playerCharacter = null;


// ========================================
// Send command
// ========================================

function sendCommand(action) {

    if (playerCharacter === null) {
        return;
    }

    const message = {
        character: playerCharacter,
        action: action
    };

    if (socket.readyState === WebSocket.OPEN) {

        socket.send(JSON.stringify(message));

        console.log("Sent:", message);

    } else {

        console.log("Server is not connected.");

    }
}


// ========================================
// Character selection
// ========================================

characterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        playerCharacter =
            button.dataset.character;

        selectedCharacter.textContent =
            "Selected: " + playerCharacter;

        characterSelection.classList.add("hidden");

        actionSelection.classList.remove("hidden");

    });

});


// ========================================
// ATTACK
// ========================================

attackButton.addEventListener("click", function () {

    sendCommand("ATTACK");

});


// ========================================
// BLOCK
// ========================================

blockButton.addEventListener("click", function () {

    sendCommand("BLOCK");

});


// ========================================
// LEFT
// ========================================

leftButton.addEventListener("click", function () {

    sendCommand("LEFT");

});


// ========================================
// RIGHT
// ========================================

rightButton.addEventListener("click", function () {

    sendCommand("RIGHT");

});


// ========================================
// SKIP
// ========================================

skipButton.addEventListener("click", function () {

    sendCommand("SKIP");

});


// ========================================
// ENTER
// ========================================

enterButton.addEventListener("click", function () {

    sendCommand("ENTER");

});


// ========================================
// EMOTES
// ========================================

emoteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (playerCharacter === null) {
            return;
        }

        const emote =
            button.dataset.emote;

        const message = {
            character: playerCharacter,
            action: "EMOTE",
            emote: emote
        };

        if (socket.readyState === WebSocket.OPEN) {

            socket.send(JSON.stringify(message));

            console.log("Sent:", message);

        } else {

            console.log("Server is not connected.");

        }

    });

});
