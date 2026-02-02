// Database of identities
const identities = [
    { name: "W Corp. L3 Cleanup Agent Yi Sang", sinner: "Yi Sang", image: "img/yi_sang_w.png", rarity: "000", season: "Season 1", faction: "W Corp", s1: "Slash", s2: "Slash", s3: "Slash", def: "Evade" },
    { name: "N Corp. The One Who Grips Faust", sinner: "Faust", image: "img/faust_n.png", rarity: "000", season: "Season 2", faction: "N Corp", s1: "Blunt", s2: "Pierce", s3: "Blunt", def: "Guard" },
    { name: "R Corp. 4th Pack Rabbit Heathcliff", sinner: "Heathcliff", image: "img/heathcliff_r.png", rarity: "000", season: "Season 1", faction: "R Corp", s1: "Pierce", s2: "Pierce", s3: "Pierce", def: "Evade" },
    { name: "Dieci Assoc. South Section 4 Rodion", sinner: "Rodion", image:"img/rodion_d.png" ,rarity:"000" , season:"Season 2" , faction:"Dieci Assoc.",s1:"Blunt" ,s2:"Blunt" ,s3:"Blunt" ,def:"Guard"},
    { name: "Seven Assoc. Section 6 Yi Sang", sinner: "Yi Sang", image:"img/yi_sang_7.png" ,rarity:"00" , season:"Season 1" , faction:"Seven Assoc.",s1:"Pierce" ,s2:"Slash" ,s3:"Pierce" ,def:"Guard"},
    { name: "W Corp. L2 Cleanup Agent Faust", sinner: "Faust", image:"img/faust_w.png" ,rarity:"00" , season:"Season 1" , faction:"W Corp.",s1:"Slash" ,s2:"Slash" ,s3:"Blunt" ,def:"Guard"},
    { name: "LCB Sinner Sinclair", sinner: "Sinclair", image:"img/sinclair_lcb.png" ,rarity:"0" , season:"Base" , faction:"LCB",s1:"Slash" ,s2:"Slash" ,s3:"Slash" ,def:"Guard"},
    { name: "N Corp. Mittelhammer Don Quixote", sinner: "Don Quixote", image:"img/don_quixote_n.png" ,rarity:"00" , season:"Season 2" , faction:"N Corp",s1:"Blunt" ,s2:"Blunt" ,s3:"Pierce" ,def:"Guard"},
    { name: "W Corp. L3 Cleanup Agent Don Quixote", sinner: "Don Quixote", image:"img/don_quixote_w.png" ,rarity:"000" , season:"Season 1" , faction:"W Corp",s1:"Slash" ,s2:"Slash" ,s3:"Pierce" ,def:"Evade"},
    { name: "Kurokumo Clan Wakashu Hong Lu", sinner: "Hong Lu", image: "img/hong_lu_k.png", rarity: "00", season: "Season 1", faction: "Kurokumo Clan", s1: "Slash", s2: "Slash", s3: "Slash", def: "Evade"},
    { name: "Tingtang Gangleader Hong Lu", sinner: "Hong Lu", image: "img/hong_lu_t.png", rarity: "000", season: "Season 1", faction: "Tingtang Gang", s1: "Slash", s2: "Pierce", s3: "Slash", def: "Evade"},
    { name: "Shi Assoc. Section 5 Ishmael", sinner: "Ishmael", image:"img/ishmael_s.png" ,rarity:"00" , season:"Season 1" , faction:"Shi Assoc.",s1:"Slash" ,s2:"Slash" ,s3:"Slash" ,def:"Counter"},
    { name: "R Corp. 4th Pack Reindeer Ishmael", sinner: "Ishmael", image:`img/ishmael_r.png` ,rarity:`000` , season:`Season 1` , faction:`R Corp`,s1:`Blunt` ,s2:`Blunt` ,s3:`Blunt` ,def:`Guard`},
    { name: "Lobotomy E.G.O Sloshing Rodion", sinner: "Rodion", image:`img/rodion_l.png` ,rarity:`00` , season:`Season 2` , faction:`Lobotomy Corp`,s1:`Blunt` ,s2:`Blunt` ,s3:`Blunt` ,def:`Guard`}
];

// Random pick every time the page loads (Session-based)
const targetIdentity = identities[Math.floor(Math.random() * identities.length)];
console.log("Target for this session:", targetIdentity.name); 

const searchInput = document.getElementById('sinner-search');
const resultsDiv = document.getElementById('search-results');

// 1. Search Logic: Filtering by Sinner, Faction, or Full Name
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

// 2. Comparison Logic with Color feedback 
let gameOver = false;

function addAttempt(guess) {
    if (gameOver) return; 

    const list = document.getElementById('attempts-list');
    const row = document.createElement('tr');
    row.classList.add('fade-in'); 

    const check = (val1, val2) => val1 === val2 ? 'correct' : 'wrong';

    row.innerHTML = `
        <td class="${check(guess.sinner, targetIdentity.sinner)}">
            <img src="${guess.image}" class="table-icon">
            <br>${guess.sinner}
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
        <h3>You guessed: ${targetIdentity.name}</h3>
    `;

    modal.style.display = "flex";
    
    const duration = 3 * 1000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#b71c1c', '#ffffff']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#b71c1c', '#ffffff']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}