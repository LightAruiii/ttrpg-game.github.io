const characterButtons = document.querySelectorAll(".characterButton");

const characterSelection = document.getElementById("characterSelection");
const actionSelection = document.getElementById("actionSelection");

const selectedCharacter = document.getElementById("selectedCharacter");

const attackButton = document.getElementById("attackButton");
const skipButton = document.getElementById("skipButton");

const emoteButtons = document.querySelectorAll(".emoteButton");


let playerCharacter = null;


/* Charakter auswählen */

characterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        playerCharacter = button.dataset.character;

        selectedCharacter.textContent =
            "Selected: " + playerCharacter;

        characterSelection.classList.add("hidden");
        actionSelection.classList.remove("hidden");

    });

});


/* Angriff */

attackButton.addEventListener("click", function() {

    alert(playerCharacter + " attacks!");

});


/* Aussetzen */

skipButton.addEventListener("click", function() {

    alert(playerCharacter + " skips the turn.");

});


/* Emotes */

emoteButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const emote = button.dataset.emote;

        alert(playerCharacter + ": " + emote);

    });

});
