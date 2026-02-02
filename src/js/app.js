// Database of identities (Mock Data for Week 2)
const identities = [
    { name: "W Corp. L3 Cleanup Agent Yi Sang", sinner: "Yi Sang", rarity: "000", season: "Season 1", faction: "W Corp", s1: "Slash", s2: "Slash", s3: "Slash", def: "Evade" },
    { name: "N Corp. The One Who Grips Faust", sinner: "Faust", rarity: "000", season: "Season 2", faction: "N Corp", s1: "Blunt", s2: "Pierce", s3: "Blunt", def: "Guard" },
    { name: "R Corp. 4th Pack Rabbit Heathcliff", sinner: "Heathcliff", rarity: "000", season: "Season 1", faction: "R Corp", s1: "Pierce", s2: "Pierce", s3: "Pierce", def: "Evade" },
    { name: "Dieci Assoc. South Section 4 Rodion", sinner: "Rodion", rarity: "000", season: "Season 2", faction: "Dieci Assoc.", s1: "Blunt", s2: "Blunt", s3: "Blunt", def: "Guard" }
];

// Random pick every time the page loads
const targetIdentity = identities[Math.floor(Math.random() * identities.length)];
console.log("Target for this session:", targetIdentity.name); // Check in Console (F12)

const searchInput = document.getElementById('sinner-search');
const resultsDiv = document.getElementById('search-results');

// 1. Search Logic (Filtering by Sinner or Faction)
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
            item.innerText = id.name;
            item.onclick = () => {
                addAttempt(id);
                searchInput.value = '';
                resultsDiv.innerHTML = '';
            };
            resultsDiv.appendChild(item);
        });
    }
});

// 2. Comparison Logic
function addAttempt(guess) {
    const list = document.getElementById('attempts-list');
    const row = document.createElement('tr');

    const check = (val1, val2) => val1 === val2 ? 'correct' : 'wrong';

    row.innerHTML = `
        <td class="${check(guess.sinner, targetIdentity.sinner)}">${guess.sinner}</td>
        <td class="${check(guess.rarity, targetIdentity.rarity)}">${guess.rarity}</td>
        <td class="${check(guess.season, targetIdentity.season)}">${guess.season}</td>
        <td class="${check(guess.faction, targetIdentity.faction)}">${guess.faction}</td>
        <td class="${check(guess.s1, targetIdentity.s1)}">${guess.s1}</td>
        <td class="${check(guess.s2, targetIdentity.s2)}">${guess.s2}</td>
        <td class="${check(guess.s3, targetIdentity.s3)}">${guess.s3}</td>
        <td class="${check(guess.def, targetIdentity.def)}">${guess.def}</td>
    `;

    list.prepend(row);
}