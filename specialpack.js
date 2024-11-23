// Variables for coin system
let coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 20000; // Load coins from local storage or start with 10,000
const packCost92 = 50000; // Cost to open a 92+ pack
let selectedPlayers92 = []; // Array to hold currently selected players

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

const quickSellValues92Pack = {
  blaise_matuidi: 15000, // Quick sell value for Blaise Matuidi
  celia_sassic: 23000, // Quick sell value for Celia Šašić
  eden_hazard: 22500, // Quick sell value for Eden Hazard
  fara_williams: 20000, // Quick sell value for Fara Williams
  guti: 27000, // Quick sell value for Guti
  jaap_stam: 21000, // Quick sell value for Jaap Stam
  jamie_carragher: 37000, // Quick sell value for Jamie Carragher
  laura_georges: 13000, // Quick sell value for Laura Georges
  maicon: 14000, // Quick sell value for Maicon
  marek_hamsik: 13000, // Quick sell value for Marek Hamšík
  mohammed_noor: 37000, // Quick sell value for Mohammed Noor
  tim_howard: 12000, // Quick sell value for Tim Howard
  ze_roberto: 13000, // Quick sell value for Zé Roberto
  abedi: 12000,
  beasley: 30000,
  berbatov: 15000,
  bompastor: 20000,
  brolin: 14000,
  cahill: 10000,
  campos: 34500,
  capdevilla: 13000,
  carragher: 11000,
  carvalho: 12000,
  cole: 10000,
  cordoba: 23500,
  crouch: 10500,
  dempsey: 11500,
  di_natale: 16000,
  donovan: 10000,
  dudek: 20500,
  forlan: 17000,
  francescoli: 15500,
  futre: 14000,
  georges: 18000,
  ginola: 50000,
  giuly: 30000,
  gomez: 50000,
  govou: 20000,
  hazard: 20000,
  jaber: 20000,
  kanu: 11000,
  keane: 11500,
  kewell: 20000,
  king: 10500,
  kohler: 13000,
  kompany: 12000,
  kuyt: 10000,
  litmanen: 9000,
  lizarazu: 14000,
  lucio: 15000,
  marchisio: 16000,
  marquez: 13000,
  mascherano: 12000,
  milito: 20000,
  morientes: 14500,
  mostovoi: 30000,
  nakata: 10000,
  okocha: 12500,
  owairan: 50000,
  papin: 14000,
  ramires: 9000,
  ricken: 9500,
  rosicky: 10000,
  rui: 11000,
  scott: 30000,
  smolarek: 10500,
  sneijder: 15500,
  solsjkaer: 12000,
  tevez: 15000,
  toure: 13000,
  vialli: 16000,
  voller: 15000,
  "totw-vini": 40000,
  goatmessi: 1250000,
yamal99: 500000,
  raphinha99: 1000000,
duo: 5000000,
buffet: 5000000,
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

// Function to open the 92+ pack
function open92Pack() {
  if (coins < packCost92) {
    alert("Not enough coins to open a Special pack!");
    return;
  }

  coins -= packCost92;
  updateCoinBalance();

  document.getElementById("open92PackButton").style.display = "none";
  document.getElementById("currentPlayer").innerHTML = "";
  document.getElementById("inventoryButton").style.display = "none";

  selectedPlayers92 = shuffleArray(Object.keys(quickSellValues92Pack)).slice(
    0,
    3
  );
  selectedPlayers92.sort(
    (a, b) => (quickSellValues92Pack[b] || 0) - (quickSellValues92Pack[a] || 0)
  );

  const firstPlayer = selectedPlayers92[0];
  displayPlayer({ id: firstPlayer }, "currentPlayer");

  document.getElementById("continueButton").style.display = "block";
  document.getElementById("sendToInventoryButton").style.display = "none";
}

// Function to display all players at once when "Continue" is clicked
function showAllPlayers() {
  const currentPlayerDiv = document.getElementById("currentPlayer");
  currentPlayerDiv.innerHTML = ""; // Clear previous players

  selectedPlayers92.forEach((playerId) => {
    displayPlayer({ id: playerId }, "currentPlayer"); // Display all selected players
  });

  document.getElementById("continueButton").style.display = "none";
  document.getElementById("sendToInventoryButton").style.display = "block"; // Show main Send to Inventory button
}

// Quick sell a player
function quickSellPlayer(player) {
  const sellValue = quickSellValues92Pack[player.id] || 0;
  coins += sellValue;
  updateCoinBalance();

  selectedPlayers92 = selectedPlayers92.filter((p) => p !== player.id);
  

  const playerCard = document.querySelector(
    `#currentPlayer .player-card img[data-id='${player.id}']`
  )?.parentElement;
  if (playerCard) {
    playerCard.remove();
  }

  // Hide Send to Inventory button and show Open Pack button if all players are quick sold
  if (selectedPlayers92.length === 0) {
    document.getElementById("sendToInventoryButton").style.display = "none";
    document.getElementById("open92PackButton").style.display = "inline-block"; // Show Open Pack button
  }
}

// Function to send selected players to inventory
function sendToInventory() {
  const warningDiv = document.getElementById("duplicateWarning");
  let duplicatesFound = false;

  // Iterate through the selected players
  selectedPlayers92.forEach((playerId) => {
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
  selectedPlayers92 = []; // Clear selected players
  document.getElementById("inventoryButton").style.display = "block"; // Show the Inventory button
  document.getElementById("sendToInventoryButton").style.display = "none"; // Hide the Send to Inventory button
  document.getElementById("open92PackButton").style.display = "inline-block"; // Ensure the Open Pack button is visible
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
  .getElementById("open92PackButton")
  .addEventListener("click", open92Pack);
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
