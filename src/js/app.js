let identities = [];
let targetIdentity;
let attemptsCount = 0;
let gameOver = false;

async function loadIdentities() {
    try {
        const response = await fetch('php/get_identities.php');
        identities = await response.json();
        
        if (identities.length > 0) {
            startGame();
        }
    } catch (error) {
        console.error("Connection to DB failed:", error);
    }
}
function startGame() {
    targetIdentity = identities[Math.floor(Math.random() * identities.length)];
    console.log("Target for this session:", targetIdentity.name);
}

loadIdentities();

const searchInput = document.getElementById('sinner-search');
const resultsDiv = document.getElementById('search-results');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    resultsDiv.innerHTML = '';

    if (query.length > 0) {
        const filtered = identities.filter(id => 
            id.sinner_name.toLowerCase().includes(query) || 
            id.faction.toLowerCase().includes(query) ||
            id.name.toLowerCase().includes(query)
        );

        filtered.forEach(id => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.innerHTML = `
                <img src="${id.image_path}" class="search-icon">
                <span>${id.name}</span>
            `;
            
            item.onclick = () => {
                addAttempt(id);
                searchInput.value = '';
                resultsDiv.innerHTML = '';
            };
            resultsDiv.appendChild(item);
        });
    }
});

function addAttempt(guess) {
    if (gameOver) return;

    attemptsCount++;
    document.getElementById('count-number').innerText = attemptsCount;

    const list = document.getElementById('attempts-list');
    const row = document.createElement('tr');
    row.classList.add('fade-in');

    const check = (val1, val2) => val1 === val2 ? 'correct' : 'wrong';

    row.innerHTML = `
        <td class="${check(guess.sinner_name, targetIdentity.sinner_name)}">
            <img src="${guess.image_path}" class="table-icon"><br>${guess.sinner_name}
        </td>
        <td class="${check(guess.rarity, targetIdentity.rarity)}">${guess.rarity}</td>
        <td class="${check(guess.season, targetIdentity.season)}">${guess.season}</td>
        <td class="${check(guess.faction, targetIdentity.faction)}">${guess.faction}</td>
        <td class="${check(guess.skill1, targetIdentity.skill1)}">${guess.skill1}</td>
        <td class="${check(guess.skill2, targetIdentity.skill2)}">${guess.skill2}</td>
        <td class="${check(guess.skill3, targetIdentity.skill3)}">${guess.skill3}</td>
        <td class="${check(guess.defense, targetIdentity.defense)}">${guess.defense}</td>
    `;

    list.prepend(row);

    if (guess.name === targetIdentity.name) {
        showWinScreen();
    }
}

function showWinScreen() {
    gameOver = true;
    document.getElementById('winner-info').innerHTML = `
        <img src="${targetIdentity.image_path}" class="win-image">
        <h3>${targetIdentity.name}</h3>
        <p>You guessed it in <strong>${attemptsCount}</strong> attempts!</p>
    `;
    document.getElementById('win-modal').style.display = "flex";
    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#b71c1c', '#ffffff'] });
    }
}

function closeModal() {
    document.getElementById('win-modal').style.display = "none";
}