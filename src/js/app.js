// Global game state variables
let identities = []; // Array of all available identities from database
let targetIdentity; // The identity the player needs to guess
let attemptsCount = 0; // Counter for number of guesses made
let gameOver = false; // Flag to indicate if the game has ended

// --- 1. Helper function for skill icons ---
/**
 * Converts skill type to HTML with icon
 * @param {string} type - The skill type (e.g., 'slash', 'pierce', 'blunt', etc.)
 * @returns {string} HTML string with skill icon and label, or just the type name if icon not found
 */
function getSkillHtml(type) {
    if (!type) return '-';
    
    let iconName = '';
    const t = type.toLowerCase();

    // Determine icon file name based on skill type keyword
    // Note: Ensure icon files exist in src/img/icons/ folder
    if (t.includes('slash')) iconName = 'slash';
    else if (t.includes('pierce')) iconName = 'pierce';
    else if (t.includes('blunt')) iconName = 'blunt';
    else if (t.includes('guard')) iconName = 'guard';
    else if (t.includes('evade')) iconName = 'evade';
    else if (t.includes('counter')) iconName = 'counter';
    
    // If recognized type found, return HTML with icon image
    if (iconName) {
        return `
            <div class="skill-cell" style="display: flex; align-items: center; gap: 8px;">
                <img src="img/icons/${iconName}.png" alt="${type}" class="type-icon" style="width: 24px; height: 24px;">
                <span>${type}</span>
            </div>
        `;
    }
    
    // If unknown type, return plain text
    return type;
}

// --- 2. Load identities from database ---
/**
 * Fetches all identities from the PHP backend and initializes the game or dossier view
 */
async function loadIdentities() {
    try {
        const response = await fetch('php/get_identities.php');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            console.error("Server Error:", data.error);
            return;
        }

        if (Array.isArray(data)) {
            identities = data;
            
            if (identities.length > 0) {
                // If on the main game page, start the game
                if (document.getElementById('sinner-search')) {
                    startGame();
                }
                // If on the Dossier page, display all identities
                if (document.getElementById('dossier-list')) {
                    renderDossier(identities);
                }
            }
        } else {
            console.error("Unexpected data format:", data);
        }

    } catch (error) {
        console.error("Connection to DB failed:", error);
    }
}

/**
 * Initializes a new game by randomly selecting a target identity from the loaded identities
 */
function startGame() {
    if (!identities.length) return;
    targetIdentity = identities[Math.floor(Math.random() * identities.length)];
    console.log("Target (Debug):", targetIdentity.name); // Debug: Log the target for testing
}

// Load identities when script starts
loadIdentities();

// --- 3. Search logic (only on main game page) ---
const searchInput = document.getElementById('sinner-search');
const resultsDiv = document.getElementById('search-results');

// Set up search autocomplete functionality
if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        resultsDiv.innerHTML = ''; // Clear previous results

        if (!identities || !Array.isArray(identities)) return;

        if (query.length > 0) {
            // Filter identities by sinner name, faction, or identity name
            const filtered = identities.filter(id => 
                id.sinner_name.toLowerCase().includes(query) || 
                id.faction.toLowerCase().includes(query) ||
                id.name.toLowerCase().includes(query)
            );

            // Create and display search result items
            filtered.forEach(id => {
                const item = document.createElement('div');
                item.className = 'dropdown-item';
                item.innerHTML = `
                    <img src="${id.image_path}" class="search-icon">
                    <span>${id.name}</span>
                `;
                
                // On item click, add attempt and clear search
                item.onclick = () => {
                    addAttempt(id);
                    searchInput.value = ''; // Clear search input
                    resultsDiv.innerHTML = ''; // Clear results
                };
                resultsDiv.appendChild(item);
            });
        }
    });
}

// --- 4. Add attempt to results table (main game) ---
/**
 * Records a player's guess by adding a row to the attempts table
 * Compares the guessed identity with the target identity and highlights matches
 * @param {object} guess - The identity the player guessed
 */
function addAttempt(guess) {
    if (gameOver) return; // Prevent adding attempts after game is won

    attemptsCount++;
    const countEl = document.getElementById('count-number');
    if (countEl) countEl.innerText = attemptsCount; // Update attempt counter display

    const list = document.getElementById('attempts-list');
    const row = document.createElement('tr');
    row.classList.add('fade-in'); // Add animation class

    // Helper function to compare guessed value with target value
    const check = (val1, val2) => val1 === val2 ? 'correct' : 'wrong';

    // Build table row with skill icons and color-coding for correct/wrong matches
    row.innerHTML = `
        <td><img src="${guess.image_path}" class="table-icon" style="width: 80px; height: auto;"></td>
        <td class="${check(guess.sinner_id, targetIdentity.sinner_id)}">${guess.sinner_name}</td>
        <td class="${check(guess.rarity, targetIdentity.rarity)}">${guess.rarity}</td>
        <td class="${check(guess.season, targetIdentity.season)}">${guess.season}</td>
        <td class="${check(guess.faction, targetIdentity.faction)}">${guess.faction}</td>
        
        <td class="${check(guess.skill1, targetIdentity.skill1)}">${getSkillHtml(guess.skill1)}</td>
        <td class="${check(guess.skill2, targetIdentity.skill2)}">${getSkillHtml(guess.skill2)}</td>
        <td class="${check(guess.skill3, targetIdentity.skill3)}">${getSkillHtml(guess.skill3)}</td>
        <td class="${check(guess.defense, targetIdentity.defense)}">${getSkillHtml(guess.defense)}</td>
    `;

    if (list) list.prepend(row); // Add row to the top of the attempts list

    // Check if the guessed identity is correct
    if (guess.id === targetIdentity.id) {
        showWinScreen();
    }
}

// --- 5. Win screen ---
/**
 * Displays the win screen when player guesses correctly
 * Shows the target identity and attempt count, triggers confetti animation
 */
function showWinScreen() {
    gameOver = true; // Mark game as finished
    const winnerInfo = document.getElementById('winner-info');
    if (winnerInfo) {
        winnerInfo.innerHTML = `
            <img src="${targetIdentity.image_path}" class="win-image">
            <h3>${targetIdentity.name}</h3>
            <p>You guessed it in <strong>${attemptsCount}</strong> attempts!</p>
        `;
    }
    
    // Display win modal
    const modal = document.getElementById('win-modal');
    if (modal) modal.style.display = "flex";

    // Trigger confetti celebration (if confetti library is loaded)
    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#b71c1c', '#ffffff'] });
    }
}

/**
 * Closes the win modal when player clicks the close button
 */
function closeModal() {
    const modal = document.getElementById('win-modal');
    if (modal) modal.style.display = "none";
}

// --- 6. Render Dossier (display all identities in table format) ---
/**
 * Renders all identities as table rows in the dossier view
 * Displays identity information including skills and status without highlighting
 * @param {array} data - Array of identity objects to display
 */
function renderDossier(data) {
    const container = document.getElementById('dossier-list'); // Must be a <tbody> element
    if (!container) return;

    container.innerHTML = ''; // Clear existing content
    
    // Create table row for each identity
    data.forEach(identity => {
        const row = document.createElement('tr');
        
        // Build row with identity information and skill icons (no correct/wrong highlighting)
        row.innerHTML = `
            <td>
                <!-- Identity avatar image -->
                <img src="${identity.image_path}" alt="${identity.name}" style="width: 60px; height: auto; border: 1px solid #444;">
            </td>
            <td style="text-align: left;">
                <!-- Sinner name and identity name -->
                <div style="font-size: 0.9em; color: #bbb;">${identity.sinner_name}</div>
                <div style="font-weight: bold; color: #eca509;">${identity.name}</div>
            </td>
            <!-- Rarity level -->
            <td>${identity.rarity}</td>
            <!-- Release season -->
            <td>${identity.season}</td>
            <!-- Affiliated faction -->
            <td>${identity.faction}</td>
            <!-- Combat skills (Skill 1, 2, 3, and Defense) with icons -->
            <td>${getSkillHtml(identity.skill1)}</td>
            <td>${getSkillHtml(identity.skill2)}</td>
            <td>${getSkillHtml(identity.skill3)}</td>
            <td>${getSkillHtml(identity.defense)}</td>
        `;
        container.appendChild(row);
    });
}