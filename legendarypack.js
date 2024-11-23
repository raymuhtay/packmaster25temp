
// Variables for coin system
let coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 20000; // Load coins from local storage or start with 10,000
const packCost1 = 250000; // Cost to open a 1+ pack
let selectedPlayers1 = []; // Array to hold currently selected players

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

const quickSellValues1Pack = {
  pele: 300000,
  ronaldinho: 150000,
  zidane: 175000,
  cruyff: 150000,
  yashin: 75000,
  best: 40000,
  maldini: 100000,
  gullit: 200000,
  "van-basten": 80000,
  eusebio: 130000,
  puskas: 50000,
  "roberto-carlos": 100000,
  hierro: 50000,
  socrates: 75000,
  schmeichel: 80000,
  charlton: 40000,
  "del-piero": 40000,
  hamm: 200000,
  zico: 50000,
  bergkamp: 46000,
  r9: 200000,
  garrincha: 100000,
  muller: 50000,
  baggio: 56000,
  baresi: 25000,
  buffon: 40000,
  cafu: 60000,
  "carlos-alberto": 40000,
  henry: 50000,
  sawa: 200000,
  abily: 125000,
  casillas: 100000,
  matthaus: 50000,
  miyama: 30000,
  moore: 20000,
  pirlo: 25000,
  raul: 100000,
  rivaldo: 100000,
  schelin: 30000,
  xavi: 75000,
  butragueno: 35000,
  cannavaro: 50000,
  cantona: 30000,
  drogba: 50000,
  dalglish: 23000,
  eto: 80000,
  figo: 40000,
  lahm: 40000,
  sanchez: 40000,
  kaka: 120000,
  lineker: 40000,
  nesta: 40000,
  "van-nistelrooy": 30000,
  puyol: 30000,
  schmeichel: 30000,
  shearer: 40000,
  smith: 30000,
  socrates: 30000,
  stoichkov: 40000,
  zanetti: 300000,
  bale: 300000,
  beckham: 300000,
  blanc: 300000,
  cech: 300000,
  desailly: 30000,
  ferdinand: 30000,
  gerrard: 30000,
  hagi: 30000,
  hierro: 50000,
  klose: 50000,
  koeman: 50000,
  laudrup: 50000,
  nedved: 50000,
  owen: 50000,
  pichon: 50000,
  ribery: 50000,
  riquelme: 50000,
  rooney: 50000,
  scholes: 50000,
  schweinsteiger: 50000,
  shevchenko: 50000,
  "van-der-sar": 50000,
  "van-persie": 50000,
  viera: 50000,
  barnes: 50000,
  kluivert: 50000,
  lampard: 50000,
  makelele: 40000,
  petit: 50000,
  pires: 40000,
  rijkaard: 2000,
  rush: 20000,
  suker: 20000,
  torres: 40000,
  vidic: 20000,
  wright: 20000,
  alonso: 120000,
  zola: 20000,
  cole: 20000,
  crespo: 40000,
  essien: 20000,
  gattuso: 20000,
  hernandez: 20000,
  keane: 20000,
  larsson: 20000,
  veron: 40000,
  zambrotta: 30000,
  goatronaldo: 1500000,
dev: 2500000,
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

// Function to open the 1+ pack
function open1Pack() {
  if (coins < packCost1) {
    alert("Not enough coins to open a Legendary pack!");
    return;
  }

  coins -= packCost1;
  updateCoinBalance();

  document.getElementById("open1PackButton").style.display = "none";
  document.getElementById("currentPlayer").innerHTML = "";
  document.getElementById("inventoryButton").style.display = "none";

  selectedPlayers1 = shuffleArray(Object.keys(quickSellValues1Pack)).slice(
    0,
    3
  );
  selectedPlayers1.sort(
    (a, b) => (quickSellValues1Pack[b] || 0) - (quickSellValues1Pack[a] || 0)
  );

  const firstPlayer = selectedPlayers1[0];
  displayPlayer({ id: firstPlayer }, "currentPlayer");

  document.getElementById("continueButton").style.display = "block";
  document.getElementById("sendToInventoryButton").style.display = "none";
}

// Function to display all players at once when "Continue" is clicked
function showAllPlayers() {
  const currentPlayerDiv = document.getElementById("currentPlayer");
  currentPlayerDiv.innerHTML = ""; // Clear previous players

  selectedPlayers1.forEach((playerId) => {
    displayPlayer({ id: playerId }, "currentPlayer"); // Display all selected players
  });

  document.getElementById("continueButton").style.display = "none";
  document.getElementById("sendToInventoryButton").style.display = "block"; // Show main Send to Inventory button
}

// Quick sell a player
function quickSellPlayer(player) {
  const sellValue = quickSellValues1Pack[player.id] || 0;
  coins += sellValue;
  updateCoinBalance();

  selectedPlayers1 = selectedPlayers1.filter((p) => p !== player.id);


  const playerCard = document.querySelector(
    `#currentPlayer .player-card img[data-id='${player.id}']`
  )?.parentElement;
  if (playerCard) {
    playerCard.remove();
  }

  // Hide Send to Inventory button and show Open Pack button if all players are quick sold
  if (selectedPlayers1.length === 0) {
    document.getElementById("sendToInventoryButton").style.display = "none";
    document.getElementById("open1PackButton").style.display = "inline-block"; // Show Open Pack button
  }
}

// Function to send selected players to inventory
function sendToInventory() {
  const warningDiv = document.getElementById("duplicateWarning");
  let duplicatesFound = false;

  // Iterate through the selected players
  selectedPlayers1.forEach((playerId) => {
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
  selectedPlayers1 = []; // Clear selected players
  document.getElementById("inventoryButton").style.display = "block"; // Show the Inventory button
  document.getElementById("sendToInventoryButton").style.display = "none"; // Hide the Send to Inventory button
  document.getElementById("open1PackButton").style.display = "inline-block"; // Ensure the Open Pack button is visible
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
  .getElementById("open1PackButton")
  .addEventListener("click", open1Pack);
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


