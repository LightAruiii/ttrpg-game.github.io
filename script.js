```javascript
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
// Selection
// ========================================

const selectionScreen =
    document.getElementById("selectionScreen");

const characterButtons =
    document.querySelectorAll(".characterButton");

const dungeonMasterButton =
    document.getElementById("dungeonMasterButton");


// ========================================
// Player controls
// ========================================

const playerControls =
    document.getElementById("playerControls");

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
// Dungeon Master controls
// ========================================

const dungeonMasterControls =
    document.getElementById("dungeonMasterControls");

const dmLeftButton =
    document.getElementById("dmLeftButton");

const dmRightButton =
    document.getElementById("dmRightButton");

const dmSkipButton =
    document.getElementById("dmSkipButton");

const dmEnterButton =
    document.getElementById("dmEnterButton");


// ========================================
// Dragonbaby controls
// ========================================

const dragonPrepareButton =
    document.getElementById("dragonPrepareButton");

const dragonAttackButton =
    document.getElementById("dragonAttackButton");

const dragonSkipButton =
    document.getElementById("dragonSkipButton");


// ========================================
// Dungeon Master target
// ========================================

const dmCharacterButtons =
    document.querySelectorAll(".dmCharacterButton");

const selectedTarget =
    document.getElementById("selectedTarget");

const levelUpButton =
    document.getElementById("levelUpButton");

const rpButtons =
    document.querySelectorAll(".rpButton");

let selectedRPCharacter = null;


// ========================================
// Player state
// ========================================

let playerCharacter = null;


// ========================================
// Send normal command
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
    }
}


// ========================================
// Send Resolve Points
// ========================================

function sendResolvePoints(amount) {

    if (selectedRPCharacter === null) {
        return;
    }

    const message = {
        character: "Dungeon Master",
        action: "RESOLVE_POINTS",
        target: selectedRPCharacter,
        amount: amount
    };

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));

        console.log("Sent:", message);
    }
}


// ========================================
// Send Level Up
// ========================================

function sendLevelUp() {

    if (selectedRPCharacter === null) {
        return;
    }

    const message = {
        character: "Dungeon Master",
        action: "LEVEL_UP",
        target: selectedRPCharacter
    };

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));

        console.log("Sent:", message);
    }
}


// ========================================
// Send Dragonbaby command
// ========================================

function sendDragonCommand(action) {

    const message = {
        character: "Dungeon Master",
        action: action
    };

    if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message));

        console.log("Sent:", message);
    }
}


// ========================================
// Player character selection
// ========================================

characterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        playerCharacter =
            button.dataset.character;

        selectedCharacter.textContent =
            "Selected: " + playerCharacter;

        selectionScreen.classList.add("hidden");

        playerControls.classList.remove("hidden");

        dungeonMasterControls.classList.add("hidden");

    });

});


// ========================================
// Dungeon Master selection
// ========================================

dungeonMasterButton.addEventListener("click", function () {

    playerCharacter = "Dungeon Master";

    selectionScreen.classList.add("hidden");

    playerControls.classList.add("hidden");

    dungeonMasterControls.classList.remove("hidden");

});


// ========================================
// Player actions
// ========================================

attackButton.addEventListener("click", function () {
    sendCommand("ATTACK");
});

blockButton.addEventListener("click", function () {
    sendCommand("BLOCK");
});

leftButton.addEventListener("click", function () {
    sendCommand("LEFT");
});

rightButton.addEventListener("click", function () {
    sendCommand("RIGHT");
});

skipButton.addEventListener("click", function () {
    sendCommand("SKIP");
});

enterButton.addEventListener("click", function () {
    sendCommand("ENTER");
});


// ========================================
// Player emotes
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
        }

    });

});


// ========================================
// Dungeon Master movement
// ========================================

dmLeftButton.addEventListener("click", function () {
    sendCommand("LEFT");
});

dmRightButton.addEventListener("click", function () {
    sendCommand("RIGHT");
});

dmSkipButton.addEventListener("click", function () {
    sendCommand("SKIP");
});

dmEnterButton.addEventListener("click", function () {
    sendCommand("ENTER");
});


// ========================================
// Dragonbaby buttons
// ========================================

dragonPrepareButton.addEventListener("click", function () {
    sendDragonCommand("DRAGON_PREPARE");
});

dragonAttackButton.addEventListener("click", function () {
    sendDragonCommand("DRAGON_ATTACK");
});

dragonSkipButton.addEventListener("click", function () {
    sendDragonCommand("DRAGON_SKIP");
});


// ========================================
// Dungeon Master chooses character
// ========================================

dmCharacterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedRPCharacter =
            button.dataset.target;

        dmCharacterButtons.forEach(function (otherButton) {
            otherButton.classList.remove("selected");
        });

        button.classList.add("selected");

        selectedTarget.textContent =
            "Selected: " + selectedRPCharacter;

    });

});


// ========================================
// Dungeon Master LEVEL UP
// ========================================

levelUpButton.addEventListener("click", function () {

    sendLevelUp();

});


// ========================================
// Dungeon Master Resolve Points
// ========================================

rpButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const amount =
            Number(button.dataset.rp);

        sendResolvePoints(amount);

    });

});
