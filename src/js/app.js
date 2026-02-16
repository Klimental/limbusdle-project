let identities = [];
let targetIdentity;
let attemptsCount = 0;
let gameOver = false;

// --- 1. Допоміжна функція для іконок навичок ---
function getSkillHtml(type) {
    if (!type) return '-';
    
    let iconName = '';
    const t = type.toLowerCase();

    // Визначаємо файл іконки за ключовим словом
    // Переконайтеся, що файли іконок існують у папці src/img/icons/
    if (t.includes('slash')) iconName = 'slash';
    else if (t.includes('pierce')) iconName = 'pierce';
    else if (t.includes('blunt')) iconName = 'blunt';
    else if (t.includes('guard')) iconName = 'guard';
    else if (t.includes('evade')) iconName = 'evade';
    else if (t.includes('counter')) iconName = 'counter';
    
    // Якщо тип розпізнано, повертаємо HTML з картинкою
    if (iconName) {
        return `
            <div class="skill-cell" style="display: flex; align-items: center; gap: 8px;">
                <img src="img/icons/${iconName}.png" alt="${type}" class="type-icon" style="width: 24px; height: 24px;">
                <span>${type}</span>
            </div>
        `;
    }
    
    // Якщо це невідомий тип, просто повертаємо текст
    return type;
}

// --- 2. Завантаження даних ---
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
                // Якщо ми на головній сторінці
                if (document.getElementById('sinner-search')) {
                    startGame();
                }
                // Якщо ми на сторінці Dossier
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

function startGame() {
    if (!identities.length) return;
    targetIdentity = identities[Math.floor(Math.random() * identities.length)];
    console.log("Target (Debug):", targetIdentity.name); // Для тестування
}

// Запускаємо завантаження при старті скрипта
loadIdentities();

// --- 3. Логіка пошуку (Тільки для головної сторінки) ---
const searchInput = document.getElementById('sinner-search');
const resultsDiv = document.getElementById('search-results');

if (searchInput) {
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        resultsDiv.innerHTML = '';

        if (!identities || !Array.isArray(identities)) return;

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
}

// --- 4. Додавання спроби в таблицю (Головна гра) ---
function addAttempt(guess) {
    if (gameOver) return;

    attemptsCount++;
    const countEl = document.getElementById('count-number');
    if (countEl) countEl.innerText = attemptsCount;

    const list = document.getElementById('attempts-list');
    const row = document.createElement('tr');
    row.classList.add('fade-in');

    const check = (val1, val2) => val1 === val2 ? 'correct' : 'wrong';

    // Використовуємо getSkillHtml для відображення іконок
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

    if (list) list.prepend(row);

    if (guess.id === targetIdentity.id) {
        showWinScreen();
    }
}

// --- 5. Екран перемоги ---
function showWinScreen() {
    gameOver = true;
    const winnerInfo = document.getElementById('winner-info');
    if (winnerInfo) {
        winnerInfo.innerHTML = `
            <img src="${targetIdentity.image_path}" class="win-image">
            <h3>${targetIdentity.name}</h3>
            <p>You guessed it in <strong>${attemptsCount}</strong> attempts!</p>
        `;
    }
    
    const modal = document.getElementById('win-modal');
    if (modal) modal.style.display = "flex";

    if (typeof confetti === 'function') {
        confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#b71c1c', '#ffffff'] });
    }
}

function closeModal() {
    const modal = document.getElementById('win-modal');
    if (modal) modal.style.display = "none";
}

// --- 6. Рендер Dossier (Таблиця замість карток) ---
function renderDossier(data) {
    const container = document.getElementById('dossier-list'); // Це має бути <tbody>
    if (!container) return;

    container.innerHTML = '';
    
    data.forEach(identity => {
        const row = document.createElement('tr');
        
        // Створюємо рядок таблиці з іконками, але без підсвітки (correct/wrong)
        row.innerHTML = `
            <td>
                <img src="${identity.image_path}" alt="${identity.name}" style="width: 60px; height: auto; border: 1px solid #444;">
            </td>
            <td style="text-align: left;">
                <div style="font-size: 0.9em; color: #bbb;">${identity.sinner_name}</div>
                <div style="font-weight: bold; color: #eca509;">${identity.name}</div>
            </td>
            <td>${identity.rarity}</td>
            <td>${identity.season}</td>
            <td>${identity.faction}</td>
            <td>${getSkillHtml(identity.skill1)}</td>
            <td>${getSkillHtml(identity.skill2)}</td>
            <td>${getSkillHtml(identity.skill3)}</td>
            <td>${getSkillHtml(identity.defense)}</td>
        `;
        container.appendChild(row);
    });
}