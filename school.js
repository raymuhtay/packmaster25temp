// Variables for coin system
let coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 20000; // Load coins from local storage or start with 10,000
const packCosts = 10000000; // Cost to open a s+ pack
let selectedPlayerss = []; // Array to hold currently selected players

// Local storage keys
const INVENTORY_KEY = "inventory"; // Shared key for local storage inventory

// Load inventory from local storage
function loadInventory() {
  const savedInventory = localStorage.getItem(INVENTORY_KEY);
  return savedInventory ? JSON.parse(savedInventory) : [];
}

// Save inventory to local storage
function saveInventory() {
  localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventory));
}

// Initialize inventory from local storage
let inventory = loadInventory();

const quickSellValuessPack = {
 noah: 2500000,
 chanheeicon: 5000000,
trafficcone: 2500000,
archie: 5000000

};
// Update coin balance display
function updateCoinBalance() {
  document.querySelectorAll(".coinBalance").forEach((element) => {
    element.textContent = `Coins: ${coins}`;
  });
  localStorage.setItem("coins", coins); // Save coins to local storage
}

// Utility function to shuffle array
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Display a player in the UI
function displayPlayer(player, containerId) {
  const playerDiv = document.getElementById(containerId);

  if (!playerDiv) {
    console.error("Container element not found:", containerId);
    return;
  }

  const playerCard = document.createElement("div");
  playerCard.className = "player-card";

  const originalElement = document.getElementById(player.id);
  if (originalElement) {
    const playerImage = originalElement.cloneNode(true);
    playerImage.style.display = "block";
    playerImage.setAttribute("data-id", player.id);

    const quickSellButton = document.createElement("button");
    quickSellButton.textContent = "Quick Sell";
    quickSellButton.className = "quick-sell-button";
    quickSellButton.addEventListener("click", () => quickSellPlayer(player));

    playerCard.appendChild(playerImage);
    playerCard.appendChild(quickSellButton);

    // Check if the player is a duplicate and add the duplicate overlay
    if (inventory.find((p) => p.id === player.id)) {
      // Add duplicate badge and reduce opacity for the player card
      const duplicateOverlay = document.createElement("div");
      duplicateOverlay.className = "duplicate-overlay";
      duplicateOverlay.textContent = "DUPLICATE";

      playerCard.appendChild(duplicateOverlay);
      playerCard.classList.add("duplicate-opacity"); // Reduce opacity for duplicate player card
    }

    playerDiv.appendChild(playerCard);
    playerCard.classList.add("fade-in-bottom");
  } else {
    console.error("Original player element not found:", player.id);
  }
}

// Function to open the s+ pack
function opensPack() {
  if (coins < packCosts) {
    alert("Not enough coins to open a School Football pack!");
    return;
  }

  coins -= packCosts;
  updateCoinBalance();

  document.getElementById("opensPackButton").style.display = "none";
  document.getElementById("currentPlayer").innerHTML = "";
  document.getElementById("inventoryButton").style.display = "none";

  selectedPlayerss = shuffleArray(Object.keys(quickSellValuessPack)).slice(
    0,
    3
  );
  selectedPlayerss.sort(
    (a, b) => (quickSellValuessPack[b] || 0) - (quickSellValuessPack[a] || 0)
  );

  const firstPlayer = selectedPlayerss[0];
  displayPlayer({ id: firstPlayer }, "currentPlayer");

  document.getElementById("continueButton").style.display = "block";
  document.getElementById("sendToInventoryButton").style.display = "none";
}

// Function to display all players at once when "Continue" is clicked
function showAllPlayers() {
  const currentPlayerDiv = document.getElementById("currentPlayer");
  currentPlayerDiv.innerHTML = ""; // Clear previous players

  selectedPlayerss.forEach((playerId) => {
    displayPlayer({ id: playerId }, "currentPlayer"); // Display all selected players
  });

  document.getElementById("continueButton").style.display = "none";
  document.getElementById("sendToInventoryButton").style.display = "block"; // Show main Send to Inventory button
}

// Quick sell a player
function quickSellPlayer(player) {
  const sellValue = quickSellValuessPack[player.id] || 0;
  coins += sellValue;
  updateCoinBalance();

  selectedPlayerss = selectedPlayerss.filter((p) => p !== player.id);
  

  const playerCard = document.querySelector(
    `#currentPlayer .player-card img[data-id='${player.id}']`
  )?.parentElement;
  if (playerCard) {
    playerCard.remove();
  }

  // Hide Send to Inventory button and show Open Pack button if all players are quick sold
  if (selectedPlayerss.length === 0) {
    document.getElementById("sendToInventoryButton").style.display = "none";
    document.getElementById("opensPackButton").style.display = "inline-block"; // Show Open Pack button
  }
}

// Function to send selected players to inventory
function sendToInventory() {
  const warningDiv = document.getElementById("duplicateWarning");
  let duplicatesFound = false;

  // Iterate through the selected players
  selectedPlayerss.forEach((playerId) => {
    const player = { id: playerId };

    // Check if the player is already in the inventory
    if (!inventory.some((p) => p.id === player.id)) {
      inventory.push(player); // Add player to inventory if not already there
    } else {
      duplicatesFound = true; // Duplicate found
    }

    // Remove the player card from the current display
    const playerCard = document.querySelector(
      `#currentPlayer .player-card img[data-id='${player.id}']`
    )?.parentElement;
    if (playerCard) {
      playerCard.remove();
    }
  });

  if (duplicatesFound) {
    if (!warningDiv) {
      const newWarning = document.createElement("div");
      newWarning.id = "duplicateWarning";
      newWarning.className = "warning";
      newWarning.textContent =
        "Duplicate players won’t be added to the inventory.";
      document.getElementById("currentPlayer").appendChild(newWarning);
    } else {
      warningDiv.style.display = "block";
    }
  } else if (warningDiv) {
    warningDiv.style.display = "none"; // Hide warning if no duplicates
  }

  saveInventory(); // Save to local storage
  selectedPlayerss = []; // Clear selected players
  document.getElementById("inventoryButton").style.display = "block"; // Show the Inventory button
  document.getElementById("sendToInventoryButton").style.display = "none"; // Hide the Send to Inventory button
  document.getElementById("opensPackButton").style.display = "inline-block"; // Ensure the Open Pack button is visible
}

// Display player in inventory
function displayPlayerInInventory(player) {
  const inventoryDiv = document.getElementById("inventory");
  const playerCard = document.createElement("div");
  playerCard.className = "player-card";

  const originalElement = document.getElementById(player.id);
  const playerImage = originalElement.cloneNode(true);
  playerImage.style.display = "block"; // Ensure the image is visible
  const playerName = document.createElement("p");
  playerName.textContent = player.name;

  

  playerCard.appendChild(playerImage);
  playerCard.appendChild(playerName);
  inventoryDiv.appendChild(playerCard);
}
function resetGame() {
  localStorage.clear();
  location.reload();
}
// Event Listeners
document
  .getElementById("opensPackButton")
  .addEventListener("click", opensPack);
document
  .getElementById("continueButton")
  .addEventListener("click", showAllPlayers);
document
  .getElementById("sendToInventoryButton")
  .addEventListener("click", sendToInventory);
document
  .getElementById("inventoryButton")
  .addEventListener("click", function () {
    document.getElementById("inventorySection").style.display = "block";
    // Clear and display inventory
    const inventoryDiv = document.getElementById("inventory");
    inventoryDiv.innerHTML = "";
    inventory.forEach((player) => displayPlayerInInventory(player));
  });
  document
  .getElementById("restartButton")
  .addEventListener("click", resetGame);
// Load and display the coin balance on page load
document.addEventListener("DOMContentLoaded", updateCoinBalance);
