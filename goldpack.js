// Variables for coin system
let coins = localStorage.getItem("coins")
  ? parseInt(localStorage.getItem("coins"))
  : 20000; // Load coins from local storage or start with 10,000
const packCost = 2500; // Cost to open a + pack
let selectedPlayers = []; // Array to hold currently selected players

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

// Quick sell values
const quickSellValuesPack = {
  messi: 1700,
  ronaldo: 1700,
  mbappe: 5000,
  lewandowski: 1700,
  debruyne: 5000,
  neymar: 5000,
  ederson: 1400,
  frimpong: 1300,
  haaland: 1800,
  "van-djik": 5000,
  alisson: 1400,
  "ruben-dias": 1500,
  bellingham: 1400,
  rodri: 1300,
  "theo-hernandez": 1200,
  "lucas-hernandez": 1100,
  modric: 1400,
  benzema: 1300,
  salah: 1600,
  neuer: 1200,
  kane: 1500,
  foden: 1300,
  lukaku: 1100,
  griezmann: 1500,
  carvajal: 1100,
  vardy: 1000,
  alaba: 1100,
  jorginho: 1000,
  firmino: 1000,
  "bruno-fernandes": 1500,
  son: 1600,
  sterling: 1300,
  morata: 1100,
  "serge-gnabry": 1000,
  kane: 1900,
  courtois: 1800,
  vinicius: 1900,
  kimmich: 1700,
  mane: 1800,
  rashford: 1900,
  oblak: 1800,
  "b-silva": 1700,
  casemiro: 1700,
  cancelo: 1700,
  hakimi: 1600,
  dias: 1600,
  valverde: 1600,
  "alexander-arnold": 1600,
  bellingham: 5000,
  foden: 1600,
  rodrygo: 1800,
  mendes: 1700,
  yamal: 15000,
  acerbi: 1200,
  akanji: 1300,
  alvarez: 1400,
  araujo: 1500,
  baltimore: 1000,
  barella: 1600,
  batlle: 900,
  boattin: 800,
  bonmati: 1700,
  bounou: 1100,
  bright: 950,
  bronze: 1200,
  buchanan: 1000,
  cancelo: 1800,
  caruso: 850,
  chawinga: 900,
  chiesa: 1600,
  daly: 1000,
  debinha: 1100,
  dejong: 1700,
  dembele: 1500,
  depaul: 1400,
  diani: 1000,
  diaz: 1300,
  "diogo-costa": 1200,
  donnaruma: 1600,
  doorsoun: 900,
  dovbyk: 1100,
  earps: 1000,
  foord: 950,
  frohms: 1100,
  gabriel: 1300,
  geyoro: 1000,
  girljames: 850,
  grealish: 1700,
  greenwood: 1200,
  grimaldo: 1300,
  guijarro: 1100,
  hansen: 1000,
  hasegawa: 950,
  hegerberg: 1600,
  hemp: 1100,
  hendrich: 900,
  horan: 1300,
  huth: 850,
  "iago-aspas": 1400,
  ilestedt: 900,
  irene: 1100,
  isak: 1500,
  janssen: 1200,
  jota: 1600,
  kante: 1800,
  kerr: 1700,
  kobel: 1300,
  koulibaly: 1600,
  kounde: 1500,
  kvaratskhelia: 1400,
  "l-martinez": 1700,
  lawrence: 1000,
  lesommer: 1200,
  little: 1100,
  maddison: 1500,
  mahrez: 1700,
  maignan: 1400,
  majri: 950,
  mamardashvili: 1100,
  mane: 1800,
  marquinhos: 1600,
  mbock: 1000,
  mccabe: 950,
  mead: 1300,
  mendy: 1500,
  merino: 1200,
  miedema: 1600,
  "milinkovic-savic": 1500,
  militao: 1600,
  morgan: 1300,
  neves: 1500,
  nnadozie: 900,
  oberdorf: 1100,
  olmo: 1400,
  openda: 1300,
  osimhen: 1700,
  pajor: 1000,
  palacios: 1200,
  palhinha: 1400,
  palmer: 1100,
  pavard: 1500,
  putellas: 1800,
  reiten: 1000,
  remiro: 1200,
  renard: 1300,
  rice: 1700,
  rodman: 950,
  rolfo: 1100,
  romero: 1500,
  roord: 1000,
  rudiger: 1600,
  russo: 1100,
  sabitzer: 1400,
  saliba: 1500,
  sane: 1600,
  sauerbrunn: 1200,
  schlotterbeck: 1300,
  schuller: 1000,
  shaw: 1500,
  sheridan: 1100,
  sommer: 1400,
  swanson: 1000,
  tah: 1300,
  tchouameni: 1600,
  terstegen: 1700,
  toone: 1100,
  viggosdottir: 950,
  vlahovic: 1600,
  walsh: 1200,
  watkins: 1400,
  weir: 1100,
  white: 1300,
  williamson: 1200,
  wirtz: 1500,
  xhaka: 1400,
  zinsberger: 1100,
  "totw-vini": 150000,
antony99: 500000
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

// Function to open the + pack
function openPack() {
  if (coins < packCost) {
    alert("Not enough coins to open a Gold pack!");
    return;
  }

  coins -= packCost;
  updateCoinBalance();

  document.getElementById("openPackButton").style.display = "none";
  document.getElementById("currentPlayer").innerHTML = "";
  document.getElementById("inventoryButton").style.display = "none";

  selectedPlayers = shuffleArray(Object.keys(quickSellValuesPack)).slice(
    0,
    3
  );
  selectedPlayers.sort(
    (a, b) => (quickSellValuesPack[b] || 0) - (quickSellValuesPack[a] || 0)
  );

  const firstPlayer = selectedPlayers[0];
  displayPlayer({ id: firstPlayer }, "currentPlayer");

  document.getElementById("continueButton").style.display = "block";
  document.getElementById("sendToInventoryButton").style.display = "none";
}

// Function to display all players at once when "Continue" is clicked
function showAllPlayers() {
  const currentPlayerDiv = document.getElementById("currentPlayer");
  currentPlayerDiv.innerHTML = ""; // Clear previous players

  selectedPlayers.forEach((playerId) => {
    displayPlayer({ id: playerId }, "currentPlayer"); // Display all selected players
  });

  document.getElementById("continueButton").style.display = "none";
  document.getElementById("sendToInventoryButton").style.display = "block"; // Show main Send to Inventory button
}

// Quick sell a player
function quickSellPlayer(player) {
  const sellValue = quickSellValuesPack[player.id] || 0;
  coins += sellValue;
  updateCoinBalance();

  selectedPlayers = selectedPlayers.filter((p) => p !== player.id);
  

  const playerCard = document.querySelector(
    `#currentPlayer .player-card img[data-id='${player.id}']`
  )?.parentElement;
  if (playerCard) {
    playerCard.remove();
  }

  // Hide Send to Inventory button and show Open Pack button if all players are quick sold
  if (selectedPlayers.length === 0) {
    document.getElementById("sendToInventoryButton").style.display = "none";
    document.getElementById("openPackButton").style.display = "block"; // Show Open Pack button
  }
}

// Function to send selected players to inventory
function sendToInventory() {
  const warningDiv = document.getElementById("duplicateWarning");
  let duplicatesFound = false;

  // Iterate through the selected players
  selectedPlayers.forEach((playerId) => {
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
  selectedPlayers = []; // Clear selected players
  document.getElementById("inventoryButton").style.display = "block"; // Show the Inventory button
  document.getElementById("sendToInventoryButton").style.display = "none"; // Hide the Send to Inventory button
  document.getElementById("openPackButton").style.display = "block"; // Ensure the Open Pack button is visible
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
  .getElementById("openPackButton")
  .addEventListener("click", openPack);
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
