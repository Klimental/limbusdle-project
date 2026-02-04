let identities = [];

async function loadIdentities() {
    const response = await fetch('../php/get_identities.php');
    identities = await response.json();
    startGame();
}

loadIdentities();

const targetIdentity = identities[Math.floor(Math.random() * identities.length)];
console.log("Target for this session:", targetIdentity.name); 

const searchInput = document.getElementById('sinner-search');
const resultsDiv = document.getElementById('search-results');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    resultsDiv.innerHTML = '';

    if (query.length > 0) {
        const filtered = identities.filter(id => 
            id.sinner.toLowerCase().includes(query) || 
            id.faction.toLowerCase().includes(query) ||
            id.name.toLowerCase().includes(query)
        );

        filtered.forEach(id => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.innerHTML = `
                    <img src="${id.image}" class="search-icon">
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


let attemptsCount = 0;
let gameOver = false;

function addAttempt(guess) {
    if (gameOver) return;

    attemptsCount++;
    document.getElementById('count-number').innerText = attemptsCount;

    const list = document.getElementById('attempts-list');
    const row = document.createElement('tr');
    row.classList.add('fade-in');

    const check = (val1, val2) => val1 === val2 ? 'correct' : 'wrong';

    row.innerHTML = `
        <td class="${check(guess.sinner, targetIdentity.sinner)}">
            <img src="${guess.image}" class="table-icon"><br>${guess.sinner}
        </td>
        <td class="${check(guess.rarity, targetIdentity.rarity)}">${guess.rarity}</td>
        <td class="${check(guess.season, targetIdentity.season)}">${guess.season}</td>
        <td class="${check(guess.faction, targetIdentity.faction)}">${guess.faction}</td>
        <td class="${check(guess.s1, targetIdentity.s1)}">${guess.s1}</td>
        <td class="${check(guess.s2, targetIdentity.s2)}">${guess.s2}</td>
        <td class="${check(guess.s3, targetIdentity.s3)}">${guess.s3}</td>
        <td class="${check(guess.def, targetIdentity.def)}">${guess.def}</td>
    `;

    list.prepend(row);

    if (guess.name === targetIdentity.name) {
        showWinScreen();
    }
}

function showWinScreen() {
    gameOver = true;
    const modal = document.getElementById('win-modal');
    const info = document.getElementById('winner-info');

    info.innerHTML = `
        <img src="${targetIdentity.image}" class="win-image">
        <h3>${targetIdentity.name}</h3>
        <p>You guessed it in <strong>${attemptsCount}</strong> attempts!</p>
    `;

    modal.style.display = "flex";
    
    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#b71c1c', '#ffffff'] });
    }
}

function closeModal() {
    document.getElementById('win-modal').style.display = "none";
}